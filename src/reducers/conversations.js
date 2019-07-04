import {
    LOAD_CONVERSATION_SUCCESS,
    LOAD_CONVERSATION_FAIL,
    LOAD_CONVERSATION,
    LOAD_VARIABLES_SUCCESS,
    LOAD_VARIABLES,
    LOAD_VARIABLES_FAIL
} from '../utils/constants/ApiConstants';

const INITIAL_STATE = {
    users: null,
    error: '',
    loading: false,
    variables: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOAD_CONVERSATION:
            return { ...state, loading: true }

        case LOAD_CONVERSATION_SUCCESS:
            return { ...state, ...INITIAL_STATE, users: action.payload, loading: false };
  
        case LOAD_CONVERSATION_FAIL:
            return { ...state, loading: false };
  
        case LOAD_VARIABLES:
            return { ...state, loading: true };
  
        case LOAD_VARIABLES_SUCCESS:
            return { ...state, variables: action.payload, loading: false };

        case LOAD_VARIABLES_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
};