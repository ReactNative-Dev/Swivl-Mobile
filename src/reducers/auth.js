import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    LOAD_BOT_SUCCESS,
    LOAD_PERMISSIONS,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL
} from '../utils/constants/ApiConstants';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    forgot: false,
    botLoading: null,
    loggedIn: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state, loading: true };

        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload, loading: false };
  
        case LOGIN_USER_FAIL:
            return { ...state, loading: false };
  
        case FORGOT_PASSWORD:
            return { ...state, loading: true };

        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, ...INITIAL_STATE, forgot: true };
  
        case FORGOT_PASSWORD_FAIL:
            return { ...state, loading: false };
  
        case LOAD_BOT_SUCCESS:
            return { ...state, ...INITIAL_STATE, botLoading: action.payload };
        
        case LOAD_PERMISSIONS:
            return { ...state, loggedIn: action.payload };

        case LOGOUT_USER:
            return { ...state, loading: true };

        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false };
  
        case LOGOUT_USER_FAIL:
            return { ...state, loading: false };

        default:
            return state;
    }
};