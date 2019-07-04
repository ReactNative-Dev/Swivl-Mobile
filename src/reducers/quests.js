import {
    LOAD_QUESTS_SUCCESS,
    LOAD_QUESTS_FAIL,
    LOAD_QUESTS,
    SEND_QUEST
} from '../utils/constants/ApiConstants';

const INITIAL_STATE = {
    quests: null,
    error: '',
    loading: false,
    quest: null,
    journeys: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOAD_QUESTS:
            return { ...state, loading: true };

        case LOAD_QUESTS_SUCCESS:
            return { ...state, ...INITIAL_STATE, journeys: action.payload };
  
        case LOAD_QUESTS_FAIL:
            return { ...state, loading: false };
  
        case SEND_QUEST:
            return { ...state, quest: action.payload };

        default:
            return state;
    }
}; 