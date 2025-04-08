# Lighthouse Action

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/shivendrasoni/lighthouse-action/main.yml)

## Overview

Lighthouse Action is a GitHub Action that integrates Google's Lighthouse performance auditing tool into your CI/CD pipeline. This action runs Lighthouse audits on your web applications and provides a detailed report on performance, accessibility, best practices, SEO, and more.

## Features

- Automated Lighthouse audits for your web applications.
- Detailed performance reports directly in your GitHub Actions workflow.
- Supports multiple configurations for different environments.

## Usage

To use this action in your GitHub workflow, add the following steps to your GitHub Actions workflow file:

```yaml
name: Lighthouse Audit

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Run Lighthouse Audit
      uses: shivendrasoni/lighthouse-action@v1
      with:
        url: 'https://example.com'
        config_path: './lighthouse-config.json'
```

### Inputs

- `url` (required): The URL to run the Lighthouse audit on.
- `config_path` (optional): Path to the Lighthouse configuration file.

## Example Configuration

You can customize the Lighthouse configuration by providing a `lighthouse-config.json` file. Here is an example configuration:

```json
{
  "extends": "lighthouse:default",
  "settings": {
    "onlyCategories": ["performance", "accessibility"]
  }
}
```

## Outputs

The action will provide the following outputs:

- `performance_score`: The performance score from the Lighthouse audit.
- `accessibility_score`: The accessibility score from the Lighthouse audit.
- `best_practices_score`: The best practices score from the Lighthouse audit.
- `seo_score`: The SEO score from the Lighthouse audit.

## Contributing

Contributions are welcome! If you have any improvements or fixes, please open an issue or a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Lighthouse](https://github.com/GoogleChrome/lighthouse) - The performance auditing tool this action is based on.
- [GitHub Actions](https://github.com/features/actions) - The platform that makes this automation possible.
