import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    Text,
} from 'react-native';
import {CalendarList, DatePicker} from "react-native-common-date-picker";

export default class App extends Component {

    state = {
        visible: false,
        defaultDate: '2010-09-06',
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={{height: 100, backgroundColor: 'gray', marginBottom: 100,}}/>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        visible: true,
                    });
                }}>
                    <Text style={{fontSize: 20, color: 'cyan'}}>Show Calendar</Text>
                </TouchableOpacity>
                <DatePicker
                    // type={'MM-DD-YYYY'}
                    // monthDisplayMode={'en-long'}
                    confirm={date => {
                        console.warn(date)
                    }}
                    yearSuffix={'年'}
                    monthSuffix={'月'}
                    daySuffix={'日'}
                />
                <Modal animationType={'slide'} visible={this.state.visible}>
                    <CalendarList
                        containerStyle={{flex: 1}}
                        weeks={['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']}
                        firstDayOnWeeks={1}
                        cancel={() => this.setState({visible: false})}
                        confirm={data => {
                            this.setState({
                                selectedDate1: data[0],
                                selectedDate2: data[1],
                                visible: false,
                            });
                        }}
                    />
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

