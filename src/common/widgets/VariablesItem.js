import React from 'react';
import { View, TextInput, Text } from 'react-native';
import {styles} from '../styles';

const VariablesItem =({ item, value, onChangeText, onSubmit })=>{
        return(
            <View>
                <Text style={ styles.variableItemText }>
                    { item.name }
                </Text>
                <TextInput
                    style={styles.variableItemTextInput}
                    placeholderTextColor='#C7C7CD'
                    returnKeyType='done'
                    value = {value}
                    onChangeText = {(text) => onChangeText(item.id, text)}
                    onSubmitEditing = {onSubmit}
                />
            </View>
        );
};

export {VariablesItem};