import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { send_to_quest, search, end_live_takeover } from '../../../utils/strings';
import { styles } from '../../../styles/QuestStyles';
import Header from '../../../common/components/Header';
import { SearchView, TextView } from '../../../common/widgets';
import { loadQuests, sendQuest } from '../../../actions/quests';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Singleton from '../../../utils/Singleton';
import Parse from 'parse/react-native';

const singleton = Singleton.getInstance();
class QuestScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            searchValue: "",
            data: []
        }
        this.quests = [];
        this.item = {};
    }

    componentDidMount(){
        this.props.loadQuests();
    }

    onChangeText(text){
        this.setState({
            searchValue: text
        })
    }

    onQuestPressed = (quest) => {
        this.props.sendQuest(quest);
        const userId =  singleton.getSelectedConversationUser().id;
        Parse.Cloud.run('sendUserToQuest', {userId:userId, questId:quest.id}).then(function(response) {
            console.log('respoense:', response);
          }).catch((error) => {
            console.error("There was an error", error);
          });
        this.props.navigation.goBack();
    }

    endPressed = () => {
        var quest = {};
        this.props.sendQuest(quest);
        this.props.navigation.goBack();
    }

    onHeaderPress = (item) => {
        item.show = !(item.show);
        this.setState({
            render:'update'
        });
    }

    renderQuestListItem(data){
        const item = data.item;
        return (
            <View style={{ marginTop: 1 }}>
                <TextView
                    text = { item.get('name') }
                    onPress = { this.onQuestPressed.bind(this, item) }
                />
            </View>
        );
    }

    renderInternalList(item){
            return(
                <FlatList
                    data = { this.quests }
                    renderItem =  { this.renderQuestListItem.bind(this) }
                    keyExtractor = { (item) => item.id }
                    removeClippedSubviews = {false}
                />
            );
    }

    renderHeaderListItem(data){
         var item = data.item;
         this.quests = item.quests;
         var self= this;
        
        if (this.state.searchValue &&  this.state.searchValue.length >  0) {
            this.quests = this.quests.filter((quest) => {
                if (quest.get('name')) {
                    return String(quest.get('name')).includes(self.state.searchValue)
                }
                return false;
            });
        }

        return (
            <View>
                <TextView
                    text = {item.get("name")}
                    color = {true}
                />

                {this.renderInternalList(item)}

            </View>
        );
    }

    renderLoader(){
        return(
             <ProgressDialog
                 visible={this.props.quests.loading}
                 message="Please, wait..."
             />
         );
     }

    render() {
        var data = this.props.quests.journeys;
         
        return (
            <View style = { styles.mainContainer }>
                
                { this.renderLoader() }
                
                <Header
                 line = {true}
                 cancel = {true}
                 text = { send_to_quest }
                />
                
               <View style={ styles.searchContainer }>
                   <SearchView
                        placeholder = { search }
                        onChangeText = {this.onChangeText.bind(this)}
                        value = {this.state.searchValue}
                        color = {true}
                   />
               </View>

                <TextView
                    text = { end_live_takeover }
                    onPress = { this.endPressed.bind(this) }
                />
                <FlatList
                    data = { data }
                    renderItem =  { this.renderHeaderListItem.bind(this) }
                    keyExtractor = { (item) => item.id }
                    removeClippedSubviews = {false}
                    extraData = { this.quests }
                />

            </View>
        );
    }
}

const mapStateToProps = ({ quests }) => {
    return { quests };
};
export default connect(mapStateToProps, {
    loadQuests,
    sendQuest
})(QuestScreen);