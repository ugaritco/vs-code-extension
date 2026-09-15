import { Command } from "../types";
import { forceOption, testOptions } from "@src/scribe/options";

export const ViewMakeCommand: Command = {
    name: "make:view",
    postRun: "openGeneratedFile",
    arguments: [
        {
            name: "name",
            type: "path",
            description: "The name of the view",
        },
    ],
    options: [...testOptions, forceOption],
};
