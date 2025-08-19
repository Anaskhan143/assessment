import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HydratedRouter />
  </StrictMode>
);