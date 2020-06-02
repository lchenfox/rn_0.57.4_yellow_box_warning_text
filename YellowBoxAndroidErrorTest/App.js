import React, {Component} from 'react';
import {Button, View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList, Modal} from 'react-native';
import {
    WKAlert,
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    BottomModal,
    ModalButtonProps,
    SlideAnimation,
    ScaleAnimation,
} from "@shufengdong/wanke-bases";
import CalendarList from "./date/components/CalendarList";

export default class App extends Component {

    state = {
        bottomModal: false,
        dates1: [],
        preDays: {},
        selectedDate1: '',
        selectedDate2: '',
        visible: false,
    };


    render() {

        return (
            <View style={{flex: 1}}>


                <Modal animated={true} visible={this.state.visible}>
                    <CalendarList
                        weeksChineseType={true}
                        // containerStyle={{backgroundColor: 'red'}}
                        // scrollContentStyle={{backgroundColor: 'green'}}
                        onRightClick={() => this.setState({visible: false})}
                    />
                </Modal>

                {/*<BottomModal*/}
                {/*    visible={this.state.bottomModal}*/}
                {/*    onTouchOutside={() => {*/}
                {/*        // console.warn(333);*/}
                {/*        this.setState({bottomModal: false});*/}
                {/*    }}*/}
                {/*    onSwipeOut={() => {*/}
                {/*        // console.warn(444);*/}
                {/*        this.setState({bottomModal: false});*/}
                {/*    }}*/}
                {/*    // modalStyle={{  }}*/}
                {/*>*/}
                {/*    <ModalContent*/}
                {/*        style={{*/}
                {/*            backgroundColor: 'fff',*/}
                {/*            paddingHorizontal: 0,*/}
                {/*            // height: '100%',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <CalendarList onRightClick={() => this.setState({bottomModal: false})}/>*/}
                {/*    </ModalContent>*/}
                {/*</BottomModal>*/}

                <View style={{backgroundColor: 'yellow', marginTop: 200}}>
                    <Button
                        title="系统Modal测试日期"
                        onPress={() => {
                            this.setState({visible: true});

                            // this.setState({bottomModal: true});
                        }}
                    />
                </View>
            </View>
        );
    }
}