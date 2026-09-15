import * as assert from "assert";

import { argvToShellCommand } from "../support/argv";

suite("Shell Argument Test Suite", () => {
    test("invokes quoted executables in Windows PowerShell", () => {
        assert.strictEqual(
            argvToShellCommand(
                ["C:/Program Files/PHP/php.exe", "scribe"],
                "powershell",
            ),
            "& 'C:/Program Files/PHP/php.exe' scribe",
        );
    });

    test("invokes quoted executables in PowerShell 7", () => {
        assert.strictEqual(
            argvToShellCommand(
                ["C:/Program Files/PHP/php.exe", "scribe"],
                "pwsh",
            ),
            "& 'C:/Program Files/PHP/php.exe' scribe",
        );
    });

    test("escapes apostrophes in PowerShell arguments", () => {
        assert.strictEqual(
            argvToShellCommand(["php", "scribe", "O'Brien"], "pwsh"),
            "& php scribe 'O''Brien'",
        );
    });

    test("preserves POSIX apostrophe escaping", () => {
        assert.strictEqual(
            argvToShellCommand(["php", "scribe", "O'Brien"], "bash"),
            "php scribe 'O'\\''Brien'",
        );
    });

    test("quotes empty command prompt arguments", () => {
        assert.strictEqual(
            argvToShellCommand(["php", "scribe", ""], "cmd"),
            'php scribe ""',
        );
    });
});
