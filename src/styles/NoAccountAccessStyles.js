import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        alignItems: 'center',
        paddingBottom: 8,
        flex: 1,
        backgroundColor: 'white'
    },

    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 140
    },

    oopsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    oopsText: {
        fontSize: 22,
        color: 'black'
    },

    oopsIconIOS: {
        width: hp('3.5%'),
        height: hp('3.5%'),
        marginLeft: 2
    },
    
    oopsIconAndroid: {
        width: hp('4.5%'),
        height: hp('4.5%'),
        marginLeft: 2
    },

    messageText: {
        fontSize: 18,
        color: 'gray',
        marginTop: 8,
        paddingLeft: 32,
        paddingRight: 32,
        textAlign: 'center'
    },

});