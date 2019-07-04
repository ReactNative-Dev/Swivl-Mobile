import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import {styles} from '../styles';

const ButtonOrange =({ onButtonPress, text })=>{

    return(
        <TouchableOpacity onPress={ onButtonPress }>
            <View style={ styles.buttonOrangeContainer }>
                <Text style = {[ styles.buttonOrangeText, (Platform.OS === "ios")? styles.textInputIOS : styles.textInputAndroid  ]}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export {ButtonOrange};