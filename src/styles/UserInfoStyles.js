import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        alignItems: 'center',
        paddingTop: 8,
        paddingRight: 8,
        paddingLeft: 8,
        flex: 1,
    },

    tabContainer: {
        flexDirection: 'row'
    },

    tab1View: {
        backgroundColor:'#5E5350',
        borderRadius:20,
        padding:8,
        margin:4,
        width: wp('45%'),
    },
    
    tab2View: {
        backgroundColor:'#f5f1ef',
        borderRadius:20,
        padding:8,
        margin:4,
        width: wp('45%')
    },

    tab1Text: {
        color: 'white',
        textAlign: 'center'
    },

    tab2Text: {
        color: '#5E5350',
        textAlign: 'center'
    }
});