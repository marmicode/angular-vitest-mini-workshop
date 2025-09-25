import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [Catalog, RecipeFilter, RecipePreview, MatProgressSpinner],
  template: `
    <wm-recipe-filter (filterChange)="filter$.next($event)"></wm-recipe-filter>
    <wm-catalog>
      @if (recipes !== undefined) {
        @if (recipes.pending) {
          <mat-progress-spinner mode="indeterminate" />
        }

        @if (recipes.hasValue) {
          @for (recipe of recipes.value; track recipe.id) {
            <wm-recipe-preview [recipe]="recipe" />
          } @empty {
            <div>No recipes found</div>
          }
        }
      }
    </wm-catalog>
  `,
})
export class RecipeSearch implements OnInit {
  filter$ = new BehaviorSubject<RecipeFilterCriteria>({});
  recipes?: Suspense<Recipe[]>;

  /*
   * DO NOT DO THIS AT HOME.
   *
   * The component implementation here is not ideal and will be refactored in a future exercise.
   * It was implemented this way just to illustrate some challenges.
   */

  private _cdr = inject(ChangeDetectorRef, { optional: true });
  private _recipeRepository = inject(RecipeRepository);

  ngOnInit() {
    this.filter$
      .pipe(
        switchMap((filter) =>
          this._recipeRepository.search(filter).pipe(suspensify()),
        ),
      )
      .subscribe((recipes) => {
        this.recipes = recipes;
        this._cdr?.markForCheck();
      });
  }
}
