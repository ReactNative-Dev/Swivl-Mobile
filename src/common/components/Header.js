import React, { Component } from 'react';
import { View, Text, Platform, Image, TouchableOpacity } from 'react-native';
import { done, cancel, close } from '../../../src/utils/strings';
import { styles } from '../../../src/styles/HeaderStyles';
import { withNavigation } from 'react-navigation';

class Header extends Component{

    constructor(props){
        super(props)
    }

    renderBackIcon(){
        if(this.props.back){
            return <Image style={ styles.back }
                        source = {require('../../assets/icons/ic_launcher.png')}
            />;
        }
    }

    renderInfoIcon(){
        if(this.props.info){
            return <Image style={ styles.info }
                    source = {require('../../assets/icons/ic_info.png')}
            />;
        }
    }

    renderSettingsIcon(){
        if(this.props.settings){
            return <Image style={ styles.info }
                    source = {require('../../assets/icons/ic_settings.png')}
            />;
        }
    }

    renderHeaderText(){
        return <View style={[ styles.headerViewContainer, (this.props.done || this.props.cancel || this.props.close)? styles.headerViewContainerForText : styles.headerViewContainerWithoutText ]}>
                    <Text style={[ styles.headerText, (Platform.OS === "ios")? styles.headerTextIOS : styles.headerTextAndroid ]}>
                        {this.props.text}
                    </Text>
                </View>;
    }

    renderDoneText(){
        if(this.props.done){
            return <Text style={[ styles.rightText, (Platform.OS === "ios")? styles.rightTextIOS : styles.rightTextAndroid ]}>
                {done}
            </Text>;
        }
    }

    renderCancelText(){
        if(this.props.cancel){
            return <Text style={[ styles.rightText, (Platform.OS === "ios")? styles.rightTextIOS : styles.rightTextAndroid ]}>
                {cancel}
            </Text>;
        }
    }

    renderCloseText(){
        if(this.props.close){
            return <Text style={[ styles.rightText, (Platform.OS === "ios")? styles.rightTextIOS : styles.rightTextAndroid ]}>
                {close}
            </Text>;
        }
    }

    renderLine(){
        if(this.props.line){
            return <View
                style={ styles.underline }
            />;
        }
        return <View
            style ={{ marginTop: 8 }}
        />;
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    }

    onInfoPress = () => {
        this.props.navigation.navigate('UserInfoScreen');
    }

    onDonePress = () => {
        this.props.navigation.goBack();
    }

    onCancelPress = () => {
        this.props.navigation.goBack();
    }

    onPersonPress = () => {
        this.props.navigation.navigate('SelectBotScreen');
    }

    onSettingsPress = () => {
        this.props.navigation.navigate('SettingsScreen');
    }

    renderPersonIcon(){
        return <Image style={ styles.info }
                source = {require('../../assets/icons/ic_bot.png')}
            />;
    }

    renderLeftView(){
        if(this.props.settings){
            return <View style={[ styles.leftViewContainer, (this.props.done || this.props.cancel || this.props.close)? styles.leftViewContainerForText : styles.leftViewContainerWithoutText ]}>
                    <TouchableOpacity onPress = { this.onPersonPress }>
                        { this.renderPersonIcon() }
                    </TouchableOpacity>
                </View>;
        }
        return <View style={[ styles.leftViewContainer, (this.props.done || this.props.cancel || this.props.close)? styles.leftViewContainerForText : styles.leftViewContainerWithoutText ]}>
                    <TouchableOpacity onPress = { this.onBackPress }>
                        {this.renderBackIcon()}
                    </TouchableOpacity>
            </View>;
    }

    renderRightView(){
        if(this.props.done || this.props.cancel || this.props.close){
            return (
                <View style={ styles.rightViewContainerForText }>
                    <TouchableOpacity onPress = { this.onDonePress }>
                        {this.renderDoneText()}
                    </TouchableOpacity>
                    <TouchableOpacity onPress = { this.onCancelPress }>
                        {this.renderCancelText()}
                    </TouchableOpacity>
                    <TouchableOpacity onPress = { this.onCancelPress }>
                        {this.renderCloseText()}
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={ styles.rightViewContainerWithoutText }>
                <TouchableOpacity onPress = { this.onInfoPress }>
                    {this.renderInfoIcon()}
                </TouchableOpacity>
                <TouchableOpacity onPress = { this.onSettingsPress }>
                    {this.renderSettingsIcon()}
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={[ styles.mainContainer, (Platform.OS === "ios") ? styles.mainContainerIos : styles.mainContainerAndroid ]}>

                <View style={ styles.subContainer }>

                    {this.renderLeftView()}
                    
                    {this.renderHeaderText()}

                    {this.renderRightView()}

                </View>

                {this.renderLine()}
                
            </View>
        );
    }
}

export default withNavigation(Header);