import React from 'react';
import { ToastContainer } from 'react-toastify';

import App from './App';

import ReactDOM from 'react-dom/client'




const root = ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
      <ToastContainer />
      <App />
  </React.StrictMode>
);