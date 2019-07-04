import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { styles } from '../styles';
import { end_takeover } from '../../utils/strings';
import { BotUserHelper } from '../../utils/Helper';

const ActiveConversationItem =({ item, onItemPress, onTakeOverPress, userVariables })=>{

    return(
            <View style={[ styles.conversationContainer , (!(item.isConversationTakenOver))? styles.conversationContainer2 : styles.conversationContainer1 ]}>
                <TouchableOpacity onPress = { onItemPress }>
                    <View style = { styles.subConversationContainer }>
                        <Image
                            style={ styles.leftIcon }
                            source = {require('../../assets/icons/ic_web.png')}
                        />

                        <Text style = {[ styles.conversationText , (!(item.isConversationTakenOver))? styles.conversationText2 : styles.conversationText1, (Platform.OS === "ios")?
                                        styles.conversationTextIOS : styles.conversationTextAndroid ]}>
                                        {BotUserHelper.displayNameForUser(item, userVariables)}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={  onTakeOverPress }>
                    { renderTakeoverText(item) }
                </TouchableOpacity>
            </View>
    );
};

const renderTakeoverText = (item) => {
    if((item.isConversationTakenOver)){
        return (
            <Text style = {[ styles.conversationText3, (Platform.OS === "ios")? styles.conversationText3IOS : styles.conversationText3Android ]}>
                { end_takeover }
            </Text>
        );
    }
}

export {ActiveConversationItem};