import React, { Component } from 'react';
import { View, Image, Text, Platform } from 'react-native';
import { no_account_access, oops, no_account_message } from '../../../utils/strings';
import { styles } from '../../../styles/NoAccountAccessStyles';
import Header from '../../../common/components/Header';

class NoAccessScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            searchValue: ""
        }
    }

    render() {
        return (
            <View style = { styles.mainContainer }>
                <Header
                 line = {true}
                 back = {true}
                 text = { no_account_access }
                />
                
                <View style={ styles.subContainer }>
                    <View style={ styles.oopsContainer }>
                        <Text style={ styles.oopsText }>
                            { oops }
                        </Text>
                        <Image
                            style = { (Platform.OS === "ios")? styles.oopsIconIOS : styles.oopsIconAndroid }
                            source = {require('../../../assets/icons/ic_oops.png')}
                        />
                    </View>

                    <Text style={ styles.messageText }>
                        { no_account_message }
                    </Text>

                </View>

            </View>
        );
    }
}

export default NoAccessScreen;