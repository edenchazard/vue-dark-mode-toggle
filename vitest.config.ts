import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig({
    mode: 'test',
    command: 'build',
  }),
  defineConfig({
    test: {
      environment: 'happy-dom',
      exclude: [...configDefaults.exclude],
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{js,ts,vue}'],
        thresholds: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  }),
);
