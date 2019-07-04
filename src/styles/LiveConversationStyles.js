import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        alignItems: 'center',
        paddingBottom: 8,
        flex: 1,
        backgroundColor: '#f5f1ef'
    },

    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: wp('100%'),
    },

    tab1View: {
        backgroundColor:'#5E5350',
        borderRadius:20,
        padding:8,
        margin:4,
        width: wp('30%'),
    },
    
    tab2View: {
        backgroundColor:'#f5f1ef',
        borderRadius:20,
        padding:8,
        margin:4,
        width: wp('30%')
    },

    tab1Text: {
        color: 'white',
        textAlign: 'center'
    },

    tab2Text: {
        color: '#5E5350',
        textAlign: 'center'
    },

    nodataText: {
        fontSize: 20,
        color: 'gray'
    },

    noDataContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },

    nodataImage: {
        width: 50,
        height: 50
    },

});