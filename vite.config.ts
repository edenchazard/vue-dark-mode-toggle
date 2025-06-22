import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@demo': '/demo',
        '@src': '/src',
      },
    },
    build: {
      emptyOutDir: true,
      cssMinify: true,
    },
  };

  if (mode === 'docs') {
    config.base = '/vue-rise-and-shine/';
    config.build = {
      ...config.build,
      outDir: 'docs',
    };
  } else {
    config.plugins?.push?.(
      dts({
        tsconfigPath: './tsconfig.json',
        include: ['./src'],
        aliasesExclude: ['@src'],
      }),
    );

    config.build = {
      ...config.build,
      outDir: 'dist',
      lib: {
        entry: {
          index: 'src/index.ts',
        },
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'vue',
          },
        },
      },
    };
  }

  return config;
});
