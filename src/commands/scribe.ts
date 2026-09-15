import * as vscode from "vscode";

import { Command } from "@src/scribe/types";
import { buildScribeCommand } from "@src/scribe/builder";
import { getPathFromOutput } from "@src/support/scribe";
import { scribe, runScribeInTerminal } from "@src/support/php";
import { getWorkspaceFolders } from "@src/support/project";
import { openFileCommand } from ".";

export const runScribeCommand = async (
    command: Command,
    uri?: vscode.Uri | undefined,
) => {
    if (command.confirmation) {
        const choice = await vscode.window.showWarningMessage(
            command.confirmation.message,
            { modal: true },
            "Run",
        );

        if (choice !== "Run") {
            return;
        }
    }

    const workspaceFolder = getWorkspaceFolder(uri);

    if (!workspaceFolder) {
        vscode.window.showErrorMessage("Cannot detect active workspace");

        return;
    }

    uri ??= vscode.Uri.joinPath(workspaceFolder.uri);

    const scribeCommand = await buildScribeCommand(
        command,
        uri,
        workspaceFolder,
    );

    if (!scribeCommand) {
        return;
    }

    if (command.runIn === "terminal") {
        runScribeInTerminal(scribeCommand, workspaceFolder.uri.fsPath);

        return;
    }

    const output = await executeScribeCommand(scribeCommand, workspaceFolder);

    if (!output) {
        return;
    }

    if (command.postRun === "openGeneratedFile") {
        openGeneratedFile(command, {
            output,
            workspaceFolder,
            uri,
        });
    }
};

const executeScribeCommand = async (
    scribeCommand: string[],
    workspaceFolder: vscode.WorkspaceFolder,
): Promise<string | undefined> => {
    const output = await scribe(scribeCommand, workspaceFolder.uri.fsPath);

    const error = output.match(/ERROR\s+(.*)/);

    if (error?.[1]) {
        vscode.window.showErrorMessage(error[1]);

        return;
    }

    return output;
};

const openGeneratedFile = (
    command: Command,
    result: {
        output: string;
        workspaceFolder: vscode.WorkspaceFolder;
        uri: vscode.Uri;
    },
) => {
    const outputPath = getPathFromOutput(
        result.output,
        command.name,
        result.workspaceFolder,
        result.uri,
    );

    if (!outputPath) {
        return;
    }

    openFileCommand(vscode.Uri.file(outputPath), 1, 1);
};

const getWorkspaceFolder = (
    uri: vscode.Uri | undefined,
): vscode.WorkspaceFolder | undefined => {
    if (uri) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);

        if (workspaceFolder) {
            return workspaceFolder;
        }
    }

    if (vscode.window.activeTextEditor) {
        const fileUri = vscode.window.activeTextEditor.document.uri;

        const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);

        if (workspaceFolder) {
            return workspaceFolder;
        }
    }

    return getWorkspaceFolders()?.[0];
};
