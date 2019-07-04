/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { rootNavigator } from './src/router/Router';
import {createAppContainer} from 'react-navigation';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { store } from './src/utils/Helper';
import {
  UrbanAirship
} from 'urbanairship-react-native';
import { showAlert } from '../utils/Helper';

//Before using the SDK...
Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("Swivl-Server-Staging", "ZakaqpiufBBWfeperq6Kbfzz");
//javascriptKey is required only if you have it on server.

Parse.serverURL = 'https://swivl-server-staging.herokuapp.com/parse';

const Container= createAppContainer( rootNavigator );

export default class App extends Component {

  constructor(props) {
    super(props);
    var self = this;
    UrbanAirship.setUserNotificationsEnabled(true);
    UrbanAirship.addListener("notificationResponse", (response) => {
      console.log('Notification response: ', JSON.stringify(response.notification));
      console.log('Notification response isForeground: ', response.isForeground);
      showAlert("res", response);
      // self.sendPush();
      // will only be set for notification action buttons
      console.log('Notification response actionId: ', response.actionId);
    });
    UrbanAirship.addListener("pushReceived", (notification) => {
      showAlert("res", response);
            // self.sendPush();
      console.log('Received push: ', JSON.stringify(notification));
    });
    UrbanAirship.addListener("deepLink", (event) => {
      // self.sendPush();
      console.log('Deep link: ', event.deepLink);
    });
    UrbanAirship.addListener("register", (event) => {
      console.log('Channel registration updated: ', event.channelId);
      console.log('Registration token: ', event.registrationToken);
    });
    UrbanAirship.addListener("notificationOptInStatus", (event) => {
      console.log('User notifications opted in: ', event.optIn);
    
      // iOS only
      console.log('User notifications options: ', JSON.stringify(event.notificationOptions));
    });
    UrbanAirship.addListener("inboxUpdated", (event) => {
      console.log('Message center updated. Unread count: ' + event.messageUnreadCount + 'Total message count: ' + event.messageCount);
    });
    
    // PushNotification.configure({
 
    //   onRegister: function(token) {
    //     //process token
    //   },
   
    //   onNotification: function(notification) {
    //     // process the notification
    //     // required on iOS only
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
   
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true
    //   },
   
    //   popInitialNotification: true,
    //   requestPermissions: true,
   
    // });

  }

  // sendPush(){
  //   PushNotification.localNotification({
  //     autoCancel: true,
  //     largeIcon: "ic_launcher",
  //     smallIcon: "ic_notification",
  //     bigText: "My big text that will be shown when notification is expanded",
  //     subText: "This is a subText",
  //     color: "green",
  //     vibrate: true,
  //     vibration: 300,
  //     title: "Notification Title",
  //     message: "Notification Message",
  //     playSound: true,
  //     soundName: 'default',
  //     actions: '["Accept", "Reject"]',
  //   });
  // }

  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}