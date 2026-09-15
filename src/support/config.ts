import * as vscode from "vscode";
import { GeneratedConfigKey } from "./generated-config";

type ConfigKey =
    | GeneratedConfigKey
    | "basePath"
    | "phpEnvironment"
    | "phpCommand"
    | "memoryLimit"
    | "tests.docker.enabled"
    | "tests.ssh.enabled"
    | "tests.suiteSuffix"
    | "showErrorPopups"
    | "blade.autoSpaceTags"
    | "pest.generateDocBlocks"
    | "pest.helperFilePath"
    | "env.viteQuickFix"
    | "pint.runOnSave"
    | "testRunner.enabled";

export const config = <T>(key: ConfigKey, fallback: T): T =>
    vscode.workspace.getConfiguration("Ugarit").get<T>(key, fallback);

export const configKey = <T>(key: ConfigKey): string => `Ugarit.${key}`;

export const configAffected = (
    event: vscode.ConfigurationChangeEvent,
    ...keys: ConfigKey[]
): boolean => keys.some((key) => event.affectsConfiguration(configKey(key)));

export const updateConfig = (
    key: ConfigKey,
    value: any,
    configurationTarget?: vscode.ConfigurationTarget | boolean | null,
) => {
    return vscode.workspace
        .getConfiguration("Ugarit")
        .update(key, value, configurationTarget);
};
