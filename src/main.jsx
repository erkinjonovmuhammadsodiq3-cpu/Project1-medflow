import React from 'react';
import { createRoot } from 'react-dom/client';
import LegacyApp from './LegacyApp.jsx';
import './legacy-app.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LegacyApp />
  </React.StrictMode>
);
