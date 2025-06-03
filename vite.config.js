import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const appVersion = packageJson.version;

export default defineConfig(() => {

  return {
    plugins: [
      { enforce: 'pre', ...mdx() },
      react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    ],
    define: {
      global: {},
      __APP_VERSION__: JSON.stringify(appVersion),
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
  };
});
