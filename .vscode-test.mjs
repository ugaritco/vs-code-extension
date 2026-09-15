import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
    files: "out/test/**/*.test.js",
    workspaceFolder: "./src/test/fixtures/ugarit-react",
    mocha: {
        ui: "tdd",
        timeout: 20000,
    },
});
