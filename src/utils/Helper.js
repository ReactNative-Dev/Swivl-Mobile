import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

export const showAlert = (message, title) => {
    if(title !== null){
        Alert.alert(
            title,
            message
        );
    }else{
        Alert.alert(
            message
        );
    }

}

export const storedata = async (key, value) => {
    try{
        await AsyncStorage.setItem(key, value);
    }catch(error){
        console.log('Error: ', error);
    }
}

export const retrieveData = async (key) => {
    try{
        const value =  await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    }catch(error){
        return null;
    }
}

export const Helper = {
    shortId() {
      function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); };
      const data =  s4() + s4();
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // We make sure the ID starts with a letter. That way we ca use them as valid IDs.
      possible = possible.charAt(Math.floor(Math.random() * possible.length));
      return possible + data;
    },

    removeDuplicates(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }
}

export const BotUserHelper = {
    displayNameForUser(user, userVariables) {
      var displayName;
      for (var key in userVariables) {
        if (userVariables.hasOwnProperty(key)) { if (userVariables[key].displayName) {displayName = userVariables[key]; break; } }
      }
      if (displayName)  {
        if (user.get("userVariables") && user.get("userVariables")[displayName.id] && user.get("userVariables")[displayName.id].length > 0 ) {
          return user.get("userVariables")[displayName.id];
        }
      }
  
      if (user.get("userNumber")) {
        return "Unknown User " + user.get("userNumber");
      } else {
        return  "Unknown User " + user.id;
      }
    
    },

    displayEmailForUser(user, userVariables){
        var displayEmail;
        for(var key in userVariables){
            if(userVariables.hasOwnProperty(key)){
                if(userVariables[key].name === "Email Address"){
                    displayEmail = userVariables[key];
                    break;
                }
            }
        }

        if(displayEmail){
            if(user.get('userVariables') && user.get("userVariables")[displayEmail.id] && user.get("userVariables")[displayEmail.id].length > 0 ){
                return user.get("userVariables")[displayEmail.id];
            }else {
                return null;
            }
        }else {
            return null;
        }
    }
}

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));