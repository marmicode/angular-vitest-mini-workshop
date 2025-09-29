---
sidebar_label: 1 - Recipe Search Testing
---

# Recipe Search Testing

## Prerequisites

🚨 Did you set up `pnpm`? Are you on the right branch?

👉 [Initial Setup](./0-setup.md)

## Setup

Navigate to the first exercise:

```sh
pnpm cook 1-recipe-search
```

## 🎯 Goal #1: Implement Recipe Search "integration" test

The `RecipeSearch` component should display a list of recipes fetched from a remot service. In this exercise, you'll implement the "integration" tests.

### 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Implement tests at `src/app/recipe/recipe-search.ng.spec.ts`: Query DOM and check names are displayed.

3. Checkout the implementation if you went with the TDD approach:

```sh
pnpm cook checkout-impl
```

### 🍴 Cutleries

- [🔗 Render function docs](https://testing-library.com/docs/angular-testing-library/api#render)
- [🔗 Testing Library Queries docs — or how to choose the right query](https://testing-library.com/docs/queries/about/)

## 🎯 Goal #2: Implement Recipe Search "isolated" test

The `RecipeSearch` component should display a list of recipes fetched from a remot service. In this exercise, you'll implement the "isolated" tests.

### 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Implement tests: Check that the `recipes` property is set correctly when the component is initialized.

3. Checkout the implementation if you went with the TDD approach:

```sh
pnpm cook checkout-impl
```
