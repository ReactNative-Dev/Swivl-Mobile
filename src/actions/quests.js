import Quests from '../api/quests';
import {
    LOAD_QUESTS_SUCCESS,
    LOAD_QUESTS,
    SEND_QUEST
} from '../utils/constants/ApiConstants';
import { showAlert } from '../utils/Helper';
import { no_quest_found } from '../utils/strings';

const api = new Quests();

export const loadQuests = () => (dispatch) => {
    dispatch({ type: LOAD_QUESTS });

    api.loadQuests((error, response) => {

      if (error === true) {
        showAlert(no_quest_found);
      }else{
        dispatch({
            type: LOAD_QUESTS_SUCCESS,
            payload: response
          });
      }

    });
};

export const sendQuest = (quest) => (dispatch) => {
  dispatch({
    type: SEND_QUEST,
    payload: quest
  });
};