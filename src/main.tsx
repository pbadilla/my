import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import { ToastContainer } from 'react-toastify';

// Hydrate the application on the client side
const root = ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
      <ToastContainer />
      <App />
  </React.StrictMode>
);