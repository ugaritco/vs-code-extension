## Introduction

The Ugarit VS Code extension integrates the [Ugarit LSP](https://github.com/ugarit/lsp) server with Visual Studio Code, providing completions, hover information, diagnostics, links, and code actions for your PHP and Blade files.

The extension supports all Ugarit versions currently listed under the [support policy](https://ugarit.com/docs/releases#support-policy) and requires PHP 8.2 or later.

## LSP Documentation

Documentation for Ugarit LSP can be found in the [Ugarit LSP repository](https://github.com/ugarit/lsp).

## Installation

Open the Extensions view in Visual Studio Code, search for "Ugarit", and select **Install**.

## Configuration

No configuration is required by default.

To choose the PHP environment used by the Ugarit LSP server, configure `Ugarit.phpEnvironment` in your Visual Studio Code settings:

```json
{
    "Ugarit.phpEnvironment": "sail"
}
```

To raise the Ugarit LSP server process memory limit (the default is `512M`):

```json
{
    "Ugarit.memoryLimit": "1G"
}
```

For the full list of available configuration options, open the extension's settings in Visual Studio Code.

## Updates

The extension checks for Ugarit LSP updates at most once every two hours. To force an update check without waiting, run `Ugarit: Update LSP` from the command palette.

## Contributing

Thank you for considering contributing to the Ugarit VS Code extension! The contribution guide can be found in the [Ugarit documentation](https://ugarit.com/docs/contributions).

## Code of Conduct

In order to ensure that the Ugarit community is welcoming to all, please review and abide by the [Code of Conduct](https://ugarit.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

Please review [our security policy](https://github.com/ugarit/vs-code-extension/security/policy) on how to report security vulnerabilities.

## License

The Ugarit VS Code extension is open-sourced software licensed under the [MIT license](https://opensource.org/license/mit).
