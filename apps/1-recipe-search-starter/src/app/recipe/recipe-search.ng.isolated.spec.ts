import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 should search recipes without filtering');

  function createComponent() {
    TestBed.configureTestingModule({
      providers: [RecipeSearch, provideHttpClient()],
    });

    const component = TestBed.inject(RecipeSearch);

    component.ngOnInit();

    return {
      // TODO
    };
  }
});
