import { fileURLToPath, URL } from 'node:url';
import { defineConfig, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
        '@demo': fileURLToPath(new URL('demo', import.meta.url)),
      },
    },
    build: {
      emptyOutDir: true,
      cssMinify: true,
    },
  };

  if (mode === 'docs') {
    config.base = '/vue-dark-mode-toggle/';
    config.build = {
      ...config.build,
      outDir: 'docs',
    };
  } else {
    config.plugins?.push(
      dts({
        entryRoot: './src',
        tsconfigPath: './tsconfig.json',
      }),
    );
    config.build = {
      ...config.build,
      outDir: 'dist',
      lib: {
        entry: {
          index: resolve('src/index.ts'),
        },
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    };
  }

  return config;
});
