import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'coverage', 'docs'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig,
);
