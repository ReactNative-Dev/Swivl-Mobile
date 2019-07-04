import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../../../styles/VariablesStyles';
import { loadUserVariables, updateUser } from '../../../actions/conversations';
import { connect } from 'react-redux';
import { VariablesItem } from '../../../common/widgets';
import Singleton from '../../../utils/Singleton';
import { ProgressDialog } from 'react-native-simple-dialogs';

const singleton = Singleton.getInstance();
class VariablesScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            variableValue: {},
            data: []
        }
    }

    componentDidMount(){
        this.props.loadUserVariables();
    }

    componentWillReceiveProps(props){
        const data = this.fetchVariables(props);
        this.setData(data);
        this.setState({
            data: data,
        });
    }

    fetchVariables(props){
        var variablesArr = [];
        if(props.conversation.variables !== null){
            const variables = props.conversation.variables;
            
            for(let [key, value] of Object.entries(variables)){
                if(!(value.name.indexOf('Hidden*') !== -1))
                    variablesArr.push(value);
            }
            return variablesArr;
        }
        return variablesArr;
    }

    onTextChange(id, text){
        this.setState({
            variableValue : {
                ...this.state.variableValue,
                [id]: text
            }
          });
    }

    onSubmit = () => {
        const selectedUser = singleton.getSelectedConversationUser();
        var userVariables;
        userVariables = this.state.variableValue;
        var user = selectedUser;
        user.set("userVariables", userVariables);
        singleton.setSelectedConversationUser(user);
        this.props.updateUser(user, true);
    }

    renderVariablesItem = (data) => {
        const item = data.item;

        return (
            <VariablesItem
                item = { item }
                value = { this.state.variableValue[item.id] }
                onChangeText = { this.onTextChange.bind(this) }
                onSubmit = { this.onSubmit }
            />
        );
    }

    setData(data){
        var object = {};
        const selectedUser = singleton.getSelectedConversationUser();
        if(selectedUser.get('userVariables') !== undefined){
            for( var i = 0; i < data.length; i++ ){
                const id = data[i].id;
                object[id] = selectedUser.get('userVariables')[id];
            }
            this.setState({
                variableValue : object
            });
        }
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
        return (
            <View style = { styles.mainContainer }>
                
                {this.renderLoader()}

                <FlatList
                    data = { this.state.data }
                    renderItem =  {this.renderVariablesItem }
                    keyExtractor = { (item) => item.id }
                    removeClippedSubviews = {false}
                    extraData={this.state}
                />

            </View>
        );
    }
}

const mapStateToProps = ({ conversation }) => {
    console.log("received",conversation);
    return { conversation };
};
export default connect(mapStateToProps, {
    loadUserVariables,
    updateUser
})(VariablesScreen);