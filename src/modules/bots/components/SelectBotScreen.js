import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { selectbot, search } from '../../../utils/strings';
import { styles } from '../../../styles/SelectBotStyles';
import { SearchView, BotItem } from '../../../common/widgets';
import Header from '../../../common/components/Header';
import Singleton from '../../../utils/Singleton';
import { loadBot } from '../../../actions/auth';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

const singleton = Singleton.getInstance();
class SelectBotScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
           searchValue: ""
        }
    }

    componentWillReceiveProps(props){
        console.log('received Props: ', props);
        if(props.authentication.botLoading !== null)
            if(props.authentication.botLoading.botLoaded){
                props.authentication.botLoading.botLoaded = false;
                props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'LiveConversation'})
                    ]
                }));
            }
    }

    onBotPress =(bot) =>{
        const permissions = singleton.getPermissions();
        const user = singleton.getUser();
        const botId = bot.id;
        this.props.loadBot(botId, user, permissions);

    }

    renderListItem(bots){
        return <BotItem
                bot = {bots.item}
                onItemPress = {this.onBotPress.bind(this, bots.item)}
        />;
    }

    onChangeText(text){
        this.setState({
            searchValue: text
        });
    }

    renderHeader(){
        if(this.props.navigation.state.params !== undefined ){
            return <Header
                line = {true}
                close = {true}
                back = {true}
                text = { selectbot }
           />;
        }
        return <Header
            line = {true}
            cancel = {true}
            text = { selectbot }
        />;
    }

    render() {
        var bots = [];
        var self = this;
        const permissions = singleton.getPermissions();
        for (var i = 0; i < permissions.length; i++) {
          bots.push(permissions[i].get("bot"));
        }

        if (this.state.searchValue &&  this.state.searchValue.length >  0) {
            bots = bots.filter(function(bot) {
            if (bot.get("name")) {
                return String(bot.get("name").toLowerCase()).includes(self.state.searchValue.toLowerCase())
            }
            return false;
            });
        }

        return (
            <View style = { styles.mainContainer }>
                { this.renderHeader() }

                <View style={ styles.searchContainer }>
                   <SearchView
                        placeholder = { search }
                        onChangeText = {this.onChangeText.bind(this)}
                        value = {this.state.searchValue}
                        color = {true}
                   />
                </View>

                <FlatList
                    data = { bots }
                    renderItem =  { this.renderListItem.bind(this) }
                    keyExtractor = { (item) => item.id }
                    removeClippedSubviews = {false}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ authentication }) => {
    return { authentication };
};
export default connect(mapStateToProps, {
    loadBot
})(SelectBotScreen);