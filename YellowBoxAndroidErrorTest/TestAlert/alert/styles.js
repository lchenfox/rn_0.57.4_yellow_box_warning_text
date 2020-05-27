import {StyleSheet} from 'react-native';
import {DEFAULT_ALERT_COLORS} from "./contants";

export default StyleSheet.create({
    message: {
        marginTop: 6,
        color: DEFAULT_ALERT_COLORS.BLACK,
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
        // textAlign: 'left',
        // alignSelf: 'center',
    },
});