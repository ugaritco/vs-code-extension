import { Command } from "../types";
import { forceOption } from "@src/scribe/options";

export const TraitMakeCommand: Command = {
    name: "make:trait",
    postRun: "openGeneratedFile",
    arguments: [
        {
            name: "name",
            type: "namespace",
            description: "The name of the trait",
        },
    ],
    options: [forceOption],
};
