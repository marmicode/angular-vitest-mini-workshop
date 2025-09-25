import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 searches recipes without filtering');

  async function renderComponent() {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });

    const fixture = TestBed.createComponent(RecipeSearch);

    await fixture.whenStable();

    return {
      // TODO
    };
  }
});
