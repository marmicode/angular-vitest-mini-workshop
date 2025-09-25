export const exercises: Exercise[] = [
  {
    id: '1-recipe-search',
    name: 'Recipe Search',
    implementationFiles: ['src/app/recipe/recipe-search.ng.ts'],
  },
  {
    id: '2-test-double',
    name: 'Test Double',
  },
  {
    id: '3-refactor',
    name: 'Refactor',
    implementationFiles: ['src/app/recipe/recipe-search.ng.ts'],
  },
  {
    id: '4-vitest-browser',
    name: 'Vitest Browser',
  },
];

export interface Exercise {
  id: string;
  name: string;
  implementationFiles?: string[];
  flavors?: string[];
}
