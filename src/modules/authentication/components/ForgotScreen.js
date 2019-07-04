import React, { Component } from 'react';
import { View, Text, Platform, Image } from 'react-native';
import { header, description, email_placeholder, send, forgot_password, enter_username } from '../../../utils/strings';
import { styles } from '../../../styles/ForgotStyles';
import { EditText, ButtonOrange, Button } from '../../../common/widgets';
import Header from '../../../common/components/Header';
import { forgotPassword } from '../../../actions/auth';
import { connect } from 'react-redux';
import { showAlert } from '../../../utils/Helper';
import { ProgressDialog } from 'react-native-simple-dialogs';

class ForgotScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            email: "",
        }
    }

    onEmailChange(text){
        this.setState({
            email: text
        })
    }

    onSendPress(){
        const username = this.state.email
        if(username.length === 0){
            showAlert(enter_username);
        } else {
            this.props.forgotPassword(username.toLowerCase());
        }
    }

    renderLoader(){
        return(
            <ProgressDialog
                visible={this.props.authentication.loading}
                message="Please, wait..."
            />
        );
    }

    renderButton(){
        const { email } = this.state;
        if(email.length > 0){
            return(
                <ButtonOrange
                    text = {send}
                    onButtonPress = {this.onSendPress.bind(this)}
                />
            );
        }
        return(
            <Button
                text = {send}
            />
        );
    }

    render() {
        return (
            <View style = { styles.mainContainer }>

                {this.renderLoader()}

                <Header
                    back = {true}
                    line = {true}
                    text = {forgot_password}
                />

                <View style={ styles.subContainer }/>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style = {[ styles.headerText, (Platform.OS === "ios")? styles.headerTextIOS : styles.headerTextAndroid ]}>
                        { header }
                    </Text>
                    <Image
                        style = { (Platform.OS === "ios")? styles.brainIconIOS : styles.brainIconAndroid }
                        source = {require('../../../assets/icons/ic_brain.png')}
                    />
                </View>
                <Text style = {[ styles.descriptionText, (Platform.OS === "ios")? styles.descriptionTextIOS : styles.descriptionTextAndroid ]}>
                    { description }
                </Text>

                <View style = {styles.editTextContainer}>
                    <EditText
                        placeholder = {email_placeholder}
                        onChangeText = {this.onEmailChange.bind(this)}
                        value = {this.state.email}
                        secureTextEntry = {false}
                    />
                </View>

                {this.renderButton()}

            </View>
        );
    }
}

const mapStateToProps = ({ authentication }) => {
    return { authentication };
};
export default connect(mapStateToProps, {
    forgotPassword
})(ForgotScreen);