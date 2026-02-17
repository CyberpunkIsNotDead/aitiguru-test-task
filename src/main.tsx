import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './index.scss';
import { Main } from '@/pages/Main';
import { Auth } from '@/pages/Auth';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
