import {StyleSheet} from 'react-native';

export const toolBarStyles = StyleSheet.create({
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
        margin: 6,
    },
    text: {
        fontSize: 16,
        color: '#3e3e3e',
    },
});

export const listItemStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTitleContainer: {
        height: 50,
        paddingBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 17,
        color: '#3e3e3e',
    },
    dayContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    day: {
        textAlign: 'center',
        paddingVertical: 3,
        color: '#3e3e3e',
    },
});

