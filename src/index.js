import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Suspense fallback={'...Loading!'}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById('root')
);
