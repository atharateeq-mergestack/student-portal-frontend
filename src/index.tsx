import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import App from 'App';
import './index.css';
import { toastConfig } from 'utils/toastConfig';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer {...toastConfig}/>
    <App />
  </React.StrictMode>,
  rootElement
);

reportWebVitals();
