import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: '#f5f1ef',
        flex: 1,
        width: wp("100%"),
        height: hp("100%")
    }

});