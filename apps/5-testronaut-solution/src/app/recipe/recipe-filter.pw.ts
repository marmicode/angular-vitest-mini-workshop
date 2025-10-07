import { test, expect } from '@testronaut/angular';
import { RecipeFilter } from './recipe-filter.ng';

test('recipe filter', async ({ page, mount }) => {
  const { outputs } = await mount(RecipeFilter);

  await page.getByText('Keywords').fill('Burger');

  expect(outputs.filterChange.calls).toHaveLength(1);
  expect(outputs.filterChange.calls[0]).toMatchObject({ keywords: 'Burger' });
});
