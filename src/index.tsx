import React from 'react';
import ReactDOM from 'react-dom';
//Bring in provide
import { Provider  } from 'react-redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Bring in the RootStore
import { RootStore } from './store/RootStore';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={RootStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
