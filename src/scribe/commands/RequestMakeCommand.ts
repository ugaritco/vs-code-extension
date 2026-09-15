import { Command } from "../types";
import { forceOption } from "@src/scribe/options";

export const RequestMakeCommand: Command = {
    name: "make:request",
    postRun: "openGeneratedFile",
    arguments: [
        {
            name: "name",
            type: "namespace",
            description: "The name of the request",
        },
    ],
    options: [forceOption],
};
