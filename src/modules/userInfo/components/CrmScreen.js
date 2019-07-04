import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { email, location, language, first_interaction, last_interaction } from '../../../utils/strings';
import { styles } from '../../../styles/CrmStyles';
import Singleton from '../../../utils/Singleton';
import Moment from 'moment';
import { BotUserHelper } from '../../../utils/Helper';

const singleton  = Singleton.getInstance();
class CrmScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
        }
        this.selectedUser = singleton.getSelectedConversationUser();
        this.userVariables = singleton.getBot().get("userVariables").get("variables");
    }

    renderTextView(header, value){
        if(value !== null){
            return (
                <View style={ styles.textContainer }>
                    <Text style={ styles.textHeader}>
                        {header}
                    </Text>
                    <Text style={ styles.textValues}>
                        {value}
                    </Text>
                </View>
            );
        }
        return null;
    }

    render() {
        var firstInteraction = "unknown", lastInteraction ="unknown";
        if(this.selectedUser.createdAt !== null){
            firstInteraction = Moment(this.selectedUser.createdAt).format('MMM DD, YYYY @ HH:mm a');
        }
        if(this.selectedUser.get('lastInteraction') !== null){
            lastInteraction = Moment(this.selectedUser.get('lastInteraction')).format('MMM DD, YYYY @ HH:mm a');
        }

        return (
            <ScrollView style = { styles.mainContainer }>
                <View>
                    <Text style={ styles.nameText}>
                        { BotUserHelper.displayNameForUser(this.selectedUser, this.userVariables) }
                    </Text>
                    
                    {this.renderTextView(email, BotUserHelper.displayEmailForUser(this.selectedUser, this.userVariables) )}
                    {/* {this.renderTextView(location, "New York, NY, USA")} */}
                    {/* {this.renderTextView(language, "English")} */}
                    {this.renderTextView(first_interaction, firstInteraction)}
                    {this.renderTextView(last_interaction, lastInteraction)}
                        
                </View>
            </ScrollView>
        );
    }
}

export default CrmScreen;