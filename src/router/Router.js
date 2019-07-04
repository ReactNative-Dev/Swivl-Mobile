import { createStackNavigator } from 'react-navigation';

//import screens
import LoginScreen from '../modules/authentication/components/LoginScreen';
import ForgotScreen from '../modules/authentication/components/ForgotScreen';
import SelectBotScreen from '../modules/bots/components/SelectBotScreen';
import UserInfoScreen from '../modules/userInfo/components/UserInfoScreen';
import LiveConversation from '../modules/liveConversations/components/LiveConversation';
import SettingsScreen from '../modules/others/components/SettingsScreen';
import QuestScreen from '../modules/others/components/QuestScreen';
import ChatScreen from '../modules/chat/components/ChatScreen';
import NoAccessScreen from '../modules/others/components/NoAccessScreen';
import { fromBottom, fromRight } from 'react-navigation-transitions';

export const rootNavigator= createStackNavigator({
        LoginScreen:{
            screen:  LoginScreen
        },
        ForgotScreen: {
            screen: ForgotScreen
        },
        UserInfoScreen: {
            screen: UserInfoScreen
        },
        LiveConversation: {
            screen: LiveConversation
        },
        SettingsScreen: {
            screen: SettingsScreen
        },
        QuestScreen: {
            screen: QuestScreen
        },
        ChatScreen: {
            screen: ChatScreen
        },
        SelectBotScreen: {
            screen: SelectBotScreen
        },
        NoAccessScreen: {
            screen: NoAccessScreen
        },
      },
      {
        initialRouteName: 'LoginScreen',
        headerMode: 'none',
        transitionConfig: (nav) => handleCustomTransition(nav),
      }
);

const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
   
    // Custom transitions go there
    if (prevScene
      && prevScene.route.routeName === 'LiveConversation'
      && nextScene.route.routeName === 'SelectBotScreen') {
      return fromBottom(500);
    } else if (prevScene
      && prevScene.route.routeName === 'LiveConversation'
      && nextScene.route.routeName === 'SettingsScreen') {
      return fromBottom(500);
    }else if (prevScene
        && prevScene.route.routeName === 'ChatScreen'
        && nextScene.route.routeName === 'QuestScreen') {
        return fromBottom(500);
      }
    return fromRight(500);
  }