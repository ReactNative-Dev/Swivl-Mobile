import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainerAndroid: {
    },

    mainContainer: {
        backgroundColor: 'white',
        width: wp('100%')
    },

    mainContainerIos: {
        paddingTop: 35,
    },

    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 8,
        paddingRight: 8,
    },

    underline: {
        backgroundColor: 'black',
        height: 0.2,
        width: wp('100%'),
        marginTop: 12
    },
    
    headerText: {
       color: 'black',
       padding: 2,
       justifyContent:'center',
       textAlign: 'center',
    },

    headerTextIOS: {
        fontSize: hp('2%'),
    },

    headerTextAndroid: {
        fontSize: hp('3%'),
    },

    rightText: {
       color: '#f67800',
       marginRight: 4,
       justifyContent: 'flex-end',
       textAlign: 'right',
    },

    rightTextIOS: {
        fontSize: hp('1.8%'),
     },

     rightTextAndroid: {
        fontSize: hp('2.8%'),
     },

    info: {
        height: 20,
        width: 20,
    },

    back: {
        height: 25,
        width: 25,
    },

    leftViewContainer: {
        alignItems:'flex-start',
        flexDirection: 'row'
    },

    leftViewContainerForText: {
        width: wp('20%')
    },

    leftViewContainerWithoutText: {
        width: wp('10%')
    },

    rightViewContainerForText: {
        width: wp('21%'),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: wp('4%')
    },

    rightViewContainerWithoutText: {
        width: wp('10%'),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: wp('4%')
    },

    headerViewContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    headerViewContainerForText: {
        width: wp('60%')
    },

    headerViewContainerWithoutText: {
        width: wp('80%')
    },

});