# Falcon Eject

`@deity/falcon-eject` package is a CLI tool exposing single `eject` command that can eject package written in TypeScript,
by converting it into JavaScript while preserving it's original formatting. It also replaces imports with ejected folder path and installs ejected package dependencies into the project where it's ejecting.

## Installation

With npm:

```bash
npm install --save-dev @deity/falcon-eject
```

or with yarn:

```bash
yarn add --dev @deity/falcon-eject
```

## Usage

```bash
npx eject @deity/falcon-ecommerce-uikit src/uikit
```

Executing command above will eject `@deity/falcon-ecommerce-uikit` package into `src/uikit` directory.
