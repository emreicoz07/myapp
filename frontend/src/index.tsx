import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18'de "React-dom/client" kullanıyoruz
import './index.css';
import { Provider } from 'react-redux'; // Redux store'u sağlayacak
import App from './App';
import store from './redux/store'; // Redux store'u import ediyoruz

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container); // createRoot API'sini burada kullanıyoruz.

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
