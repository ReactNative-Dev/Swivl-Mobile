import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#f5f1ef'
    },

    list: {
        paddingTop: 16,
        paddingBottom: 16,
        marginBottom: 8
    },

    chatInputMainContainer: {
        paddingTop: 16,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    chatInputMainContainerAndroid: {
         height: hp('13%')
    },

    chatInputMainContainerIOS: {
    },

    chatInputLeftImage: {
        width: hp('2.5%'),
        height: hp('2.5%'),
        alignSelf: 'center',
        padding: 8
    },

    chatInputLeftImageIOS: {
        width: hp('3.5%'),
        height: hp('3.5%'),
    },

    chatInputLeftImageAndroid: {
        width: hp('3.5%'),
        height: hp('3.5%'),
    },

    chatInputSubContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginLeft: 24,
        marginRight: 8,
        borderRadius: 24,
        borderWidth: 0.2,
        borderColor: 'black',
        alignItems: 'center'
    },

    chatInputSubContainerIOS: {
        padding: 10,
    },

    chatInputSubContainerAndroid: {
        paddingLeft: 10,
        paddingRight: 10
    },

    chatInputRightImage: {
        justifyContent: 'flex-end'
    },

    chatInputRightImageIOS: {
        width: hp('3%'),
        height: hp('3%')
    },
    
    chatInputRightImageAndroid: {
        width: hp('3.5%'),
        height: hp('3.5%')
    },

    chatInput: {
        flex: 1,
        paddingRight: 4,
    },

    chatInputIOS: {
        fontSize: hp('2%'),
    },

    chatInputAndroid: {
        fontSize: hp('3%'),
    },

    takeoverContainer: {
        padding: 24,
        backgroundColor: '#00cabe',
        alignItems: 'flex-end',
        width: wp('100%')
    },

    takeoverText: {
        color: 'white',
        fontSize: 16,
        alignSelf:'center'
    },

    loadingBtnContainer: {
        alignItems:'center',
        backgroundColor:'#5f5450',
        marginTop:4,
        borderRadius: 4
    },

    loadingText: {
        padding: 6,
        color: 'white'
    },

    loaderContainer: {
        alignItems:'center',
        marginTop:4
    }

});