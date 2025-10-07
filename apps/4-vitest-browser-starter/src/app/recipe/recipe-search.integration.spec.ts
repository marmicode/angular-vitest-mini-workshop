import { TestBed } from '@angular/core/testing';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';
import { recipeMother } from './recipe.mother';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    const els = getRecipeNames();
    expect.soft(els).toHaveLength(2);
    expect.soft(els[0]).toHaveTextContent('Burger');
    expect.soft(els[1]).toHaveTextContent('Salad');
  });

  it('filters recipes by keywords', async () => {
    const { getRecipeNames, setKeywords } = await renderComponent();

    await setKeywords('Burg');

    const els = getRecipeNames();
    expect.soft(els).toHaveLength(1);
    expect.soft(els[0]).toHaveTextContent('Burger');
  });

  it('resets filters when clicking on the reset button', async () => {
    const { getRecipeNames, setKeywords, clickReset } = await renderComponent();

    await setKeywords('Burg');

    await clickReset();

    const els = getRecipeNames();
    expect.soft(els).toHaveLength(2);
    expect.soft(els[0]).toHaveTextContent('Burger');
    expect.soft(els[1]).toHaveTextContent('Salad');
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
        return screen.queryAllByRole('heading');
      },
      async setKeywords(keywords: string) {
        await userEvent.type(screen.getByLabelText('Keywords'), keywords);
        await fixture.whenStable();
      },
      async clickReset() {
        await userEvent.click(screen.getByRole('button', { name: 'RESET' }));
        await fixture.whenStable();
      },
    };
  }
});
