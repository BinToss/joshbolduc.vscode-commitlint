import { exec } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util'
import { default as esMain } from 'es-main'

const execAsync = promisify(exec)

const __dirname: string | undefined = (
  // @ts-expect-error Property 'dirname' does not exist on type 'ImportMeta'. ts(2339)
  'dirname' in import.meta && typeof import.meta.dirname === 'string'
    // @ts-expect-error Property 'dirname' does not exist on type 'ImportMeta'. ts(2339)
    ? import.meta.dirname as string | undefined
    : global.__dirname as string | undefined
) ?? (() => { throw new Error() })(); // odd that JS/TS prohibits throw-if-null coalescence expressions. Must wrap with IIEF.

const main = async () => {
  const testProjectRootPath = resolve(__dirname, '..', 'test', 'commitlint');
  const testDirs = readdirSync(testProjectRootPath)
    .map((item) => resolve(testProjectRootPath, item))
    .filter((path) => statSync(path).isDirectory());

  return await Promise.all(
    testDirs.map(async (path) => {
      console.log(`Preparing ${path}`);

      return await execAsync(
        'npm ci',
        {
          cwd: path,
          encoding: 'utf8',
        }
      );
    })
  )
};

if (esMain(import.meta)) {
  await main();
}
