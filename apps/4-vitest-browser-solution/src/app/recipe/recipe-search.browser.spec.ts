import { TestBed } from '@angular/core/testing';
import { page } from '@vitest/browser/context';
import { RecipeSearch } from './recipe-search.ng';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from './recipe.mother';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    const els = getRecipeNames();
    await expect.poll(() => els.all()).toHaveLength(2);
    await expect.element(els.nth(0)).toHaveTextContent('Burger');
    await expect.element(els.nth(1)).toHaveTextContent('Salad');
  });

  it('filters recipes by keywords', async () => {
    const { getRecipeNames, setKeywords } = await renderComponent();

    await setKeywords('Burg');

    const els = getRecipeNames();
    await expect.poll(() => els.all()).toHaveLength(1);
    await expect.element(els.first()).toHaveTextContent('Burger');
  });

  it('resets filters when clicking on the reset button', async () => {
    const { getRecipeNames, setKeywords, clickReset } = await renderComponent();

    await setKeywords('Burg');

    await clickReset();

    const els = getRecipeNames();
    await expect.poll(() => els.all()).toHaveLength(2);
    await expect.element(els.nth(0)).toHaveTextContent('Burger');
    await expect.element(els.nth(1)).toHaveTextContent('Salad');
  });

  async function renderComponent() {
    TestBed.configureTestingModule({
      providers: [provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.createComponent(RecipeSearch);

    return {
      getRecipeNames() {
        return page.getByRole('heading');
      },
      async setKeywords(keywords: string) {
        await page.getByLabelText('Keywords').fill(keywords);
      },
      async clickReset() {
        await page.getByRole('button', { name: 'RESET' }).click();
      },
    };
  }
});
