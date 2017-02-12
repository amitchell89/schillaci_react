import { combineReducers, createStore } from 'redux';
import modal from './modal'

const reducer = combineReducers({
  modal
});

const store = createStore(reducer);

export default store;