import {StyleSheet} from 'react-native';

export const navigationBarStyles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        marginTop: 20,
        height: 64,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cancelText: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: 'gray',
        fontSize: 16,
    },
    confirmText: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: 'blue',
        fontSize: 16,
    },
});

export const weekBarStyles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        color: '#3e3e3e',
    },
});

