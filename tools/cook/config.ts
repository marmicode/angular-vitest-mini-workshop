import { type Config, type Exercise } from './core.ts';

const files = {
  recipeSearch: 'src/app/recipe/recipe-search.ng.ts',
};

const exercises: Exercise[] = [
  {
    id: '1-recipe-search',
    name: '1. Recipe Search',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '2-test-double',
    name: '2. Test Double',
  },
  {
    id: '3-refactor',
    name: '3. Refactor',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '4-vitest-browser',
    name: '4. Vitest Browser',
  },
  {
    id: '5-testronaut',
    name: '5. Testronaut',
  },
];

export const config: Config = {
  base: 'main',
  exercises,
};
