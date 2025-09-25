import { ResourceRef, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { whenAppStable } from '../../testing/when-app-stable';
import { Recipe } from './recipe';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';
import { recipeMother } from './recipe.mother';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
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

    /*
     * DO NOT DO THIS AT HOME.
     * This illustrates the drawbacks of "over-narrow" / "over-specifying" tests.
     */
    const component = TestBed.inject(RecipeSearch) as unknown as {
      filter: WritableSignal<RecipeFilterCriteria>;
      recipes: ResourceRef<Recipe[]>;
    };

    return {
      async getRecipeNames() {
        await whenAppStable();
        return component.recipes.hasValue()
          ? component.recipes.value().map((recipe) => recipe.name)
          : null;
      },
      setKeywords(keywords: string) {
        component.filter.set({ keywords });
      },
    };
  }
});
