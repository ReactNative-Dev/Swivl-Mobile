import Conversations from '../api/conversations';
import {
    LOAD_CONVERSATION_SUCCESS,
    LOAD_CONVERSATION,
    LOAD_CONVERSATION_FAIL,
    LOAD_VARIABLES_SUCCESS,
    LOAD_VARIABLES,
    LOAD_VARIABLES_FAIL
} from '../utils/constants/ApiConstants';
import { showAlert } from '../utils/Helper';
import { something_wrong, no_bot_found } from '../utils/strings';

const api = new Conversations();

export const loadConversations = () => (dispatch) => {
    dispatch({
      type: LOAD_CONVERSATION,
    });

    api.loadConversations((error, response) => {

      if (error === true) {
        dispatch({
          type: LOAD_CONVERSATION_FAIL,
        });
        setTimeout(function(){ showAlert(no_bot_found) }, 1000)
      }else{
        dispatch({
            type: LOAD_CONVERSATION_SUCCESS,
            payload: response
        });
        setTimeout(function(){ api.subscribe(); }, 2000);
      }

    });
};

export const setPauseOnUser =(users, botuser, date) => (dispatch) => {
  api.setPauseOnUser(users, botuser, date, (error, response) => {
    if (error === true) {
      showAlert(something_wrong);
    }else{
      dispatch({
          type: LOAD_CONVERSATION_SUCCESS,
          payload: response
        });
    }
  })
};

export const loadUserVariables = () => (dispatch) => {
  dispatch({
    type: LOAD_VARIABLES,
  });

  api.loadUserVariables( (error, response) => {
    if (error === true) {
      dispatch({
        type: LOAD_VARIABLES_FAIL,
      });
      setTimeout(function(){ showAlert(something_wrong); }, 1000);
    }else{
      dispatch({
        type: LOAD_VARIABLES_SUCCESS,
        payload: response
      });
    }
  });
};

export const updateUser = (user, save) => () => {
  api.updateUser ( user, save );
}

export const unsubscribeLiveQuery =() =>() => {
  api.unsubscribe();
}