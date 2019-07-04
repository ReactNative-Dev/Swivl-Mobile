import Parse from 'parse/react-native';
import Singleton from '../utils/Singleton';
import { store } from '../utils/Helper';
import { LOAD_CONVERSATION_SUCCESS, LOAD_VARIABLES_SUCCESS } from '../utils/constants/ApiConstants';

const singleton = Singleton.getInstance();
export default class Conversations {

    loadConversations(callback) {
      var self = this;
      var bot = singleton.getBot();
      var BotUserClass = Parse.Object.extend("BotUser");
      var query = new Parse.Query(BotUserClass);
      query.equalTo("bot", bot);
      query.notEqualTo("isTestBotUser", true);

      query.descending('lastInteraction');
      query.limit(10000)

      query.find().then(function(users) {
        self.setUsers(users, callback);
      }).catch(function(error) {
        console.warn("Error Loading Conversation",  error);
      });
    }

    setUsers(users, callback) {
        const now =  new Date();
        for (var i = 0; i < users.length; i++) {
          if (users[i].get('pauseDate')) {
              const minutes = Math.floor(((now - users[i].get("pauseDate"))/1000)/60);
              if (minutes < 60) { users[i].isConversationTakenOver = true; } else {  users[i].isConversationTakenOver = false; }
          } else {
            users[i].isConversationTakenOver = false;
          }
        }
        singleton.setBotUsers(users);
        callback(false, users);
    }

    setPauseOnUser(users, botUserOrId, pauseDate, callback) {
      if (!botUserOrId) { console.warn("No Id"); return; }
      const  userId = (typeof botUserOrId == 'string') ? botUserOrId : botUserOrId.id;
      if (!userId) { console.warn("No Id"); return; }

      for (var i = 0; i < users.length; i++) {
        if (users[i].id && users[i].id == userId) {
          users[i].set("pauseDate", pauseDate);
          if (pauseDate) { users[i].set("hasHadHumanTakeover", true); }
          users[i].save().catch(function(error) { console.error("There was an error changing pause data");  })
          this.setUsers(users, callback);
          break;
        }
      }
    }

    loadUserVariables(callback) {
      var self = this;
      var UserVariablesClass = Parse.Object.extend("UserVariables");
      var query = new Parse.Query(UserVariablesClass);
      query.equalTo("bot", singleton.getBot())

      query.first().then(function(userVariablesObj) {
        if (userVariablesObj && userVariablesObj.get("variables")) {
          self.setUserVariables(userVariablesObj.get("variables"), callback);
        } else {
          self.setUserVariables({}, callback);
        }
      }).catch(function(error) {console.warn("Error Loading UserVariables", error);});
    }

    setUserVariables(userVariables, callback) {
      var filteredObj = {};
      for (var varName in userVariables) {
        if (!userVariables[varName]['name'].includes("Hidden*")) {
          filteredObj[varName] = userVariables[varName]
        }
      }
      if(callback !== null){
        callback(false, userVariables);
      }else{
        store.dispatch({
          type: LOAD_VARIABLES_SUCCESS,
          payload: userVariables
        });
      }
      
    }

    updateUser(user, save) {
      var users = singleton.getBotUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id && users[i].id == user.id) {
          users[i] = user;
          if (save) {
            users[i].save().catch(function(error) { console.error("There was an error changing pause data"); })
          }
          singleton.setBotUsers(users);
          break;
        }
      }
    }

    getQuery() {
      var BotUserClass = Parse.Object.extend("BotUser");
      var query = new Parse.Query(BotUserClass);
      query.equalTo("bot", singleton.getBot());
      query.notEqualTo("isTestBotUser", true);
      query.descending('lastInteraction');
      query.limit(10000)
      return query;
    }

    subscribe()  {
      console.log("Subscribing");
      var self = this;

      Parse.liveQueryServerURL =  "wss://swivl-livequery-staging.herokuapp.com";
      if (!this.subscription) {
        console.log("SETTING UP SUBSCRIPTION");
        var query = this.getQuery();

        query.subscribe().then(function(subscription)  {
        console.log("Sub", subscription);
        self.subscription = subscription;

        console.log("this.subscription",self.subscription);
        self.subscription.on('create', (user) => {
          console.log("CREATED!", user);
          user.isConversationTakenOver = false;
          const users = (singleton.getBotUsers()) ? [user].concat(singleton.getBotUsers()) : [user];
          singleton.setBotUsers(users);
          self.conversations(users);
          self.loadUserVariables(null);
        });

        self.subscription.on('update', (user) => {
          console.log("UPDATED!", user);
          var users = singleton.getBotUsers();
          const now =  new Date();
          for (var i = 0; i < users.length; i++) {
            if (users[i].id == user.id) {
              console.log("MATCHING USER");
              if(user.get('pauseDate') !== null){
                user.isConversationTakenOver = true;
              }else {
                user.isConversationTakenOver = false;
              }
              users[i] = user;
            }
          }
          singleton.setBotUsers(users);
          self.conversations(users);
          self.loadUserVariables(null);
        });
      }).catch(function(error ){
        console.log("Error:", error);
      });

      } else {
        console.log("NOT SETTING UP SUBSCRIPTION");
      }
  }

  conversations(response) {
    store.dispatch({
      type: LOAD_CONVERSATION_SUCCESS,
      payload: response
    });
  };

  unsubscribe() {
    console.log("Unsubscribeing");
    if (this.subscription) { 
      this.subscription.unsubscribe(); 
      this.subscription = undefined;
    }
    Parse.LiveQuery.close();
  }

}