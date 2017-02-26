import { combineReducers, createStore } from 'redux';
import modal from './modal'
import guitars from './guitars'

const reducer = combineReducers({
  modal,
  guitars
});

const store = createStore(reducer);

export default store;