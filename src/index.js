import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker'; //离线缓存
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import moment from 'moment';

import './scss/main.scss';

window.moment = moment;
// console.log(window.moment());
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
