import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import {toolBarStyles} from "../style";

const ToolBar = (
    {
        style,
        cancelStyle,
        confirmStyle,
        cancelText,
        confirmText,
        cancel,
        confirm,
        cancelDisabled,
        confirmDisabled,
    }
) => (
    <View style={[toolBarStyles.view, style]}>
        <TouchableOpacity
            title={cancelText}
            disabled={cancelDisabled}
            activeOpacity={cancelStyle && cancelStyle.activeOpacity || 0.2}
            onPress={() => cancel && typeof cancel === 'function' && cancel()}
        >
            <Text style={[toolBarStyles.cancelText, cancelStyle]}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            title={confirmText}
            disabled={confirmDisabled}
            activeOpacity={confirmStyle && confirmStyle.activeOpacity || 0.2}
            onPress={() => confirm && typeof confirm === 'function' && confirm()}
        >
            <Text style={[toolBarStyles.confirmText, confirmStyle]}>{confirmText}</Text>
        </TouchableOpacity>
    </View>
);

ToolBar.propTypes = {
    style: PropTypes.any,
    cancelStyle: PropTypes.any,
    confirmStyle: PropTypes.any,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    cancel: PropTypes.func,
    confirm: PropTypes.func,
    cancelDisabled: PropTypes.bool,
    confirmDisabled: PropTypes.bool,
};

export default ToolBar;