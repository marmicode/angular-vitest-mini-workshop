import { TestBed } from '@angular/core/testing';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';
import { recipeMother } from './recipe.mother';
import { whenAppStable } from '../../testing/when-app-stable';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNames } = createComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('filters recipes', async () => {
    const { getRecipeNames, setKeywords } = createComponent();

    await setKeywords('Burg');

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  function createComponent() {
    TestBed.configureTestingModule({
      providers: [RecipeSearch, provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    const component = TestBed.inject(RecipeSearch);

    component.ngOnInit();

    return {
      getRecipeNames() {
        return component.recipes?.hasValue
          ? component.recipes.value.map((recipe) => recipe.name)
          : null;
      },
      async setKeywords(keywords: string) {
        component.filter$.next({ keywords });
        await whenAppStable();
      },
    };
  }
});
