import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: '#f5f1ef',
        flex: 1,
        width: wp('100%'),
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 24,
        paddingBottom: 20,
    },

    textHeader: {
        color: 'gray',
        fontSize: 14,
    },

    nameText: {
        color: 'black',
        fontSize: 28,
        marginTop: 8,
        marginBottom: 8
    },

    textValues: {
        color: 'black',
        fontSize: 16,
    },
    
    textContainer: {
        marginTop: 12,
        marginBottom: 10
    }

});