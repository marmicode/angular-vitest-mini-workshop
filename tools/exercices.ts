export const exercises: Exercise[] = [
  {
    id: '1-recipe-search',
    name: '1. Recipe Search',
    implementationFiles: ['src/app/recipe/recipe-search.ng.ts'],
  },
  {
    id: '2-test-double',
    name: '2. Test Double',
  },
  {
    id: '3-refactor',
    name: '3. Refactor',
    implementationFiles: ['src/app/recipe/recipe-search.ng.ts'],
  },
  {
    id: '4-vitest-browser',
    name: '4. Vitest Browser',
  },
];

export interface Exercise {
  id: string;
  name: string;
  implementationFiles?: string[];
}
