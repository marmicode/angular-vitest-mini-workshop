---
sidebar_label: 2 - Test Doubles and Fakes
---

# Test Doubles and Fakes

## Setup

Navigate to the second exercise:

```sh
pnpm cook start 2-test-double
```

## 🎯 Goal #1: Use test doubles to narrow down the exercised code

In this exercise, you'll learn to use test doubles _(Fakes to be more specific)_ to make tests more reliable, faster, and independent of external dependencies like HTTP calls.

### 📝 Steps

#### 1. Run tests

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.integration.spec.ts`

#### 3. Replace the `RecipeRepository` with a fake repository

```diff
- TestBed.configureTestingModule({ providers: [provideHttpClient()] });
+ TestBed.configureTestingModule({ providers: [provideRecipeRepositoryFake()] });
```

#### 4. Configure the fake repository

```ts
TestBed.inject(RecipeRepositoryFake).setRecipes(...);
```

Cf. [📖 Appendices](#-appendices)

## 🎯 Goal #2: `RecipeSearch` filters recipes by keywords

Add a test that checks that `RecipeSearch` filters recipes by keywords when the user types keywords in an input labeled "Keywords".

### 📝 Steps

#### 1. Run tests

```sh
pnpm test
```

#### 2. Add a test that checks that `RecipeSearch` filters recipes by keywords when the user types keywords in an input labeled "Keywords".

Cf. [📖 Appendices](#-appendices)

#### 3. Checkout the implementation if you went with the TDD approach:

```sh
pnpm cook checkout-impl
```

## 📖 Appendices

### Object Mother

```typescript
import { recipeMother } from './recipe.mother';

const burger = recipeMother.withBasicInfo('Burger').build();
const salad = recipeMother.withBasicInfo('Salad').build();
```

### Set keywords with Testing Library

```ts
import { userEvent } from '@testing-library/user-event';

await userEvent.type(screen.getByLabelText('Keywords'), 'Burg');
```
