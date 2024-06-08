import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import uiReducer from './reducers/uiReducer';


const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
