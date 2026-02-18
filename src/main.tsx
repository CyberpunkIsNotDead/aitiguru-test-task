import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import AuthGuard from '@/app/AuthGuard';
import { Auth } from '@/pages/Auth';
import { Main } from '@/pages/Main';
import { queryClient } from '@/shared/api/queryClient';

import './index.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <AuthGuard>
                <Main />
              </AuthGuard>
            }
          />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
