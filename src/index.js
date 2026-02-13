import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root_order_create'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
