---
sidebar_label: 2 - Test Doubles and Fakes
---

# Test Doubles and Fakes

## Setup

Navigate to the second exercise:

```sh
pnpm cook start 2-test-double
```

## 🎯 Goal: Implement Test Doubles for Better Test Isolation

In this exercise, you'll learn to use test doubles _(Fakes to be more specific)_ to make tests more reliable, faster, and independent of external dependencies like HTTP calls.

### 📝 Steps

#### 1. Replace the `RecipeRepository` with a fake repository

```diff
- TestBed.configureTestingModule({ providers: [provideHttpClient()] });
+ TestBed.configureTestingModule({ providers: [provideRecipeRepositoryFake()] });
```

#### 2. Configure the fake repository

```ts
TestBed.inject(RecipeRepositoryFake).setRecipes(...);
```

#### 3. Update Test Helper Functions

#### 4. Run Tests

```sh
pnpm test
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
