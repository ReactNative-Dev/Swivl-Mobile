import React from 'react';
import { View, Text } from 'react-native';
import {styles} from '../styles';

const TextViewChat =({ item })=>{
    if(item.type === "text"){
        return(
            <View style={ styles.textViewChatMainContainer }>
                <View style={[ (item.sender === "user")? styles.textViewChatGrayContainer : styles.textViewChatWhiteContainer ]}>
                    <Text style={[ (item.sender === "user")? styles.textViewChatWhiteText : styles.textViewChatGrayText ]}>
                        { item.text }
                    </Text>
                </View>
            </View>
        );
    }
    return (
        <View></View>
    );
};

export {TextViewChat};