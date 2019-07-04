import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    editContainer: {
        paddingLeft: 8,
        paddingRight: 8,
        borderColor: 'black',
        borderRadius: 4,
        width: wp('90%'),
        marginTop: 8,
    },

    editContainerIOS: {
        paddingTop: 12,
        paddingBottom: 12,
        borderWidth: 0.2,
    },

    editContainerAndroid: {
        borderWidth: 0.4,
    },

    textInput: {
        alignSelf: 'center',
        textAlign: 'center',
        width: wp('90%'),
    },

    textInputIOS: {
        fontSize: hp('2%'),
    },

    textInputAndroid: {
        fontSize: hp('3%'),
    },

    text: {
        alignSelf: 'center',
    },

    buttonContainer: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#e9e3df',
        borderRadius: 4,
        width: wp('90%'),
        marginTop: 8
    },

    buttonOrangeContainer: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#f67800',
        borderRadius: 4,
        width: wp('90%'),
        marginTop: 8
    },

    buttonOrangeText: {
        alignSelf: 'center',
        color: 'white'
    },

    searchViewContainer: {
        borderRadius: 6,
        width: wp('94%'),
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },

    searchViewContainer1: {
        borderRadius: 6,
        width: wp('94%'),
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: '#f5f1ef',
        alignItems: 'center'
    },

    searchViewContainerIOS: {
        padding: 8,
    },

    searchViewContainerAndroid: {
    },

    searchInputIOS: {
        fontSize: hp('2%'),
        paddingLeft: 6,
        flex: 1
    },

    searchInputAndroid: {
        fontSize: hp('3%'),
        paddingLeft: 6,
        flex: 1
    },

    searchIconIOS: {
        width: hp('2.5%'),
        height: hp('2.5%')
    },
    
    searchIconAndroid: {
        width: hp('3.5%'),
        height: hp('3.5%')
    },

    leftIcon: {
        width: wp('3.5%'),
        height: wp('4.8%'),
        marginLeft: 4
    },

    leftPersonIcon: {
        width: hp('3%'),
        height: hp('3%'),
        marginLeft: 4
    },

    botItemText: {
        marginLeft: 6, 
        alignSelf: 'center'
    },

    botItemTextIOS: {

    },
    
    botItemTextAndroid: {
        fontSize: 18
    },
    
    botItemContainer: {
        backgroundColor: 'white', 
        paddingLeft: 8, 
        paddingRight: 4, 
        paddingTop: 10, 
        paddingBottom: 10, 
        marginTop: 1, 
        width: wp('100%') 
    },

    conversationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('100%'),
        justifyContent: 'space-between',
    },

    subConversationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 4,
        paddingRight: 4,
        flex:1
    },
    
    conversationContainer1: {
        backgroundColor: '#e9e3df'
    },

    conversationContainer2: {
    },

    conversationText3: {
        paddingLeft: 6,
        paddingRight: 6,
        color: 'black',
        textAlign: 'right',
       
    },

    conversationText3IOS: {
        fontSize: hp('1.4%'),
    },

    conversationText3Android: {
        fontSize: hp('2.4%'),    
    },

    conversationText: {
        paddingLeft: 6,
    },

    conversationText1: {
        color: 'black'
    },

    conversationText2: {
        color: 'gray'
    },

    conversationTextIOS: {
        fontSize: hp('2%'),
    },

    conversationTextAndroid: {
        fontSize: hp('3%'),
    },

    textViewContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 12,
        paddingBottom: 12,
        width: wp('100%'),
        marginTop: 1
    },

    textViewGrayContainer: {
        backgroundColor: '#5f5450',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        width: wp('100%'),
        marginTop: 1
    },

    textViewBlackText: {
        color: 'black',
        alignSelf: 'center'
    },

    textViewWhiteText: {
        color: 'white',
        alignSelf: 'center'
    },

    textViewIOS: {
    },

    textViewAndroid: {
        fontSize: hp('2.5%')
    },

    arrowIcon: {
        width: hp('2.5%'),
        height: hp('2.5%'),
        justifyContent: 'flex-end'
    },

    textViewChatMainContainer: {
        width: wp('100%'),
    },

    textViewChatGrayContainer: {
        backgroundColor: '#5f5450',
        padding: 6,
        marginLeft: 6,
        marginRight: 12,
        marginBottom: 16,
        alignSelf:'flex-start',
        alignItems:'flex-start',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 0
    },

    textViewChatWhiteContainer: {
        backgroundColor: 'white',
        padding: 6,
        marginLeft: 6,
        marginRight: 12,
        marginBottom: 16,
        alignSelf:'flex-end',
        alignItems:'flex-end',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 0

    },

    textViewChatGrayText: {
        color : '#5f5450',
        padding: 4
    },

    textViewChatWhiteText: {
        color : 'white',
        padding: 4
    },

    variableItemTextInput:{
        backgroundColor: 'white',
        width: wp("100%"),
        fontSize: 18,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12      
    },
    
    variableItemText: {
        marginTop: 20,
        marginBottom: 4,
        color: 'black',
        fontSize: 14,
        paddingLeft: 12,
        paddingRight: 12
    }
});