//This is Entry point of my application
//the new Queryclient instance (queryClient) is created This is the main crust of TanStack Query which helps in  managing caching, background updates, and more 
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();//New query client instance is created This manages cache and background updates

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  //Wrapping QueryClient Provider so that q available to all its descendant components.
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App /> 
    </QueryClientProvider>
  </React.StrictMode>
);