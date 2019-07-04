import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import {styles} from '../styles';

const Button =({ onButtonPress, text })=>{

    return(
        <TouchableOpacity onPress={ onButtonPress }>
            <View style={ styles.buttonContainer }>
                <Text style = {[ styles.text, (Platform.OS === "ios")? styles.textInputIOS : styles.textInputAndroid  ]}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export {Button};