import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { search } from '../../../utils/strings';
import { styles } from '../../../styles/ActiveConversationStyle';
import { SearchView } from '../../../common/widgets';
import { ActiveConversationItem } from '../../../common/widgets';
import { withNavigation } from 'react-navigation';
import { setPauseOnUser } from '../../../actions/conversations';
import { connect } from 'react-redux';
import Singleton from '../../../utils/Singleton';
import { BotUserHelper } from '../../../utils/Helper';

const singleton = Singleton.getInstance();

class ActiveConversation extends Component{

    constructor(props){
        super(props)
        this.state = {
            searchValue: ""
        }
        this.userVariables = singleton.getBot().get("userVariables").get("variables");
        this.BotUserHelper = BotUserHelper;
    }
  
    onChangeText(text){
        this.setState({
            searchValue: text
        });
    }

    renderListItem(data){
        return <ActiveConversationItem
                    item = { data.item }
                    onItemPress = { this.onItemPress.bind(this, data.item) }
                    onTakeOverPress = { this.onEndTakeOverPress.bind(this, data.item) }
                    userVariables = { this.userVariables }
                />;
    }

    onItemPress = (item) => {
        this.props.navigation.navigate('ChatScreen', {
            item: item,
            users: this.props.data
        });
    }

    onEndTakeOverPress = (item) => {
        this.props.setPauseOnUser( singleton.getBotUsers(), item , null );
    }

    render() {

        let { data } = this.props;
        var self = this;

        if (this.state.searchValue &&  this.state.searchValue.length >  0) {
            data = data.filter(function(user) {
                return (String(self.BotUserHelper.displayNameForUser(user, self.userVariables)).toLowerCase()).includes(self.state.searchValue.toLowerCase())
            });
        }

        return (
            <View style = { styles.mainContainer }>

                <SearchView
                    placeholder = {search}
                    onChangeText = {this.onChangeText.bind(this)}
                    value = {this.state.searchValue}
                />

                <FlatList
                    style = { styles.list }
                    data = { data }
                    renderItem =  { this.renderListItem.bind(this) }
                    keyExtractor = { (item) => item.id }
                    removeClippedSubviews = {false}
                    extraData={this.props}
                />

            </View>
        );
    }
}

const mapStateToProps = ({ conversation }) => {
    return { conversation };
};
export default connect(mapStateToProps, {
    setPauseOnUser
})(withNavigation(ActiveConversation));