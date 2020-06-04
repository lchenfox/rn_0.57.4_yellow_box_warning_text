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
        selectedDate1: '',
        selectedDate2: '',
        visible: false,
    };

    render() {

        return (
            <View style={{flex: 1}}>

                <Modal animated={true} visible={this.state.visible}>
                    <View style={{height: 44}}/>
                    <CalendarList
                        weeksChineseType={true}
                        // containerStyle={{backgroundColor: 'red'}}
                        // scrollContentStyle={{backgroundColor: 'green'}}
                        cancel={() => this.setState({visible: false})}
                        headerTitleType={2}
                        listItemStyle={{headerTitle: {color: 'red'}}}
                        confirm={data => {
                            console.warn(data)
                            this.setState({
                                selectedDate1: data[0],
                                selectedDate2: data[1],
                                visible: false,
                            });
                        }}
                        containerStyle={{flex: 1}}
                        minDate={'2018-5-23'}
                        // horizontal={true}
                    >
                        <View style={{height: 73, backgroundColor: 'gray'}}/>
                    </CalendarList>
                </Modal>

                <BottomModal
                    visible={this.state.bottomModal}
                    onTouchOutside={() => {
                        // console.warn(333);
                        this.setState({bottomModal: false});
                    }}
                    onSwipeOut={() => {
                        // console.warn(444);
                        this.setState({bottomModal: false});
                    }}
                    // modalStyle={{  }}
                >
                    <ModalContent
                        style={{
                            backgroundColor: 'fff',
                            paddingHorizontal: 0,
                            paddingVertical: 12,
                            paddingBottom: 24,
                            // height: 300,
                            // height: '100%',
                        }}
                    >
                        <CalendarList
                            ref={ref => this.dateRef = ref}
                            weeksChineseType={true}
                            // containerStyle={{backgroundColor: 'red'}}
                            // scrollContentStyle={{backgroundColor: 'green'}}
                            cancel={() => {
                                this.dateRef.scrollToIndex({index: 3})
                                return;
                                this.setState({bottomModal: false});
                            }}
                            headerTitleType={2}
                            listItemStyle={{headerTitle: {color: 'red'}}}
                            // selectedDateMarkType={'rectangle'}
                            selectedDateMarkColor={'green'}
                            confirm={data => {
                                console.warn(data)
                                this.setState({
                                    selectedDate1: data[0],
                                    selectedDate2: data[1],
                                    visible: false,
                                });
                            }}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            // scrollContentStyle={{backgroundColor: 'red'}}
                            minDate={'2018-5-23'}
                            horizontal={true}
                            toolBarPosition={'bottom'}
                        >
                            <View style={{height: 73, backgroundColor: 'gray'}}/>
                        </CalendarList>
                    </ModalContent>
                </BottomModal>

                <View style={{marginTop: 200}}>
                    <Text style={{color: 'red', fontSize: 18, padding: 15}}>start date: {this.state.selectedDate1}</Text>
                    <Text style={{color: 'green', fontSize: 18, padding: 15}}>end date: {this.state.selectedDate2}</Text>
                    <Button
                        title="系统Modal测试日期"
                        onPress={() => {
                            // this.setState({visible: true});
                            this.setState({bottomModal: true});
                        }}
                    />
                </View>
            </View>
        );
    }
}