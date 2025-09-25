import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RecipeAddButton } from '../meal-planner/recipe-add-button.ng';
import { Catalog } from '../shared/catalog.ng';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import { RecipeFilter } from './recipe-filter.ng';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [
    Catalog,
    RecipeAddButton,
    RecipeFilter,
    RecipePreview,
    MatProgressSpinner,
  ],
  template: `
    <wm-recipe-filter (filterChange)="filter.set($event)"></wm-recipe-filter>
    <wm-catalog>
      @if (recipes.hasValue()) {
        @for (recipe of recipes.value(); track recipe.id) {
          <wm-recipe-preview [recipe]="recipe">
            <wm-recipe-add-button [recipe]="recipe" />
          </wm-recipe-preview>
        }

        @if (recipes.value().length === 0) {
          <div>No recipes found</div>
        }
      }

      @if (recipes.isLoading()) {
        <mat-progress-spinner mode="indeterminate" />
      }
    </wm-catalog>
  `,
})
export class RecipeSearch {
  filter = signal<RecipeFilterCriteria>({});
  recipes = rxResource({
    params: () => this.filter(),
    stream: ({ params }) => this._recipeRepository.search(params),
  });

  private _recipeRepository = inject(RecipeRepository);
}
