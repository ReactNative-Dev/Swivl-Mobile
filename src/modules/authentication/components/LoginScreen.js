import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Platform, Animated, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { live_conversations, sign, email_placeholder, password_placeholder, forgot, enter_email, enter_password } from '../../../utils/strings';
import { styles } from '../../../styles/LoginStyles';
import { EditText, Button, ButtonOrange } from '../../../common/widgets';
import { loginUsingUsernameAndPassword, loadPermissions } from '../../../actions/auth';
import { connect } from 'react-redux';
import { showAlert } from '../../../utils/Helper';
import Singleton from '../../../utils/Singleton';
import { NavigationActions, StackActions } from 'react-navigation';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Parse from 'parse/react-native';
import DoneBar from '../../../common/components/DoneBar';

const singleton = Singleton.getInstance();
class LoginScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            fadeAnim: new Animated.Value(0),
        }
    }

    componentWillMount() {
        var self = this;
        Parse.User.currentAsync().then(function(user) { 
            console.log(user);
            if(user !== null){
                self.props.loadPermissions(user);
            }else {
                self.loadLoginFields();
            }
        });       
    }

    loadLoginFields(){
        var self = this;
        Animated.timing(                  // Animate over time
            self.state.fadeAnim,            // The animated value to drive
            {
              toValue: 4,                   // Animate to opacity: 1 (opaque)
              duration: 4000,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    componentWillReceiveProps(nextProps){
        var self = this;
        if(nextProps.authentication.user !== null && !(nextProps.authentication.loading)){
            singleton.setUser(nextProps.authentication.user);
            const permissions = singleton.getPermissions();
            setTimeout(function(){ self.navigate(permissions); }, 0);
        }
    }

    navigate(permissions){
        if(permissions.length > 1){
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'SelectBotScreen'})
                ]
            }));
        } else {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'LiveConversation'})
                ]
            }));
        }
    }

    onEmailChange(text){
        this.setState({
            email: text
        });
    }

    onPasswordChange(text){
        this.setState({
            password: text
        })
    }

    onClickDone = () => {
        const { email, password } = this.state;
        if(email.length > 0 && password.length > 0){
            this.onLogin();
        }
    }

    onLogin() {
        const { email, password } = this.state;
        if( email.length === 0 ){
            showAlert(enter_email)
        }else if(password.length === 0){
            showAlert(enter_password)
        }else{
            this.props.loginUsingUsernameAndPassword( email.toLowerCase(), password );
        }
    }

    onForgotPress = () =>{
        this.props.navigation.navigate('ForgotScreen');
    }

    renderButton(){
        const { email, password } = this.state;
        if(email.length > 0 && password.length > 0){
            return(
                <ButtonOrange
                        text = { sign }
                        onButtonPress = {this.onLogin.bind(this)}
                    />
            );
        }
        return(
            <Button
                    text = { sign }
                />
        );

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
        let { fadeAnim } = this.state;
        console.log("state::", this.state);
        return (
            <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss() } accessible={false}>

            <View style = {[ styles.mainContainer ]}>
            

                {this.renderLoader()}
                                
                <KeyboardAvoidingView style={ styles.keyboardViewContainer } behavior="padding" enabled keyboardVerticalOffset={this.state.keyboardType === 'default' ? 40 : 0}>
                
                <View style={ styles.topViewContainer }>
                    <View style={ styles.topImageContainer }>
                        <Image
                            style = {[ styles.topImage, (Platform.OS === "ios")? styles.topImageIOS : styles.topImageAndroid ]}
                            source ={ require('../../../assets/icons/ic_logo_color.png') }
                        />
                    </View>

                    <Text style = { styles.text }>
                        { live_conversations }
                    </Text>
                    
                    <View style={ styles.bottomImageContainer }>
                        <Image
                                style = {[ styles.bottomImage, (Platform.OS === "ios")? styles.bottomImageIOS : styles.bottomImageAndroid ]}
                                source ={ require('../../../assets/icons/ic_login_people.png') }
                        />
                    </View>
                </View>

                <Animated.View style ={{ opacity: fadeAnim, flex: 6 }}>
                    <View style = {[ styles.editTextContainer ]}>
                        <EditText
                            placeholder = {email_placeholder}
                            onChangeText = {this.onEmailChange.bind(this)}
                            value = {this.state.email}
                            secureTextEntry = {false}
                        />

                        <EditText
                            placeholder = {password_placeholder}
                            onChangeText = {this.onPasswordChange.bind(this)}
                            value = {this.state.password}
                            secureTextEntry = {true}
                        />

                    </View>
                    { this.renderButton() }

                </Animated.View>
                
                </KeyboardAvoidingView>

                <Animated.View style= {[ styles.forgotContainer, { opacity: fadeAnim } ]}>
                    <TouchableOpacity onPress={this.onForgotPress}>
                        <Text style={[ styles.forgotText, (Platform.OS === "ios")? styles.forgotTextIOS : styles.forgotTextAndroid  ]}>
                            {forgot}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
                <DoneBar
                    keyboardType= "numeric"
                    onDone={this.onClickDone}
                />
            </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = ({ authentication }) => {
    return { authentication };
};
export default connect(mapStateToProps, {
    loginUsingUsernameAndPassword,
    loadPermissions
})(LoginScreen);