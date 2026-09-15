import * as cp from "child_process";
import * as vscode from "vscode";
import { getPhpCommand as getPhpCommandArgv } from "../lsp/php";
import { argvToShellCommand } from "./argv";
import { config } from "./config";
import {
    PhpEnvironment,
    phpEnvironmentsThatUseRelativePaths,
} from "./phpEnvironments";
import { showErrorPopup } from "./popup";
import { relativePath } from "./project";

export const fixFilePath = (path: string) => {
    const phpEnv = config<PhpEnvironment>("phpEnvironment", "auto");

    if (phpEnvironmentsThatUseRelativePaths.includes(phpEnv)) {
        return relativePath(path);
    }

    return path;
};

const getScribeCommand = (command: string[]): string[] => [
    ...getPhpCommandArgv(),
    "scribe",
    ...command,
];

export const scribe = (
    command: string[],
    workspaceFolder: string,
): Promise<string> => {
    const [executable, ...args] = getScribeCommand(command);

    return new Promise<string>((resolve, error) => {
        cp.execFile(
            executable,
            args,
            {
                cwd: workspaceFolder,
            },
            (err, stdout, stderr) => {
                if (err === null) {
                    return resolve(stdout);
                }

                const errorOutput = stderr.length > 0 ? stderr : stdout;

                showErrorPopup(
                    "Error:\n " +
                        argvToShellCommand(getScribeCommand(command)) +
                        "\n\n" +
                        errorOutput,
                );

                error(errorOutput);
            },
        );
    });
};

let scribeTerminal: vscode.Terminal | undefined;

export const runScribeInTerminal = async (
    command: string[],
    workspaceFolder: string,
): Promise<void> => {
    const fullCommand = argvToShellCommand(getScribeCommand(command));

    if (
        !scribeTerminal ||
        !vscode.window.terminals.includes(scribeTerminal)
    ) {
        scribeTerminal = vscode.window.createTerminal({
            name: "Ugarit Scribe",
            cwd: workspaceFolder,
        });
    }

    scribeTerminal.show();
    await vscode.commands.executeCommand("workbench.action.terminal.clear");
    scribeTerminal.sendText(fullCommand, true);
};
