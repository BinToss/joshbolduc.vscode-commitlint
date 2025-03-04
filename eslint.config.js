import { default as js } from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { default as eslintPluginImportX } from 'eslint-plugin-import-x'
import globals from 'globals'
import tseslint from 'typescript-eslint';

// re: migration to ESLint v9; See https://eslint.org/docs/latest/extend/plugin-migration-flat-config

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettier,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    name: 'vscode-commitlint_eslintConfig',
    languageOptions: {
      // replaces 'env'. See https://stackoverflow.com/a/77759885
      globals: { ...globals.node },
      parserOptions: {
        // replaces `project: boolean | string`; See https://typescript-eslint.io/blog/announcing-typescript-eslint-v8-beta/#project-service
        projectService: true
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    ignores: ["src/git.d.ts", "node_modules/**/*"],
    rules: {
      curly: ["error", "all"],
      "import/order": ["warn", { "alphabetize": { "order": "asc" } }],
      "object-shorthand": [
        "warn",
        "always",
        {
          "ignoreConstructors": false,
          "avoidQuotes": true
        }
      ],
      "sort-imports": [
        "warn",
        { "ignoreCase": true, "ignoreDeclarationSort": true }
      ]
    }
  },
  {
    // See https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
    name: 'eslint-plugin-import_tseslint_overrides',
    rules: {
      'import/namespace': ['off'],
      'import/default': ['off'],
      'import/no-named-as-default-member': ['off'],
      'import/no-unresolved': ['off']
    }
  }
)
