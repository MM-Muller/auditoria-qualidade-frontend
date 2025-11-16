import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'; 
import './index.css'; 

import App from './App';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      
      <App />
      
      {/* Container para exibir as notificações (toasts) */}
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false}
      />
      
      {/* Ferramenta de dev do React Query */}
      <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  </React.StrictMode>
);