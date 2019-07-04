import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        alignItems: 'center',
        paddingBottom: 8,
        flex: 1,
        backgroundColor: '#f5f1ef'
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

    text: {
        alignSelf: 'center',
        color: '#f67800'
    },

    textIOS: {
    },

    textAndroid: {
        fontSize: hp('2.5%')
    },

    text1: {
        fontSize: 32,
        marginTop: 12
    },

    text2: {
        color: 'gray',
        fontSize: 18,
        marginTop: 6
    },

    profile: {
        width : wp('30%'),
        height: hp('10%'),
        marginTop: 28
    },

    logo: {
        paddingTop:20,
        paddingBottom: 20
    },

    logoIOS: {
        width: wp('50%'),
        height: wp('15%'),
    },

    logoAndroid: {
        width: wp('50%'),
        height: wp('15%'),
    },

    bottomText: {
        color: 'gray',
        fontSize: hp('2%'),
        marginTop: 12,
        
    },

    conversationContainer: {
        justifyContent: 'flex-end',
        flex:1,
        marginBottom: 32,
        alignItems:'center'
    },

});