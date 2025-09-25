import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Suspense, suspensify } from '@jscutlery/operators';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Catalog } from '../shared/catalog.ng';
import { Recipe } from './recipe';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import { RecipeFilter } from './recipe-filter.ng';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [Catalog, RecipeFilter, RecipePreview, MatProgressSpinner],
  template: `
    <wm-recipe-filter (filterChange)="filter.set($event)"></wm-recipe-filter>
    <wm-catalog>
      @if (recipes.isLoading()) {
        <mat-progress-spinner mode="indeterminate" />
      }

      @if (recipes.hasValue()) {
        @for (recipe of recipes.value(); track recipe.id) {
          <wm-recipe-preview [recipe]="recipe" />
        } @empty {
          <div>No recipes found</div>
        }
      }
    </wm-catalog>
  `,
})
export class RecipeSearch {
  protected filter = signal<RecipeFilterCriteria>({});
  protected recipes = rxResource({
    params: () => this.filter(),
    stream: ({ params }) => this._recipeRepository.search(params),
  });

  private _recipeRepository = inject(RecipeRepository);
}
