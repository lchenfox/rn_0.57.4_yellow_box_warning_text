import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    BottomModal,
    ModalButtonProps,
    SlideAnimation,
    ScaleAnimation,
} from './TestAlert';
import WKToast from "./WKToast";
import {Toast, Portal} from './components';
import {WKAlert} from "./TestAlert";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentView: {
        paddingLeft: 18,
        paddingRight: 18,
    },
    navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
    },
    navigationTitle: {
        padding: 10,
    },
    navigationButton: {
        padding: 10,
    },
    navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
    },
    navigator: {
        flex: 1,
        // backgroundColor: '#000000',
    },
    customBackgroundModal: {
        opacity: 0.5,
        backgroundColor: '#000',
    },
});

export default class App extends Component {
    state = {
        customBackgroundModal: false,
        defaultAnimationModal: false,
        swipeableModal: false,
        scaleAnimationModal: false,
        slideAnimationModal: false,
        bottomModalAndTitle: false,
        bottomModal: false,
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>

                    <Button
                        title="Bottom Modal with Title 嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻"
                        onPress={() => {

                        }}
                    />

                    <Button
                        title="Bottom Modal without Title 嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻"
                        onPress={() => {

                        }}
                    />


                    <Button
                        title="Bottom Modal with Title 1"
                        onPress={() => {
                            this.alertRef.show();
                        }}
                    />

                    <Button
                        title="Bottom Modal without Title 2"
                        onPress={() => {
                            this.alertRef1.show();
                        }}
                    />

                    <Button
                        title="Show Modal - Scale Animation 3"
                        onPress={() => {
                            this.alertRef2.show();
                        }}
                    />


                    <Button
                        title="Bottom Modal with Title"
                        onPress={() => {
                            this.setState({
                                bottomModalAndTitle: true,
                            });
                        }}
                    />

                    <Button
                        title="Bottom Modal without Title"
                        onPress={() => {
                            this.setState({
                                bottomModal: true,
                            });
                        }}
                    />
                </View>


                <WKAlert
                    ref={ref => this.alertRef = ref}
                    title={'Tips'}
                    message={'Are you sure you want to logout?'}
                    defaultTitle={'Cancel'}
                    okTitle={'Confirm'}
                    defaultCallback={() => {}}
                    okCallback={() => {}}
                />


                <WKAlert
                    ref={ref => this.alertRef1 = ref}
                    // title={'温馨提示'}
                    // titleTextStyle={{color: 'red'}}
                    message={'你确定要退出登录吗？'}
                    // messageTextStyle={{color: 'green'}}
                    // defaultTitle={'取消'}
                    // defaultTextStyle={{color: 'red'}}
                    // okTitle={'确定'}
                    // okTextStyle={{color: 'cyan'}}
                    defaultCallback={() => console.warn('good')}
                    okCallback={() => console.warn('bad')}
                />

                <WKAlert
                    ref={ref => this.alertRef2 = ref}
                    // title={'温馨提示'}
                    // titleTextStyle={{color: 'red'}}
                    message={'你确定要退出登录吗？'}
                    // messageTextStyle={{color: 'green'}}
                    defaultTitle={'取消'}
                    // defaultTextStyle={{color: 'red'}}
                    okTitle={'确定'}
                    okTextStyle={{color: WKAlert.DEFAULT_ALERT_COLORS.RED}}
                    defaultCallback={() => console.warn('good')}
                    okCallback={() => console.warn('bad')}
                />

                <BottomModal
                    visible={this.state.bottomModalAndTitle}
                    onTouchOutside={() => {
                        console.warn(111);
                        this.setState({bottomModalAndTitle: false});
                    }}
                    height={0.3}
                    width={1}
                    onSwipeOut={() => {
                        console.warn(222);
                        this.setState({bottomModalAndTitle: false});
                    }}
                    swipeDirection={'right'}
                    modalAnimation={new SlideAnimation({ slideFrom: 'right' })}
                    modalTitle={
                        <ModalTitle
                            style={{backgroundColor: 'white'}}
                            title="Bottom Modal"
                            hasTitleBar={false}
                        />
                    }
                >
                    <ModalContent
                        style={{
                            flex: 1,
                            backgroundColor: 'fff',
                        }}
                    >
                        <Text>
                            Bottom Modal with Title
                        </Text>
                    </ModalContent>
                </BottomModal>

                <BottomModal
                    visible={this.state.bottomModal}
                    onTouchOutside={() => {
                        console.warn(333);
                        this.setState({bottomModal: false});
                    }}
                    onSwipeOut={() => {
                        console.warn(444);
                        this.setState({bottomModal: false});
                    }}
                    // modalStyle={{  }}
                >
                    <ModalContent
                        style={{
                            backgroundColor: 'fff',
                            // height: '40%',
                        }}
                    >
                        <Text>
                            Bottom Modal without Title
                        </Text>
                        <Text>
                            Bottom Modal without Title
                        </Text>
                        <Text>
                            Bottom Modal without Title
                        </Text>
                        <Text>
                            Bottom Modal without Title
                        </Text>
                        <Text>
                            Bottom Modal without Title
                        </Text>
                        <Text>
                            Bottom Modal without Title
                        </Text>
                        <Text>
                            Bottom Modal without Title
                        </Text>
                        <Text>
                            Bottom Modal without Title
                        </Text>
                        <Text>
                            Bottom Modal without Title
                        </Text>
                        <Text>
                            Bottom Modal without Title
                        </Text>
                    </ModalContent>
                </BottomModal>
            </View>
        );
    }
}