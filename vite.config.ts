import { fileURLToPath, URL } from 'node:url';

import { defineConfig, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseConfig: UserConfig = {
    plugins: [
      vue(),
      dts({
        entryRoot: './src',
        tsconfigPath: './tsconfig.app.json',
      }),
    ],
    base: '/vue-dark-mode-toggle/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };

  if (mode === 'package') {
    return {
      ...baseConfig,
      build: {
        outDir: './lib',
        emptyOutDir: true,
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'VueDarkModeToggle',
          formats: ['es', 'cjs'],
        },
      },
      rollupOptions: {
        external: ['vue', 'vue3-code-block'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
    };
  } else {
    return {
      ...baseConfig,
      build: {
        outDir: './docs',
        emptyOutDir: true,
      },
    };
  }
});
