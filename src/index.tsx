import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from 'reportWebVitals';
import App from 'App';
import 'index.css';
import { toastConfig } from 'utils/toastConfig';
import { Provider } from 'react-redux';
import store from 'store';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer {...toastConfig}/>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);

reportWebVitals();
