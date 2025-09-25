import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { whenAppStable } from '../../testing/when-app-stable';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNames } = createComponent();

    expect(await getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  function createComponent() {
    TestBed.configureTestingModule({
      providers: [RecipeSearch, provideHttpClient()],
    });

    const component = TestBed.inject(RecipeSearch);

    component.ngOnInit();

    return {
      async getRecipeNames() {
        await whenAppStable();
        return component.recipes?.map((recipe) => recipe.name);
      },
    };
  }
});
