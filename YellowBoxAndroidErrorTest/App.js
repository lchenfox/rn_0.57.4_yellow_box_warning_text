import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    BottomModal,
    SlideAnimation,
    ScaleAnimation,
} from './TestAlert';

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
                        title="Show Modal - Scale Animation"
                        onPress={() => {
                            this.setState({
                                scaleAnimationModal: true,
                            });
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


                <Modal
                    onTouchOutside={() => {
                        this.setState({scaleAnimationModal: false});
                    }}
                    width={0.8}
                    visible={this.state.scaleAnimationModal}
                    onSwipeOut={() => {
                        console.warn('on swipe out');
                        this.setState({scaleAnimationModal: false})
                    }}
                    modalAnimation={new ScaleAnimation()}
                    onHardwareBackPress={() => {
                        console.warn('onHardwareBackPress');
                        this.setState({scaleAnimationModal: false});
                        return true;
                    }}
                    // onMove={() => console.warn('on move')}
                    overlayPointerEvents={'none'}
                    modalTitle={
                        <ModalTitle
                            textStyle={{color: 'red', fontSize: 18}}
                            title="Modal - Scale Animation"
                            hasTitleBar={false}
                        />
                    }
                    actions={[
                        <ModalButton
                            text="DISMISS"
                            onPress={() => {
                                this.setState({scaleAnimationModal: false});
                            }}
                            key="button-1"
                        />,
                    ]}
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="CANCEL"
                                bordered
                                textStyle={{color: 'gray'}}
                                onPress={() => {
                                    this.setState({scaleAnimationModal: false});
                                }}
                                key="button-1"
                            />
                            <ModalButton
                                text="OK"
                                bordered
                                onPress={() => {
                                    this.setState({scaleAnimationModal: false});
                                }}
                                key="button-2"
                            />
                        </ModalFooter>
                    }
                >
                    <ModalContent>
                        <Text style={{textAlign: 'center', color: 'gray'}}>您确定要退出登录吗? 退出登录后，需要重新登录</Text>
                    </ModalContent>
                </Modal>

                <Modal.BottomModal
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
                </Modal.BottomModal>

                <Modal.BottomModal
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
                </Modal.BottomModal>
            </View>
        );
    }
}