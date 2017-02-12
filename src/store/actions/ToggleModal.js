import * as types from '../constants/ActionTypes';

export function openModal() {
  console.log('action dispatched: open modal')
  return {
    type: types.OPEN_MODAL
  };
}

export function closeModal() {
  console.log('action dispatched: close modal')
  return {
    type: types.CLOSE_MODAL
  };
}