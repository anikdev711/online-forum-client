import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { router } from './Routers/Router'
import {
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <AuthProvider>
      <HelmetProvider>
        <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router} />
        </div>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
