import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import {navigationBarStyles} from "../style";

const NavigationBar = (
    {
        style,
        cancelStyle,
        confirmStyle,
        cancelText,
        confirmText,
        cancel,
        confirm,

    }
) => (
    <View style={[navigationBarStyles.view, style]}>
        <TouchableOpacity title={cancelText} onPress={() => cancel && typeof cancel === 'function' && cancel()}>
            <Text style={[navigationBarStyles.cancelText, cancelStyle]}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity title={confirmText} onPress={() => confirm && typeof confirm === 'function' && confirm()}>
            <Text style={[navigationBarStyles.confirmText, confirmStyle]}>{confirmText}</Text>
        </TouchableOpacity>
    </View>
);

NavigationBar.propTypes = {
    style: PropTypes.any,
    cancelStyle: PropTypes.any,
    confirmStyle: PropTypes.any,
    cancelText: PropTypes.string.isRequired,
    confirmText: PropTypes.string.isRequired,
    cancel: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
};

export default NavigationBar;