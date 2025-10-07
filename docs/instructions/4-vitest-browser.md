---
sidebar_label: 4 - Vitest Browser Mode
---

# Vitest Browser Mode

## Setup

Navigate to the fourth exercise:

```sh
pnpm cook start 4-vitest-browser
```

## 🎯 Goal: Test `RecipeSearch` with Vitest Browser Mode

In this exercise, you'll learn to use Vitest's browser mode for testing components in a real browser environment using Playwright integration.

### 📝 Steps

#### 1. Rename test from `recipe-search.integration.spec.ts` to `recipe-search.browser.spec.ts`

#### 2. Run tests

```sh
pnpm test
```

#### 3. Replace `@testing-library/dom` with `@vitest/browser/context`

```ts
import { page } from '@vitest/browser/context';

await page.getByLabelText('Keywords').fill(keywords);
```

#### 4. Figure out why the tests are failing

## 📖 Appendices

### Asserting with Vitest Browser

```ts
const els = page.getByRole('...');
await expect.poll(() => els.all()).toHaveLength(42);
await expect.element(els.nth(30)).toHaveTextContent('...');
```

### Visual Debugging

For debugging browser tests:

```sh
pnpm test:debug
```
