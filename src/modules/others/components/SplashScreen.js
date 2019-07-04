import React, { Component } from 'react';
import { View, Image, Text, Platform } from 'react-native';
import { styles } from '../../../styles/LoginStyles';
import { live_conversations } from '../../../utils/strings'

class SplashScreen extends Component{

    constructor(props){
        super(props)
    }

    componentWillMount() {
        const mThis = this;
        setTimeout(function(){ mThis.navigate() }, 3000);
    }

    navigate(){
        this.props.navigation.navigate('LoginScreen');
    }

    render() {
        return (
            <View style = { styles.mainContainer }>
                
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
        );
    }
}

export default SplashScreen;