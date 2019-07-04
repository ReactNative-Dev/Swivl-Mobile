import Parse from 'parse/react-native';
import { showAlert } from '../utils/Helper';
import Singleton from '../utils/Singleton';
import {
  UrbanAirship
} from 'urbanairship-react-native';

const singleton = Singleton.getInstance();
export default class Auth {

    loginUsingUsernameAndPassword( username, password, callback ) {
        var self = this;
        Parse.User.logIn( username, password )
            .then(response => { self.callSuccessLogin(callback, response) },
            error => callback(true, error)
        );
    }

    forgotPassword(username, callback){
        Parse.User.requestPasswordReset(username)
            .then(response => callback(false, response),
            error => callback(true, error)
        );
    }

    callSuccessLogin(callback, response){
        this.loadPermissions(callback, response);
    }

    loadPermissions(callback, response){
        this.user = Parse.User.current();
        var query = new Parse.Query(Parse.User);

        var user;
        var self = this;

        query.include("onboardingBotUser")
        query.get(this.user.id)
        .then(function(theUser) {
          user = theUser;
          var permissionsQuery = new Parse.Query(Parse.Object.extend("Permissions"));
          permissionsQuery.equalTo("user", user)
          permissionsQuery.equalTo("active", true)
          permissionsQuery.include("bot.name")
          permissionsQuery.include("bot.avatar")
          permissionsQuery.include("bot.userVariables")
          permissionsQuery.limit(10000)
          return permissionsQuery.find()
        }).then(function(allPermissions) {
          console.log("Permissions Loaded", allPermissions);
          if (allPermissions.length == 0) {
            showAlert("No Bots For User");
            return;
          }

          if (allPermissions.length == 1 && allPermissions[0].get("bot")) {
            console.log("LOGIN MK 1");
            self.loadBot(allPermissions[0].get("bot").id, user, allPermissions, callback, response)
            return;
          }else if(allPermissions.length > 1){
            self.loadMultipleBots(user, allPermissions, callback, response);
          }else{
            callback(true, "no_permission");
          }

        });
    }

    loadMultipleBots(user, allPermissions, callback, response){
      singleton.setPermissions(allPermissions);
      this.setupNotificationsForChannel(allPermissions);
      callback(false, response);
    }

    setupNotificationsForChannel(allPermissions) {
      console.log("allPermissions",allPermissions);
      var botsWithPermissions = [];
      for (var i = 0; i < allPermissions.length; i++) {
        if (allPermissions[i].get("bot").id &&  allPermissions[i].get("permissions") &&  allPermissions[i].get("permissions").conversations) {
          botsWithPermissions.push(allPermissions[i].get("bot").id);
        }
      }

      UrbanAirship.getChannelId().then(channelId => {
        console.log('Channel: ', channelId);
        for(var i = 0; i < botsWithPermissions.length; i++){
          UrbanAirship.addTag(botsWithPermissions[i]);
        }
        UrbanAirship.getTags().then((tags) => {
          console.log('Tags: ', tags)
        });
      });

    }

    loadBot(botId, user, allPermissions, callback, response) {
        this.setupNotificationsForChannel(allPermissions);
        console.log("Load Bot",botId, user, allPermissions);
        var self = this;
        var BotClass = Parse.Object.extend("Bot");
        var botQuery = new Parse.Query(BotClass);
        botQuery.include("userVariables")
        var bot;
        botQuery.get(botId).then(function(theBot) {
        bot = theBot;
        if (!bot) {
          return;
        }
        if (user.get("onboardingBotUser")) {
          self.userLoaded(user, bot, user.get("onboardingBotUser"),  allPermissions, callback, response);

        } else {
          self.setupOnboardingBot().then(function(botUser) {
            user.set("onboardingBotUser", botUser);
            return user.save();
          }).then(function(theUser) {
            self.userLoaded(user, bot, user.get("onboardingBotUser"), allPermissions, callback, response);

          }).catch(function(error) {
            console.warn("Error Creating Onboarding Bot User", error);
          })
        }
        })
      }

      userLoaded(user, bot, onboardingBotUser, allPermissions, callback, response) {
        var permissionsObj, permissions;

        for (var i = 0; i < allPermissions.length; i++) {
          if (allPermissions[i].get("bot").id == bot.id) {
            permissionsObj = allPermissions[i];
            break;
          }
        }

        if (user.get("isSuperAdmin")) {
          console.warn("HAS SUPER ADMIN PERMISSIONS");
          permissions = { conversations:true,
                          training:true,
                          user_journeys:true,
                          account:true,
                          cancel_account:true,
                          payment_settings:true,
                          variables:true,
                          server_settings:true,
                          embed_builder:true,
                          users_and_permissions:true
                        };
        }

        if (permissionsObj || user.get("isSuperAdmin")) {
          if (!permissions) { permissions = permissionsObj.get("permissions"); }
            singleton.setBot(bot);
            user.set("lastLogin", new Date())
            user.save();
            singleton.setPermissions(allPermissions);
            callback(false, response);
          } else {
            showAlert("Unable to find your bot.")
          }

      }

      logout(callback){
        Parse.User.logOut().then(response => callback(false, response),
        error => callback(true, error));
      }
}
