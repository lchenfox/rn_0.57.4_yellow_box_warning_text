'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactNative = require('react-native');

exports['default'] = function (theme) {
    return _reactNative.StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: theme.toast_zindex
        },
        innerContainer: {
            backgroundColor: 'transparent'
        },
        innerWrap: {
            alignItems: 'center',
            backgroundColor: theme.toast_fill,
            minWidth: 100
        },
        iconToast: {
            borderRadius: theme.radius_lg,
            padding: theme.v_spacing_lg
        },
        textToast: {
            borderRadius: theme.radius_sm,
            paddingVertical: theme.v_spacing_md,
            paddingHorizontal: theme.v_spacing_lg
        },
        content: {
            color: theme.color_text_base_inverse,
            fontSize: theme.font_size_subhead
        },
        image: {
            marginBottom: theme.v_spacing_xs
        },
        centering: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.v_spacing_md
        }
    });
};

module.exports = exports['default'];