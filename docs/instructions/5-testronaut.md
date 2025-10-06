---
sidebar_label: 5 - Testronaut
---

# Testronaut

## Setup

Navigate to the fifth exercise:

```sh
pnpm cook start 5-testronaut
```

## 🎯 Goal #1: Test the `RecipeFilter` emits the right filter criteria

### 📝 Steps

#### 1. Run tests

```sh
pnpm testronaut --ui # Or use VSCode Playwright extension
```

#### 2. Mount the component

```ts
const { outputs } = await mount(RecipeFilter);
```

#### 3. Interact with the page

#### 4. Check that the output is emitted

```ts
expect(outputs.filterCriteria.calls[0]).toEqual('Burger');
```

## 🎯 Goal #2: Test the `RecipeSearch` filters recipes by keywords

### 📝 Steps

#### 1. Run tests

```sh
pnpm testronaut --ui # Or use VSCode Playwright extension
```

#### 2. Configure the `RecipeRepositoryFake`

```ts
await runInBrowser('set up the recipe repository', async () => {
  TestBed.configureTestingModule({
    providers: [provideRecipeRepositoryFake()],
  });

  TestBed.inject(RecipeRepositoryFake).setRecipes(...);
});
```

#### 3. Mount the `RecipeSearch` component

#### 4. Filter recipes by keywords (e.g. `Burg`)

#### 5. Check that the recipes are filtered

## 📖 Appendices

### Querying, interacting with the page, and asserting

- https://playwright.dev/docs/api/class-page#page-get-by-role
- https://playwright.dev/docs/input
- https://playwright.dev/docs/test-assertions
