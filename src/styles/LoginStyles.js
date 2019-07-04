import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        alignItems: 'center',
        padding: 8,
        flex: 1,
    },

    text: {
        color: 'black',
        fontSize: hp('2.6%'),
        marginTop: 8
    },

    keyboardViewContainer: { 
        flex: 4.5, 
        alignItems: 'center', 
        justifyContent: "flex-end" 
    },

    topViewContainer: {
        alignItems: 'center', 
        flex: 4.5, 
        justifyContent: "flex-end"
    },

    editTextContainer: {
         marginTop: hp('10%')
    },

    forgotContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 32
    },

    forgotText: {
        color: 'black',
        fontSize: hp('1.8%')
    },

    forgotTextAndroid: {
        fontSize: hp('2.2%')
    },

    forgotTextIOS: {
        fontSize: hp('1.8%')
    },

    topImageContainer: {
        //marginTop:130
    },

    topImage: {
        width: wp('60%'),
        paddingTop:20,
        paddingBottom: 20
    },

    topImageIOS: {
        width: wp('60%'),
        height: wp('18%')
    },

    topImageAndroid: {
          height: wp('18%'),
    },

    bottomImageContainer: {
        marginTop:20
    },

    bottomImage: {
        width: wp('100%'),
    },

    bottomImageIOS: {
        height: wp('9%'),
    },

    bottomImageAndroid: {
        height: wp('9%')
    }

});