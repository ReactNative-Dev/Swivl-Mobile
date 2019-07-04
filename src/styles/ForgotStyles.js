import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        alignItems: 'center',
        padding: 8,
        flex: 1,
    },

    subContainer: {
        marginTop:170 
    },

    headerText: {
        color: 'black',
    },

    headerTextIOS: {
        fontSize: hp('2.6%')
    },

    headerTextAndroid: {
        fontSize: hp('3.6%')
    },

    descriptionText: {
        color: 'gray',
        marginTop: 16,
        fontSize: hp('1.8%'),
        paddingLeft: 32,
        paddingRight: 32,
        textAlign: 'center'
    },

    descriptionTextIOS: {
        fontSize: hp('1.8%'),
    },

    descriptionTextAndroid: {
        fontSize: hp('2.8%'),
    },

    editTextContainer: {
        marginTop: 24
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

    brainIconIOS: {
        width: hp('2.5%'),
        height: hp('2.5%'),
        marginLeft: 2
    },
    
    brainIconAndroid: {
        width: hp('3.5%'),
        height: hp('3.5%'),
        marginLeft: 2
    },

});