import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { settings, about, notification, log_out, conversation } from '../../../utils/strings';
import { styles } from '../../../styles/SettingsStyles';
import Header from '../../../common/components/Header';
import { TextView } from '../../../common/widgets';
import Singleton from '../../../utils/Singleton';
import { logout } from '../../../actions/auth';
import { unsubscribeLiveQuery } from '../../../actions/conversations';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { ProgressDialog } from 'react-native-simple-dialogs';

const singleton = Singleton.getInstance();

class SettingsScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
        }
    }

    onAboutPress = () => {

    }

    onNotificationPress = () => {

    }

    onBotPress = () => {
        this.props.navigation.push('SelectBotScreen', {
            settings: true
        });
    }

    onLogoutPress = () => {
        const navigation = this.props.navigation;
        this.props.unsubscribeLiveQuery();
        this.props.logout(navigation, NavigationActions, StackActions);
    }

    renderTextView(text, arrow, onPress){
        return <TextView
            text = {text}
            arrow = {arrow}
            onPress = { onPress }
        />;
    }

    renderLoader(){
        return(
            <ProgressDialog
                visible={this.props.authentication.loading}
                message="Please, wait..."
            />
        );
    }

    render() {

       const user = singleton.getUser();
       const bot = singleton.getBot();

        return (
            <View style = { styles.mainContainer }>

                {this.renderLoader()}

                <Header
                 line = {true}
                 done = {true}
                 text = {settings}
                />
                
                <Image
                    style = { styles.profile }
                    source = { require('../../../assets/images/image1.png') }
                />

                <Text style = { styles.text1 }>
                    { user.getUsername() }
                </Text>

                <Text style = { styles.text2 }>
                    { user.getEmail() }
                </Text>

                <View style={{ marginTop: 20 }}>
                    {this.renderTextView(about, true, this.onAboutPress)}

                    {this.renderTextView(notification, true, this.onNotificationPress)}
                </View>

                <View style={{ marginTop: 16 }}>
                    {this.renderTextView(`Bot Account: ${bot.get("name")}`, true, this.onBotPress)}
                </View>

                <TouchableOpacity onPress = { this.onLogoutPress }>
                    <View style={ styles.textViewContainer }>
                        <Text style={[ styles.text, (Platform.OS === "ios")? styles.textIOS : styles.textAndroid ]}>
                            {log_out}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style = { styles.conversationContainer }>
                    <Image
                        style = {[ styles.logo, (Platform.OS === "ios")? styles.logoIOS : styles.logoAndroid ]}
                        source = { require('../../../assets/icons/ic_logo_gray.png') }
                    />

                    <Text style= { styles.bottomText }>
                        { conversation }
                    </Text>
                </View>

            </View>
        );
    }
}

const mapStateToProps = ({ authentication }) => {
    return { authentication };
};
export default connect(mapStateToProps, {
    logout,
    unsubscribeLiveQuery
})(SettingsScreen);