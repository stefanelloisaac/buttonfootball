import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

/** Converte uma lista de tipos de domínio em selectors object-based de destino. */
const toTypes = (...types) => types.map((type) => ({ to: { type } }));

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  // Fronteiras de arquitetura (ver ARCHITECTURE.md, seções 2 e 5).
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        node: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
      },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        { type: 'core', pattern: 'src/core', mode: 'folder' },
        { type: 'game', pattern: 'src/game', mode: 'folder' },
        { type: 'field', pattern: 'src/field', mode: 'folder' },
        { type: 'physics', pattern: 'src/physics', mode: 'folder' },
        { type: 'rules', pattern: 'src/rules', mode: 'folder' },
        { type: 'input', pattern: 'src/input', mode: 'folder' },
        { type: 'render', pattern: 'src/render', mode: 'folder' },
        { type: 'ai', pattern: 'src/ai', mode: 'folder' },
        { type: 'ui', pattern: 'src/ui', mode: 'folder' },
      ],
    },
    rules: {
      'boundaries/no-unknown': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: { type: 'core' }, allow: toTypes('core') },
            { from: { type: 'game' }, allow: toTypes('core', 'game') },
            {
              from: { type: 'field' },
              allow: toTypes('core', 'game', 'field'),
            },
            {
              from: { type: 'physics' },
              allow: toTypes('core', 'game', 'physics'),
            },
            {
              from: { type: 'rules' },
              allow: toTypes('core', 'game', 'field', 'rules'),
            },
            {
              from: { type: 'input' },
              allow: toTypes('core', 'game', 'input'),
            },
            {
              from: { type: 'render' },
              allow: toTypes('core', 'game', 'input', 'render'),
            },
            {
              from: { type: 'ai' },
              allow: toTypes('core', 'game', 'input', 'ai'),
            },
            {
              from: { type: 'ui' },
              allow: toTypes(
                'core',
                'game',
                'field',
                'physics',
                'rules',
                'input',
                'render',
                'ai',
                'ui',
              ),
            },
          ],
        },
      ],
    },
  },
  // O entrypoint (main.tsx) fica fora das fronteiras de domínio.
  {
    files: ['src/main.tsx'],
    rules: {
      'boundaries/dependencies': 'off',
      'boundaries/no-unknown': 'off',
    },
  },
  // DEVE ser o último: desativa regras de estilo que conflitam com o Prettier.
  prettier,
]);
