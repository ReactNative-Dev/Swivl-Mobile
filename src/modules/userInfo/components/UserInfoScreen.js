import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { crm, variables, user_info } from '../../../utils/strings';
import { styles } from '../../../styles/UserInfoStyles';
import Header from '../../../common/components/Header';
import CrmScreen from './CrmScreen';
import VariablesScreen from './VariablesScreen';

class UserInfoScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            tab1: true,
            tab2: false
        }
    }

    onTab1Press = () => {
        this.setState({
            tab1: true, tab2: false
        });
    }

    onTab2Press = () => {
        this.setState({
            tab2: true, tab1: false
        })
    }

    renderScreen(){
        if(this.state.tab1){
            return (
                <CrmScreen />
            );
        }
        return (
            <VariablesScreen />
        );
    }

    render() {
        return (
            <View style = { styles.mainContainer }>
                <Header
                 back = {true}
                 text = {user_info}
                />
                
                <View style={ styles.tabContainer }>
                    <TouchableOpacity onPress={this.onTab1Press}>
                        <View style={[ (this.state.tab1)? styles.tab1View : styles.tab2View ]}>
                            <Text style= {[ (this.state.tab1)? styles.tab1Text : styles.tab2Text ]}>
                                {crm}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onTab2Press}>
                        <View style={[ (this.state.tab2)? styles.tab1View : styles.tab2View ]}>
                            <Text style= {[ (this.state.tab2)? styles.tab1Text : styles.tab2Text ]}>
                                {variables}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {this.renderScreen()}

            </View>
        );
    }
}

export default UserInfoScreen;