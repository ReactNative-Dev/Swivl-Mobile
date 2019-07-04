import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { live_conversations, active, past, all, no_active_conversations, no_past_conversations, no_conversations } from '../../../utils/strings';
import { styles } from '../../../styles/LiveConversationStyles';
import Header from '../../../common/components/Header';
import ActiveConversation from './ActiveConversation';
import { loadConversations } from '../../../actions/conversations';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Singleton from '../../../utils/Singleton';

const singleton = Singleton.getInstance();
class LiveConversation extends Component{

    constructor(props){
        super(props)
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true
        }
    }

    componentDidMount(){
        this.props.loadConversations();
    }

    onTab1Press = () => {
        this.setState({
            tab1: true, tab2: false, tab3: false
        });
    }

    onTab2Press = () => {
        this.setState({
            tab2: true, tab1: false, tab3: false
        });
    }

    onTab3Press = () => {
        this.setState({
            tab3: true, tab1: false, tab2: false
        })
    }

    nodata(type) {
        return <View style={ styles.noDataContainer }>
                    <Image
                        style= { styles.nodataImage }
                        source = { require('../../../assets/icons/ic_nodata.png') }
                    />
                    <Text style={ styles.nodataText }>
                       {(type === "active")? no_active_conversations : (type === "past")? no_past_conversations : no_conversations }
                    </Text>
                </View>;
    }

    renderScreen(data){
        if(this.state.tab1){
            if(data.length > 0){
                return <ActiveConversation
                    purpose = "active"
                    data = {data}
                />;
            }else{
                return this.nodata("active")
            }
        }else if(this.state.tab2){
            if(data.length > 0){
                return <ActiveConversation
                    purpose = "past"
                    data = {data}
                />;
            }else{
                return this.nodata("past")
            }
        }else {
            if(data.length > 0){
                return <ActiveConversation
                    purpose = "all"
                    data = {data}
                />;
            }else{
                return this.nodata("all")
            }
        }
    }

    filterUsers(){
      
        const users = singleton.getBotUsers();

        if(users) {
            var filteredUsers = users;
            if (this.state.tab2) {
                filteredUsers = filteredUsers.filter(function(user) {
                    return user.get("hasHadHumanTakeover");
                })
            }else if (this.state.tab1) {
                filteredUsers = filteredUsers.filter(function(user) {
                    return user.isConversationTakenOver;
                })
            }else if(this.state.tab3){
                filteredUsers = users;
            }
            return filteredUsers;
        }
        return [];

    }

    renderLoader(){
        return(
             <ProgressDialog
                 visible={this.props.conversation.loading}
                 message="Please, wait..."
             />
         );
     }

    render() {
       var data = this.filterUsers();
        
        return (
            <View style = { styles.mainContainer }>

                { this.renderLoader() }

                <Header
                 settings = {true}
                 text = {live_conversations}
                />
                
                <View style={ styles.tabContainer }>
                    <TouchableOpacity onPress={this.onTab3Press}>
                        <View style={[ (this.state.tab3)? styles.tab1View : styles.tab2View ]}>
                            <Text style= {[ (this.state.tab3)? styles.tab1Text : styles.tab2Text ]}>
                                {all}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onTab1Press}>
                        <View style={[ (this.state.tab1)? styles.tab1View : styles.tab2View ]}>
                            <Text style= {[ (this.state.tab1)? styles.tab1Text : styles.tab2Text ]}>
                                {active}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onTab2Press}>
                        <View style={[ (this.state.tab2)? styles.tab1View : styles.tab2View ]}>
                            <Text style= {[ (this.state.tab2)? styles.tab1Text : styles.tab2Text ]}>
                                {past}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                {this.renderScreen(data)}

            </View>
        );
    }
}

const mapStateToProps = ({ conversation }) => {
    return { conversation };
};
export default connect(mapStateToProps, {
    loadConversations
})(LiveConversation);