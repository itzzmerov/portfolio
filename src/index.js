import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LoaderProvider } from "./context/LoaderContext";
import GlobalLoader from "./components/GlobalLoader";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoaderProvider>
      <GlobalLoader />
      <App />
    </LoaderProvider>
  </React.StrictMode>
);
