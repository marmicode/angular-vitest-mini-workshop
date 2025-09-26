import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: `🚧 RecipeSearch`,
})
export class RecipeSearch implements OnInit {
  recipes?: Recipe[];

  ngOnInit() {
    throw new Error('🚧 Work in progress!');
  }
}
