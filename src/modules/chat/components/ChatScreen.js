import React, { Component } from 'react';
import { View, FlatList, Text, Animated, Keyboard, TouchableOpacity, Image, TextInput, Platform, ActivityIndicator } from 'react-native';
import { type_message, takeover_chat, load_previous } from '../../../utils/strings';
import { styles } from '../../../styles/ChatStyles';
import Header from '../../../common/components/Header';
import { TextViewChat } from '../../../common/widgets';
import SocketHandler from '../../../utils/SocketHandler';
import Singleton from '../../../utils/Singleton';
import { Helper, BotUserHelper } from '../../../utils/Helper';
import { setPauseOnUser } from '../../../actions/conversations';
import { sendQuest } from '../../../actions/quests';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';

const singleton = Singleton.getInstance();
class ChatScreen extends Component{

    constructor(props){
        super(props)
        this.keyboardHeight = new Animated.Value(0);
        this.botUser = null;
        this.botId = singleton.getBot().id;
        this.transcriptDate = new Date();
        this.auth = null;
        this.headerText = "";
        this.state = {
            data: [],
            takeover: true,
            showLoadBtn: 'loader',
            chatText: "",
            loading: true
        }
    }

    componentWillMount () {
        this.botUser = this.props.navigation.state.params.item;
        singleton.setSelectedConversationUser(this.botUser);
        this.users  = singleton.getBotUsers();
        // singleton.setBotUsers(this.users);
        this.userVariables = singleton.getBot().get("userVariables").get("variables");
        this.headerText = String(BotUserHelper.displayNameForUser(this.botUser, this.userVariables));
        if(this.botUser.isConversationTakenOver){
            this.setState({
                takeover: false
            });
        }

        this.auth= {humanTakeover:true, "userId":this.botUser.id, "token": this.botUser.get("token") }
        this.server = "swivl-server-staging.herokuapp.com";
        this.socketHandler = new SocketHandler(this, this.server);
        this.socketHandler.connect();

        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
        this.socketHandler.disconnect();
    }

    componentWillReceiveProps(nextProps){
        this.taken = false;
        if(nextProps.quests.quest !== null){
            if(!this.state.takeover){
                this.taken = true;
                this.props.setPauseOnUser(this.users, this.botUser, null);
            }
            this.setState({
                takeover: this.taken
            });
            this.props.sendQuest(null);
        }
        var userId = nextProps.navigation.state.params.item.id;
        nextProps.conversation.users.map((user) => {
            if(user.id === userId){
                if(user.isConversationTakenOver){
                    this.setState({
                        takeover: false
                    });
                }else{
                    this.setState({
                        takeover: true
                    });
                }
            }
        })
    }

    keyboardWillShow = (event) => {
        Animated.parallel([
          Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            toValue: event.endCoordinates.height,
          }),
        ]).start();
    };

    keyboardWillHide = (event) => {
      Animated.parallel([
        Animated.timing(this.keyboardHeight, {
          duration: event.duration,
          toValue: 0,
        }),
      ]).start();
    };

    receivedPastMessages(messages, hasPastMessages){
        for (var i = 0; i < messages.length; i++) {
            let message =  messages[i];
            message.insertType = "past_message";
            if (typeof message.received == "string") {
              message.received = new Date(message.received);
            }
            if (!message.received) { message.received = new Date(message.sent); }
        }
       
        messages.sort(function(a,b){
          return a.received - b.received;
        });

        if(this.state.data.length > 0){
            for( var i = 0; i < this.state.data.length; i++){
                messages.push(this.state.data[i]);
            }
        }
        
        messages = this.getUnique(messages,'id');
        
        this.setState({
             showLoadBtn: "no",
             data: messages
         });
        console.log("messages:", messages);
    }

    getUnique(arr, comp) {

        const unique = arr
             .map(e => e[comp])
      
           // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)
      
          // eliminate the dead keys & store unique objects
          .filter(e => arr[e]).map(e => arr[e]);
      
         return unique;
      }

    receivedMessage(message){
       var previousData = this.state.data;
        
       for(var i=0; i< message.length; i++){
            let msg = message[i];
            var isAlreadyInList = false;
            
            for (var m = 0; m < previousData.length; m++) {
                if (previousData[m] && previousData[m].id && previousData[m].id == msg.id) {
                    isAlreadyInList = true;
                    break;
                }
            }
            if(isAlreadyInList) {
                continue; 
            }else {
                previousData.push(msg);
            }
            this.setState({
                data: previousData
            });
        }
    }

    renderListItem(data){
        return <TextViewChat
            item = {data.item}
        />;
    }

    onIconPress = () => {
        this.props.navigation.navigate('QuestScreen');
    }

    onTakeoverPress = () => {
        this.setState({
            takeover: false,
        });
        this.props.setPauseOnUser(this.users, this.botUser , new Date());
        this.onLoadPreviousPress();
    }

    onLoadPreviousPress = () => {
        if(this.socketHandler.hasConnected){
            this.setState({
                showLoadBtn: "loader"
            })
            this.socketHandler.sendRequestPastMessagesFrame(this.auth, this.transcriptDate, 30);
        }
    }

    onChatTextChange(text){
        this.setState({
            chatText: text
        });
    }

    onSendMessage = (msg) => {
        var messageValue = this.state.chatText;

        if(msg !== null){
            messageValue = msg;
        }

        const message = {
            "bot": this.botId,
            "isHumanTakeover": false,
            "sender": "bot",
            "sent": new Date(),
            "text": messageValue,
            "type": "text",
            "user": this.auth.userId,
            "id": Helper.shortId()
        }

        const sendMessage = {
            "auth": this.auth,
            "message": message,
            "type": "MessageFrame"
        }

        this.setState({
            chatText:""
        })

        this.socketHandler.sendFrame(sendMessage);
    }

    connectionOpened(){
        this.setState({
            loading: false,
        });
        this.onLoadPreviousPress();
    }

    reconnected(){

    }

    renderSendIcon(){
        if(this.state.chatText.length > 0){
            return (
                <TouchableOpacity onPress = {this.onSendMessage.bind(this, null)}>
                    <Image
                        style = {[ styles.chatInputRightImage, (Platform.OS === "ios")? styles.chatInputRightImageIOS : styles.chatInputRightImageAndroid ]}
                        source = {require('../../../assets/icons/ic_chat_active.png')}
                    />
                </TouchableOpacity>
            );
        }
        return (
                <Image
                    style = {[ styles.chatInputRightImage, (Platform.OS === "ios")? styles.chatInputRightImageIOS : styles.chatInputRightImageAndroid ]}
                    source = {require('../../../assets/icons/ic_chat_inactive.png')}
                />
        );
        
    }

    onSubmit = () => {
        if(this.state.chatText.length > 0){
            this.onSendMessage( null );
        }
    }

    renderBottomView(){
        if(!(this.state.takeover)){
            return(
                <View style={[ styles.chatInputMainContainer, (Platform.OS === "ios")? styles.chatInputMainContainerIOS : styles.chatInputMainContainerAndroid ]}>
                    <TouchableOpacity
                        style={[{ alignSelf: 'center'}, (Platform.OS === "ios")? {flex: 1} : {} ]}
                        onPress = { this.onIconPress }>
                        <Image
                            style = {[ styles.chatInputLeftImage, (Platform.OS === "ios")? styles.chatInputLeftImageIOS : styles.chatInputLeftImageAndroid ]}
                            source = {require('../../../assets/icons/ic_bot.png')}
                        />
                    </TouchableOpacity>
                    <View style={[ styles.chatInputSubContainer, (Platform.OS === "ios")? styles.chatInputSubContainerIOS : styles.chatInputSubContainerAndroid ]}>
                        <TextInput
                            style ={[ styles.chatInput, (Platform.OS === "ios")? styles.chatInputIOS : styles.chatInputAndroid ]}
                            placeholder = { type_message }
                            returnKeyType='done'
                            onChangeText = {this.onChatTextChange.bind(this)}
                            value = {this.state.chatText}
                            onSubmitEditing = {this.onSubmit}
                        />
                        {this.renderSendIcon()}
                    </View>
                </View>
            );
        }
        return (
            <TouchableOpacity onPress = { this.onTakeoverPress }>
                    <View style={ styles.takeoverContainer }>
                        <Text style={ styles.takeoverText }>
                            { takeover_chat }
                        </Text>
                    </View>
            </TouchableOpacity>
        );
    }

    renderLoadButton(){
        if(this.state.showLoadBtn === "yes"){
            return <View style={ styles.loadingBtnContainer }>
                    <TouchableOpacity onPress = { this.onLoadPreviousPress }>
                        <Text style={ styles.loadingText }>
                            { load_previous }
                        </Text>
                    </TouchableOpacity>
            </View>;
        } else if(this.state.showLoadBtn === "loader"){
            return <View style={ styles.loaderContainer }>
                        <ActivityIndicator size="large" color="#00C9BD" />
            </View>;
        }

    }

    renderLoader(){
        return(
            <ProgressDialog
                visible={this.state.loading}
                message="Please, wait..."
            />
        );
    }

    render() {
        
        return (
            <Animated.View style = {[ styles.mainContainer, { paddingBottom: this.keyboardHeight } ]}>
                
                {this.renderLoader()}

                <Header
                    back = {true}
                    info = {true}
                    text = {this.headerText}
                />
                
                {this.renderLoadButton()}

                <FlatList
                    style = { styles.list }
                    data = { this.state.data }
                    renderItem =  { this.renderListItem }
                    keyExtractor = { (item) => item.id }
                    removeClippedSubviews = {false}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                />

                { this.renderBottomView() }

            </Animated.View>
        );
    }
}

const mapStateToProps = ({ conversation, quests }) => {
    return { conversation, quests };
};
export default connect(mapStateToProps, {
    setPauseOnUser,
    sendQuest
})(ChatScreen);