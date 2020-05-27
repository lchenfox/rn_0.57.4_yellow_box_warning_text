/**
 * Usage example:
 *
 *   <WKAlert
 *      ref={ref => this.alertRef = ref}
 *      title={'Tips'}
 *      message={'Are you sure you want to logout?'}
 *      defaultTitle={'Cancel'}
 *      okTitle={'Confirm'}
 *      defaultCallback={() => {}}
 *      okCallback={() => {}}
 *   />
 *
 *   Notes: you can also add child component to custom by yourself, such as:
 *   <WKAlert ...someProps>
 *       <Image source={icon}/>
 *       <Text>message content</Text>
 *   </WKAlert>
 *   ......
 *
 *  this.alertRef.show() // To start, use such reference to show alert. Hiding alert
 *  is automatic. So you don't have to do it.
 */

import * as React from 'react';
import {Text} from "react-native";
import PropTypes from 'prop-types';
import Modal from "../modal/Modal";
import ModalButton from '../modal/components/ModalButton';
import ModalContent from '../modal/components/ModalContent';
import ModalFooter from '../modal/components/ModalFooter';
import ModalTitle from '../modal/components/ModalTitle';
import ScaleAnimation from '../modal/animations/ScaleAnimation';
import styles from "./styles";
import {DEFAULT_ALERT_COLORS} from './contants';

class WKAlert extends React.Component {

    state = {
        visible: false,
    };

    show = () => {
        this.setState({
            visible: true,
        });
    };

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    render() {

        const {

            children,

            title,
            message,
            defaultTitle,
            defaultCallback,
            okTitle,
            okCallback,

            titleStyle,
            titleTextStyle,
            defaultStyle,
            defaultTextStyle,
            okStyle,
            okTextStyle,
            messageStyle,
            messageTextStyle,

        } = this.props;

        if (okTitle && (!defaultTitle || typeof defaultTitle !== 'string')) {
            __DEV__ && console.error('defaultTitle is required by WKAlert before okTitle, file: WKAlert, line: 80');
            return null;
        }

        const modalButtons = [];
        modalButtons.push(
            <ModalButton
                text={defaultTitle || '知道了'}
                style={defaultStyle}
                textStyle={okTitle ? {color: DEFAULT_ALERT_COLORS.DARK_GRAY, ...defaultTextStyle} : {color: DEFAULT_ALERT_COLORS.LIGHT_GRAY, ...defaultTextStyle}}
                onPress={() => {
                    this.hide();
                    defaultCallback && typeof defaultCallback === 'function' && defaultCallback();
                }}
                key="button-1"
            />
        );

        if (okTitle && typeof okTitle === 'string') {
            modalButtons.push(<ModalButton
                text={okTitle}
                style={okStyle}
                textStyle={okTextStyle}
                onPress={() => {
                    this.hide();
                    okCallback && typeof okCallback === 'function' && okCallback();
                }}
                key="button-2"
            />)
        }

        return <Modal
            width={0.75}
            visible={this.state.visible}
            modalAnimation={new ScaleAnimation()}
            onHardwareBackPress={() => {
                this.hide();
                return true;
            }}
            overlayPointerEvents={'none'}
            {...this.props} // Other props in case of your need
            modalTitle={
                title ? <ModalTitle
                    title={title}
                    style={titleStyle}
                    textStyle={titleTextStyle}
                    hasTitleBar={false}
                /> : null
            }
            footer={
                <ModalFooter>
                    {modalButtons}
                </ModalFooter>
            }
        >
            <ModalContent style={messageStyle}>
                {message && <Text style={[styles.message, messageTextStyle]}>{message}</Text>}
                {children}
            </ModalContent>
        </Modal>;
    }

}

/**
 * Default colors, you can import it to use like {color: WKAlert.DEFAULT_ALERT_COLORS.RED} outside.
 * @type {{RED: string, LIGHT_GRAY: string, BLUE: string, BLACK: string, DARK_GRAY: string}}
 */
WKAlert.DEFAULT_ALERT_COLORS = DEFAULT_ALERT_COLORS;

WKAlert.propTypes = {

    /**
     * Child components to custom, such as: <Text>This is a message</Text>
     * In general, you have no need to do this until you want to add
     * customizable things like icons or other special contents. In brief,
     * it's just up to you.
     */
    children: PropTypes.any,

    /**
     * Corresponding properties that can be customized by users
     */
    title: PropTypes.string,
    message: PropTypes.string,
    defaultTitle: PropTypes.string,
    defaultCallback: PropTypes.func,
    okTitle: PropTypes.string,
    okCallback: PropTypes.func,

    /**
     * styles exposed to the outside
     */
    titleStyle: PropTypes.any,
    titleTextStyle: PropTypes.any,
    messageStyle: PropTypes.any,
    messageTextStyle: PropTypes.any,
    defaultStyle: PropTypes.any,
    defaultTextStyle: PropTypes.any,
    okStyle: PropTypes.any,
    okTextStyle: PropTypes.any,
};

export default WKAlert;