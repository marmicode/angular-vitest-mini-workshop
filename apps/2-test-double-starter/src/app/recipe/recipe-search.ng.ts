import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Catalog } from '../shared/catalog.ng';
import { Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [Catalog, RecipePreview, MatProgressSpinner],
  template: `
    <wm-catalog>
      @if (recipes === undefined) {
        <mat-progress-spinner mode="indeterminate" />
      } @else {
        @for (recipe of recipes; track recipe.id) {
          <wm-recipe-preview [recipe]="recipe" />
        } @empty {
          <div>No recipes found</div>
        }
      }
    </wm-catalog>
  `,
})
export class RecipeSearch implements OnInit {
  recipes?: Recipe[];

  /*
   * DO NOT DO THIS AT HOME.
   *
   * The component implementation here is not ideal and will be refactored in a future exercise.
   * It was implemented this way just to illustrate some challenges.
   */

  private _cdr = inject(ChangeDetectorRef, { optional: true });
  private _recipeRepository = inject(RecipeRepository);

  ngOnInit() {
    this._recipeRepository.search().subscribe((recipes) => {
      this.recipes = recipes;
      this._cdr?.markForCheck();
    });
  }
}
