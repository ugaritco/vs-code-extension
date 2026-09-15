import * as vscode from "vscode";
import {
    completeLspBinaryUpdate,
    isUsingCustomLspBinary,
    LspBinaryUpdateResult,
    rollbackLspBinaryUpdate,
    updateLspBinary,
} from "./binary";
import { restartLspClient, startLspClient, stopLspClient } from "./client";

let lspUpdateQueue: Promise<void> = Promise.resolve();

export function checkForLspUpdate(
    context: vscode.ExtensionContext,
): Promise<void> {
    return enqueueLspUpdate(() => performLspUpdateCheck(context));
}

export async function forceLspUpdate(
    context: vscode.ExtensionContext,
    isUgaritProject: boolean,
): Promise<void> {
    if (!isUgaritProject) {
        vscode.window.showInformationMessage(
            "A Ugarit project is required to update the Ugarit LSP.",
        );
        return;
    }

    if (isUsingCustomLspBinary()) {
        vscode.window.showInformationMessage(
            "The Ugarit LSP is managed by UGARIT_LSP_BINARY_PATH and cannot be updated by the extension.",
        );
        return;
    }

    try {
        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: "Updating Ugarit LSP",
                cancellable: false,
            },
            () =>
                enqueueLspUpdate(async () => {
                    let result: LspBinaryUpdateResult | undefined;

                    await stopLspClient();

                    try {
                        result = await updateLspBinary(context, {
                            force: true,
                        });

                        const updatedClient = await startLspClient();

                        if (!updatedClient) {
                            throw new Error(
                                "The updated Ugarit LSP did not start",
                            );
                        }
                    } catch (error) {
                        if (result?.status === "updated") {
                            await rollbackLspBinaryUpdate(context, result);
                        }

                        await startLspClient();
                        throw error;
                    }

                    try {
                        await completeLspBinaryUpdate(context, result);
                    } catch (error) {
                        console.error(
                            "Failed to clean up old Ugarit LSP binaries:",
                            error,
                        );
                    }
                }),
        );

        vscode.window.showInformationMessage(
            "Ugarit LSP updated successfully.",
        );
    } catch (error) {
        console.error("Failed to update the Ugarit LSP:", error);
        vscode.window.showErrorMessage(
            `Failed to update the Ugarit LSP: ${error instanceof Error ? error.message : String(error)}`,
        );
    }
}

function enqueueLspUpdate(operation: () => Promise<void>): Promise<void> {
    const update = lspUpdateQueue.then(operation);

    lspUpdateQueue = update.catch(() => undefined);

    return update;
}

async function performLspUpdateCheck(
    context: vscode.ExtensionContext,
): Promise<void> {
    let result: LspBinaryUpdateResult;

    try {
        result = await updateLspBinary(context);
    } catch (error) {
        console.error("Failed to check for a Ugarit LSP update:", error);
        return;
    }

    if (result.status !== "updated") {
        return;
    }

    try {
        const restartedClient = await restartLspClient();

        if (!restartedClient) {
            throw new Error("The updated Ugarit LSP did not start");
        }
    } catch (error) {
        console.error("Failed to start the updated Ugarit LSP:", error);

        try {
            await rollbackLspBinaryUpdate(context, result);
            await restartLspClient();
        } catch (rollbackError) {
            console.error(
                "Failed to restore the previous Ugarit LSP:",
                rollbackError,
            );
        }

        return;
    }

    try {
        await completeLspBinaryUpdate(context, result);
    } catch (error) {
        console.error("Failed to clean up old Ugarit LSP binaries:", error);
    }
}
