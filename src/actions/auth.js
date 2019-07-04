import Auth from '../api/auth';
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    LOAD_BOT_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL
} from '../utils/constants/ApiConstants';
import { showAlert } from '../utils/Helper';
import { something_wrong, forgot_message, time_out, no_account_message, oops } from '../utils/strings';

const api = new Auth();

export const loginUsingUsernameAndPassword = ( email, password ) => (dispatch) => {
    dispatch({
        type: LOGIN_USER,
    });

    api.loginUsingUsernameAndPassword(email, password, (error, response) => {

      if (error === true) {
        dispatch({
            type: LOGIN_USER_FAIL,
        });
        if(response === "no_permission"){
            setTimeout(function(){ showAlert(no_account_message, oops) }, 1000);
        }else{
            setTimeout(function(){ showAlert(response.message) }, 1000);
        }
      }else{
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: response
        });
      }

    });
};

export const loadPermissions = ( user ) => (dispatch) => {

    api.loadPermissions( (error, response) => {
        if (error === true) {
            dispatch({
                type: LOGIN_USER_FAIL,
            });
            setTimeout(function(){ showAlert(time_out) }, 1000);
          }else{
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: response
            });
          }
    }, user );
};

export const loadBot = (botId, user, allPermissions) => (dispatch) => {

    const response = {"botLoaded" : true};

    api.loadBot(botId, user, allPermissions, (error, response) => {

      if (error === true) {
        showAlert(something_wrong);
      }else{
        dispatch({
            type: LOAD_BOT_SUCCESS,
            payload: response
        });
      }

    }, response);
};

export const forgotPassword = (username) => (dispatch) => {
    dispatch({
        type: FORGOT_PASSWORD,
    });

    api.forgotPassword(username, (error, response) =>{
        if (error === true) {
            dispatch({
                type: FORGOT_PASSWORD_FAIL,
            });
            setTimeout(function(){ showAlert(response.message) }, 1000);
          } else {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: response
            });
            setTimeout(function(){ showAlert(forgot_message) }, 1000);
          }
    });

}

export const logout = (navigation, NavigationActions, StackActions) => (dispatch) => {

    dispatch({
        type: LOGOUT_USER,
    });

    api.logout((error, response) => {
        if(error === true){
            dispatch({
                type: LOGOUT_USER_FAIL,
            });
            setTimeout(function(){ showAlert(something_wrong) }, 1000);
        }else{
            dispatch({
                type: LOGOUT_USER_SUCCESS,
            });
            navigation.dispatch(StackActions.reset({
                   index: 0,
                   actions: [
                     NavigationActions.navigate({ routeName: 'LoginScreen'})
                   ]
            }));
        }
    });

}