// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust according to your store file path
import './index.css'; // Adjust if your CSS is named differently

// Use createRoot to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
