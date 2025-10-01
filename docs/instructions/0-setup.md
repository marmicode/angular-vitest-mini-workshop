# Setup

## 📦 Install stuff

### Install git `>= 2.23`

https://git-scm.com/downloads

:::warning
Make sure to pick a git version `>= 2.23`
:::

### Install NodeJS `>=22.12.0`

:::warning
Make sure to pick a NodeJS version `>=22.12.0`
:::

https://nodejs.org/en/download

### Install pnpm

https://pnpm.io/installation

```sh
corepack enable
```

or if you are using [Volta](https://volta.sh/)

```sh
volta install pnpm
```

## 📥 Retrieve source code and install dependencies

```sh
git clone https://github.com/marmicode/angular-vitest-mini-workshop.git

cd angular-vitest-main-workshop

pnpm install
```

## ⌨️ Cook CLI

The `cook` CLI allows you to cook exercises:

- select an exercise from a list
- checkout the implementation when the test is ready _(♻️ TDD mode)_
- go to the solution

```sh
pnpm cook
```
