import { TestBed } from '@angular/core/testing';
import { expect, test } from '@testronaut/angular';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';
import { recipeMother } from './recipe.mother';

test('recipe search', async ({ page, mount, runInBrowser }) => {
  await runInBrowser('configure', async () => {
    TestBed.configureTestingModule({
      providers: [provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);
  });

  await mount(RecipeSearch);
  await page.getByText('Keywords').click();
  await page.getByRole('textbox', { name: 'Keywords' }).fill('Bur');
  await expect(page.getByRole('heading')).toHaveText(['Burger']);
});
