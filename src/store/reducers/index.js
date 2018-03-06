import { combineReducers, createStore, applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import modal from './modal';
import guitars from './guitars';
import email from './Email';

const reducer = combineReducers({
  modal,
  guitars,
  email
});

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);
/* eslint-enable */

export default store;