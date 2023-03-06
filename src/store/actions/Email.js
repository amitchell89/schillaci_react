import * as types from '../constants/ActionTypes';
import ReactGA from 'react-ga';

import { sendToApi } from '../../lib/sendToApi';

export function addEmail(data) {
  console.log('action: add Email', data)

  return dispatch => {
    dispatch(setAddEmailPending(true));
    dispatch(setAddEmailSuccess(false));
    dispatch(setAddEmailError(null));
    sendToApi('api/addEmail', data).then((payload) =>  {
      dispatch(setAddEmailPending(false));
      // console.log('server response', payload[0].status)
      if(payload[0].status === 200) {
      	console.log('action: success', payload[1])
        dispatch(setAddEmailSuccess(true));
        ReactGA.event({
          category: 'EmailSignup',
          action: 'submit',
        });

        // fetch('/emailSignup', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     email: data.email
        //   })
        // });
        
      } else {
        console.log('action: error!', payload[1])
        dispatch(setAddEmailError(payload[1].message));
      }
    }).catch((payload) => {});
  }
}

function setAddEmailPending(isAddEmailPending) {
  return {
    type: types.SET_ADD_EMAIL_PENDING,
    isAddEmailPending
  };
}
 
function setAddEmailSuccess(isAddEmailSuccess) {
  return {
    type: types.SET_ADD_EMAIL_SUCCESS,
    isAddEmailSuccess
  };
}
 
function setAddEmailError(addEmailError) {
  return {
    type: types.SET_ADD_EMAIL_ERROR,
    addEmailError
  }
}