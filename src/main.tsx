import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {App, ConfigProvider, ThemeConfig} from "antd";
import {RouterProvider} from "react-router";
import {router} from "./router.tsx";

const queryClient = new QueryClient();

const theme = {
    components: {
        Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
        },
        Statistic: {
            contentFontSize: 18
        }
    },
    cssVar: true
} as ThemeConfig;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={theme}>
              <App style={{ height: '100%' }}>
                  <RouterProvider router={router} />
              </App>
          </ConfigProvider>
      </QueryClientProvider>
  </StrictMode>,
)
