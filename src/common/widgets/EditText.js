import React from 'react';
import { View,TextInput, Platform } from 'react-native';
import {styles} from '../styles';

const EditText =({ placeholder, onChangeText, value, secureTextEntry })=>{

    return(
        <View style={[ styles.editContainer, (Platform.OS === "ios")? styles.editContainerIOS : styles.editContainerAndroid ]}>
            <TextInput
               style = {[ styles.textInput, (Platform.OS === "ios")? styles.textInputIOS : styles.textInputAndroid ]}
               secureTextEntry={secureTextEntry}
               underlineColorAndroid='transparent'
               placeholder={placeholder}
               placeholderTextColor='#C7C7CD'
               value={value}
               onChangeText={onChangeText}
            >
            </TextInput>
        </View>
    );
};

export {EditText};