import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { styles } from '../styles';

const BotItem =({ bot, onItemPress })=>{
    const image = (bot.get("avatar") !== undefined)? bot.get("avatar").url() : require('../../assets/icons/ic_bot.png')
    return(
            <View style={ styles.botItemContainer }>
                <TouchableOpacity onPress =  { onItemPress }>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={ styles.leftPersonIcon }
                            source = { image }
                        />

                        <Text style={[ styles.botItemText, (Platform.OS === "ios")? styles.botItemTextIOS : styles.botItemTextAndroid ]}>
                            {bot.get("name")}
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
    );
};

export {BotItem};