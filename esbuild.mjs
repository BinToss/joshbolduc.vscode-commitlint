import { argv } from 'node:process';
import * as esbuild from 'esbuild';

// Where's the CLI output?
await esbuild.build({
  entryPoints: ['./src/extension.ts', './src/worker/index.ts'],
  bundle: true,
  tsconfig: 'src/tsconfig.json',
  outdir: 'dist',
  external: [
    'vscode',
    '@commitlint/lint',
    '@commitlint/load',
    '@commitlint/parse',
  ],
  format: 'cjs',
  platform: 'node',
  target: 'node14.16.0',
  sourcemap: true,
  watch: argv.includes('--watch'),
  minify: argv.includes('--minify'),
  logLevel: 'info',
});
