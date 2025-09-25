import { TestBed } from '@angular/core/testing';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { RecipeSearch } from './recipe-search.ng';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from './recipe.mother';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('filters recipes by keywords', async () => {
    const { getRecipeNames, setKeywords } = await renderComponent();

    await setKeywords('Burg');

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  it('resets filters when clicking on the reset button', async () => {
    const { getRecipeNames, setKeywords, clickReset } = await renderComponent();

    await setKeywords('Burg');

    await clickReset();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  async function renderComponent() {
    TestBed.configureTestingModule({
      providers: [provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    const fixture = TestBed.createComponent(RecipeSearch);

    await fixture.whenStable();

    return {
      getRecipeNames() {
        return screen.queryAllByRole('heading').map((el) => el.textContent);
      },
      async setKeywords(keywords: string) {
        await userEvent.type(screen.getByLabelText('Keywords'), keywords);
      },
      async clickReset() {
        await userEvent.click(screen.getByRole('button', { name: 'RESET' }));
      },
    };
  }
});
