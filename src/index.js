import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { BusinessProvider } from './contexts/BusinessContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <BusinessProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BusinessProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
