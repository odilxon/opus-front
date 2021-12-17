import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import LoaderPage from './components/LoaderPage';

ReactDOM.render(
  <Suspense fallback={<LoaderPage />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById('root')
);
