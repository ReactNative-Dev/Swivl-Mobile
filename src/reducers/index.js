import { combineReducers } from "redux";

// import reducers

import auth from './auth';
import conversation from './conversations';
import quests from './quests';

export default combineReducers({
    authentication: auth,
    conversation: conversation,
    quests: quests
});