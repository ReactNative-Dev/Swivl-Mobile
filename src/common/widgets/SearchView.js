import React from 'react';
import { View, TextInput, Image, Platform } from 'react-native';
import {styles} from '../styles';

const SearchView =({ placeholder, onChangeText, value, color })=>{

    return(
        <View style={[ (color)? styles.searchViewContainer1 : styles.searchViewContainer, (Platform.OS === "ios")? styles.searchViewContainerIOS : styles.searchViewContainerAndroid ]}>
            <Image
                style={[ (Platform.OS === "ios")? styles.searchIconIOS : styles.searchIconAndroid ]}
                source = {require('../../assets/icons/ic_search.png')}
            />

            <TextInput
               style = {[ (Platform.OS === "ios")? styles.searchInputIOS : styles.searchInputAndroid ]}
               underlineColorAndroid='transparent'
               placeholder={placeholder}
               placeholderTextColor='#C7C7CD'
               value={value}
               onChangeText={onChangeText}
            />
        </View>
    );
};

export {SearchView};