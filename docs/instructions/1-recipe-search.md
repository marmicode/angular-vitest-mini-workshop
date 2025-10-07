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
pnpm cook start 1-recipe-search
```

## 🎯 Goal #1: Implement Recipe Search "integration" test

The `RecipeSearch` component should display a list of recipes fetched from a remot service. In this exercise, you'll implement the "integration" tests.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.integration.spec.ts`

#### 3. Start implementing the test and call the `renderComponent` setup function

```ts
it('...', async () => {
    await renderComponent();
})
```

#### 4. Query DOM and check that a burger and a pizza are displayed

Cf. [📖 Appendices](#-appendices)

#### 5. Checkout the implementation if you went with the TDD approach:

```sh
pnpm cook checkout-impl
```

## 🎯 Goal #2: Implement Recipe Search "isolated" test

The `RecipeSearch` component should display a list of recipes fetched from a remot service. In this exercise, you'll implement the "isolated" tests.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Implement tests

Wait for the `recipes` property to contain a burger and a pizza.

Cf. [📖 Appendices](#-appendices)


#### 3. Checkout the implementation if you went with the TDD approach:

```sh
pnpm cook checkout-impl
```

## 📖 Appendices

### Queries priority

- [🔗 Testing Library Queries docs — or how to choose the right query](https://testing-library.com/docs/queries/about/)

### Query headings with Testing Library

```ts
import { screen } from '@testing-library/dom';

/* Query all h2 (or similar) headings. */
const headingEls = screen.getAllByRole('heading', { level: 2 });
```

### Assert elements have text content

```ts
expect(els[0]).toHaveTextContent('AAA');
expect(els[1]).toHaveTextContent('BBB');
```

### Wait for an assertion to pass with a polling strategy

```ts
await expect.poll(() => getSomething()).toBe(42);
```
