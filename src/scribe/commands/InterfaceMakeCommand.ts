import { Command } from "../types";
import { forceOption } from "@src/scribe/options";

export const InterfaceMakeCommand: Command = {
    name: "make:interface",
    postRun: "openGeneratedFile",
    arguments: [
        {
            name: "name",
            type: "namespace",
            description: "The name of the interface",
        },
    ],
    options: [forceOption],
};
