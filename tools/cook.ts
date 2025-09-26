import { execSync } from 'child_process';
import enquirer from 'enquirer';
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { exercises, type Exercise } from './exercices.ts';
import { join } from 'node:path';
const { prompt } = enquirer;

const STARTER_SUFFIX = '-starter';
const SOLUTION_SUFFIX = '-solution';
const COOKING_BRANCH = 'cooking';

export async function main(ctx: Context) {
  const { promptAdapter } = ctx;
  const exercise = maybeGetCurrentExercise(ctx);

  if (!exercise) {
    await goToExercise(ctx);
    return;
  }

  const { command } = await promptAdapter.prompt<{ command: Command }>({
    type: 'autocomplete',
    name: 'command',
    message: 'Choose an option:',
    choices: [
      {
        name: 'start',
        message: 'Start a new exercise',
      },
      {
        name: 'checkout-impl',
        message: 'My test is ready, checkout the implementation',
      },
      {
        name: 'solution',
        message: 'Go to solution',
      },
    ] satisfies Array<{ name: Command; message: string }>,
  });

  switch (command) {
    case 'start':
      await goToExercise(ctx);
      break;
    case 'checkout-impl':
      checkoutImplementation(ctx, exercise);
      break;
    case 'solution':
      await checkoutSolution(ctx, exercise);
      break;
    default:
      console.error('Invalid choice');
      process.exit(1);
  }
}

type Command = 'start' | 'checkout-impl' | 'solution';

interface Context {
  base: string;
  commandRunner: CommandRunner;
  fileSystemAdapter: FileSystemAdapter;
  gitAdapter: GitAdapter;
  promptAdapter: PromptAdapter;
}

export async function checkoutSolution(ctx: Context, exercise: Exercise) {
  await prepareCookingBranch(ctx);
  focusOnProject(ctx, `${exercise.id}${SOLUTION_SUFFIX}`);
}

export async function goToExercise(ctx: Context) {
  const { promptAdapter } = ctx;
  const exerciseChoice = await promptAdapter.prompt<{ exercise: string }>({
    type: 'autocomplete',
    name: 'exercise',
    message: 'Choose an exercise:',
    choices: exercises.map((exercise) => ({
      name: exercise.id,
      message: exercise.name,
    })),
  });

  const selectedExercise = exercises.find(
    (ex) => ex.id === exerciseChoice.exercise,
  );
  if (!selectedExercise) {
    console.error('Selected exercise not found');
    process.exit(1);
  }

  let tdd = true;

  if (selectedExercise.implementationFiles) {
    const tddChoice = await promptAdapter.prompt<{ useTdd: boolean }>({
      type: 'confirm',
      name: 'useTdd',
      message: 'Do you want to use TDD?',
      initial: true,
    });
    tdd = tddChoice.useTdd;
  }

  console.log(`\nSetting up exercise: ${selectedExercise.name}`);
  console.log(`TDD mode: ${tdd ? 'Yes' : 'No'}`);
  console.log('Running git commands...\n');

  await prepareCookingBranch(ctx);

  if (!tdd) {
    checkoutImplementation(ctx, selectedExercise);
  }

  focusOnProject(ctx, `${selectedExercise.id}${STARTER_SUFFIX}`);

  console.log('\n✅ Exercise setup complete!');
}

export function checkoutImplementation(ctx: Context, exercise: Exercise) {
  const { commandRunner } = ctx;

  console.log(`Checking out solution files...`);
  for (const relativePath of exercise.implementationFiles ?? []) {
    const solutionFile = `apps/${exercise.id}${SOLUTION_SUFFIX}/${relativePath}`;
    const starterFile = `apps/${exercise.id}${STARTER_SUFFIX}/${relativePath}`;

    commandRunner.executeCommand(
      `git show angular-vitest-mini-workshop:${solutionFile} > ${starterFile}`,
    );
  }
}

function maybeGetCurrentExercise({
  fileSystemAdapter,
}: Context): Exercise | null {
  const { defaultProject } = JSON.parse(fileSystemAdapter.readFile('nx.json'));

  if (defaultProject == null || !defaultProject.endsWith('-starter')) {
    return null;
  }

  const exerciseId = defaultProject.replace(STARTER_SUFFIX, '');

  return exercises.find((exercise) => exercise.id === exerciseId) ?? null;
}

function focusOnProject(ctx: Context, project: string) {
  const { commandRunner, fileSystemAdapter } = ctx;
  const nxJson = JSON.parse(fileSystemAdapter.readFile('nx.json'));
  fileSystemAdapter.writeFile(
    'nx.json',
    JSON.stringify({
      ...nxJson,
      defaultProject: project,
    }),
  );

  const appsFolder = 'apps';
  for (const folder of fileSystemAdapter.readDir(appsFolder)) {
    if (folder !== project) {
      fileSystemAdapter.removeDir(join(appsFolder, folder));
    }
  }

  commandRunner.executeCommand(`pnpm nx format --files nx.json`);
  commandRunner.executeCommand(`git add .`);
  commandRunner.executeCommand(`git commit -m "feat: ✨ focus on ${project}"`);
}

async function prepareCookingBranch(ctx: Context) {
  const { base, commandRunner } = ctx;
  const branch = COOKING_BRANCH;
  await maybeWipeout(ctx);

  console.log(`Switching to "${branch}" branch...`);

  commandRunner.executeCommand(`git switch ${base}`);
  commandRunner.executeCommand(`git branch -D ${branch} || true`);
  commandRunner.executeCommand(`git switch -c ${branch}`);
}

async function maybeWipeout(ctx: Context) {
  const { commandRunner, gitAdapter, promptAdapter } = ctx;
  if (!gitAdapter.hasLocalChanges()) {
    return;
  }

  const { confirmOverwrite } = await promptAdapter.prompt<{
    confirmOverwrite: boolean;
  }>({
    type: 'confirm',
    name: 'confirmOverwrite',
    message:
      'You have local changes (including untracked files). This will overwrite all your local changes. Continue?',
    initial: true,
  });

  if (!confirmOverwrite) {
    console.log('Operation cancelled.');
    process.exit(0);
  }

  console.log('Resetting to clean state...');
  commandRunner.executeCommand('git reset --hard');

  console.log('Cleaning untracked files...');
  commandRunner.executeCommand('git clean -df');
}

export class CommandRunner {
  executeCommand(command: string): void {
    execSync(command, { stdio: 'inherit' });
  }
}

export class FileSystemAdapter {
  readFile(path: string): string {
    return readFileSync(path, {
      encoding: 'utf-8',
    });
  }

  writeFile(path: string, content: string): void {
    writeFileSync(path, content, {
      encoding: 'utf-8',
    });
  }

  readDir(path: string): string[] {
    return readdirSync(path);
  }

  removeDir(path: string): void {
    rmSync(path, { recursive: true });
  }
}

export class GitAdapter {
  getCurrentBranch() {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  }

  hasLocalChanges() {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length > 0;
  }
}

export class PromptAdapter {
  prompt<T>(
    ...args: Parameters<typeof prompt<T>>
  ): ReturnType<typeof prompt<T>> {
    return prompt(...args);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main({
    base: 'angular-vitest-mini-workshop',
    commandRunner: new CommandRunner(),
    fileSystemAdapter: new FileSystemAdapter(),
    gitAdapter: new GitAdapter(),
    promptAdapter: new PromptAdapter(),
  });
}
