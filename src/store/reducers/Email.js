import * as types from '../constants/ActionTypes';

const addEmailStatus = (state = false, action) => {
  switch (action.type) {
    case types.SET_ADD_EMAIL_PENDING:
      return {
        ...state,
        isAddEmailPending: action.isAddEmailPending
      }

    case types.SET_ADD_EMAIL_SUCCESS:
      return {
        ...state,
        isAddEmailSuccess: action.isAddEmailSuccess
      }

    case types.SET_ADD_EMAIL_ERROR:
      return {
        ...state,
        addEmailError: action.addEmailError
      }

    default:
      return state;
  }
}

export default addEmailStatus;