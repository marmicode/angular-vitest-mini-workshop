import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { TestBed } from '@angular/core/testing';
import { whenAppStable } from '../../testing/when-app-stable';
import { RecipeSearch } from './recipe-search.ng';
import { recipeMother } from './recipe.mother';

describe(RecipeSearch.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = createComponent();

    expect(await getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('filters recipes', async () => {
    const { getRecipeNames, setKeywords } = createComponent();

    setKeywords('Burger');

    expect(await getRecipeNames()).toEqual(['Burger']);
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
      async getRecipeNames() {
        await whenAppStable();
        return component.recipes?.hasValue
          ? component.recipes.value.map((recipe) => recipe.name)
          : null;
      },
      setKeywords(keywords: string) {
        component.filter$.next({ keywords });
      },
    };
  }
});
