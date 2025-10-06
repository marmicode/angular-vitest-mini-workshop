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

#### 1. Rename test from `recipe-search.ng.integration.spec.ts` to `recipe-search.ng.browser.spec.ts`

#### 2. Run tests:

```sh
pnpm test
```

#### 3. Replace `@testing-library/dom` with `@vitest/browser/context`

```ts
import { page } from '@vitest/browser/context';

await page.getByLabelText('Keywords').fill(keywords);
```

## 📖 Appendices

### Visual Debugging

For debugging browser tests:

```sh
pnpm test:debug
```
