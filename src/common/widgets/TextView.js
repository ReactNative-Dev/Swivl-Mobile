import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import {styles} from '../styles';

const TextView =({ text, arrow, onPress, color })=>{

    if(color){
        return(
                <View style={ styles.textViewGrayContainer }>
                        <Text style={[ styles.textViewWhiteText, (Platform.OS === "ios")? styles.textViewIOS : styles.textViewAndroid ]}>
                            {text}
                        </Text>
                </View>
        );
    }
    return(
        <TouchableOpacity onPress = { onPress }>
            <View style={styles.textViewContainer }>
                    <Text style = {[ styles.textViewBlackText, (Platform.OS === "ios")? styles.textViewIOS : styles.textViewAndroid ]} >
                        {text}
                    </Text>
                    { renderArrow(arrow) }
            </View>
        </TouchableOpacity>
    );
};

const renderArrow = (arrow) => {
    if(arrow){
        return (
            <Image
                style={ styles.arrowIcon }
                source = {require('../../assets/icons/ic_forward.png')}
            />
        );
    }
}

export {TextView};