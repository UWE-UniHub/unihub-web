import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App, ConfigProvider } from "antd";
import {RouterProvider} from "react-router";
import {router} from "./router.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={{ cssVar: true }}>
              <App style={{ height: '100%' }}>
                  <RouterProvider router={router} />
              </App>
          </ConfigProvider>
      </QueryClientProvider>
  </StrictMode>,
)
