import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {viteMockServe} from "vite-plugin-mock";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      ...(env.VITE_PROXY ? {
        proxy: {
          ...(!env.VITE_PROXY_TARGET ? ({
            '/api': {
              target: 'https://uwe.dyzoon.dev',
              changeOrigin: true,
            }
          }) : ({
            '/api': {
              target: env.VITE_PROXY_TARGET,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          }))
        }
      } : {})
    },
    plugins: [
      react(),
      viteMockServe({
        enable: Boolean(env.VITE_MOCK)
      }),
    ],
  };
})