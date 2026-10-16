import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { preventOrphans } from './lib/noOrphans';
import './index.css';

// A reload always starts at the top: no browser scroll restoration, no leftover #section.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
const nav = performance.getEntriesByType('navigation')[0];
if (nav && nav.type === 'reload' && window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

preventOrphans(root);
