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
import moment from "moment";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * Gets the week day index for a date.
 * @param date A date string such as '2020-05-20' or '2020/05/20' or '2020-5-20'.
 * @returns {number} Returns the day index of a date representing the week day from 0 to 6, 0 is Sunday, 1 is Monday, etc.
 */
function getWeekDay(date: string): number {
    const weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    // const _date = new Date(Date.parse(date.replace(/-/g, '/')));
    const _date = new Date(Date.parse(date.replace(/-/g, '/')));
    return _date.getDay(); // 0 to 6
}

/**
 * Gets how many days in a month.
 * @param year A numeric value equal to the year
 * @param month A numeric value equal to the month. The value for January is 1, and other month values follow consecutively.
 * @returns {number} Returns the days in a month like 28, 31 and the like.
 */
function getDaysInMonth(year: number, month: number): number {
    // month: start with 1 to 12
    return new Date(year, month, 0).getDate();
}

const a = '2010-5-02';
const b = '2020-5-28';

export default class App extends Component {

    state = {
        customBackgroundModal: false,
        defaultAnimationModal: false,
        swipeableModal: false,
        scaleAnimationModal: false,
        slideAnimationModal: false,
        bottomModalAndTitle: false,
        bottomModal: false,
        dates1: [],
        preDays: {},
        selectedDate1: '',
        selectedDate2: '',
        visible: false,
    };

    componentDidMount() {
        const today = new Date().getFullYear();
        const preDays = {};
        for (let i = 1980; i <= today; i++) {
            for (let j = 1; j <= 12; j++) {
                preDays[`${i}-${j}-1`] = getWeekDay(`${i}-${j}-1`);
                preDays[`${i}-${j}`] = getDaysInMonth(i, j);
            }
        }
        this.state.preDays = preDays;
        this.state.dates1 = this._diffMonths1(a, b);
    }

    _forEach = (year, i, j) => {
        const dates = [];
        for (let month = i; month <= j; month++) {
            const obj = {year};
            obj.month = month;

            const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
            // const days = [1, 2, 3, 4, 5, 6];
            let weekDay = -1;
            let maxDayInMonth = -1;
            if (this.state.preDays && typeof this.state.preDays === 'object' && this.state.preDays.hasOwnProperty(`${year}-${month}-1`) && this.state.preDays.hasOwnProperty(`${year}-${month}`)) {
                weekDay = this.state.preDays[`${year}-${month}-1`];
                maxDayInMonth = this.state.preDays[`${year}-${month}`];
            } else {
                weekDay = getWeekDay(`${year}-${month}-1`);
                maxDayInMonth = getDaysInMonth(year, month);
            }

            for (let wd = 0; wd < weekDay; wd++) {
                days.unshift(-(wd + 1));
            }

            for (let day = 28; day <= maxDayInMonth; day++) {
                days.push(day);
            }
            obj.days = days;
            dates.push(obj);
        }
        return dates;
    };

    _diffMonths1 = (start, end) => {
        const startArr = start.split('-');
        const endArr = end.split('-');
        const startYear = +startArr[0];
        const endYear = +endArr[0];
        const startMonth = +startArr[1];
        const endMonth = +endArr[1];
        let dates = [];
        for (let year = startYear; year <= endYear; year++) {
            if (startYear === endYear) {
                dates = dates.concat(this._forEach(year, startMonth, endMonth));
            } else if (year === startYear) {
                dates = dates.concat(this._forEach(year, startMonth, 12));
            } else if (year === endYear) {
                dates = dates.concat(this._forEach(year, 1, endMonth));
            } else {
                dates = dates.concat(this._forEach(year, 1, 12));
            }
        }
        return dates;
    };

    /**
     low performance: Date.parse(selectedDate1.replace(/-/g, '/')) < Date.parse(_d.replace(/-/g, '/'))
     so use the following function to compare two dates
     if date > another return true, else false
     */
    _isMoreThan = (date, another) => {
        if (!date || typeof date !== 'string' || !another || typeof date !== 'string') return false;
        const dateArr = date.split('-');
        const anotherArr = another.split('-');

        // year1 > year2
        if (parseInt(dateArr[0]) > parseInt(anotherArr[0])) return true;

        // year1 = year2
        if (parseInt(dateArr[0]) === parseInt(anotherArr[0])) {
            // month1 > month2
            if (parseInt(dateArr[1]) > parseInt(anotherArr[1])) return true;
            // month1 = month2
            if (parseInt(dateArr[1]) === parseInt(anotherArr[1])) {
                // day1 > day2
                return parseInt(dateArr[2]) > parseInt(anotherArr[2]);
            }
        }

        // year1 < year2
        return false;
    };

    _hasSelectedTextBackgroundColor = (selectedDate1, selectedDate2, currentDate) => {
        if (!selectedDate1 || !selectedDate2) return false;
        return !!(this._isMoreThan(currentDate, selectedDate1) && this._isMoreThan(selectedDate2, currentDate));
    };

    render() {

        const weeks = [
            '日',
            '一',
            '二',
            '三',
            '四',
            '五',
            '六',
        ];

        const weeks_en = [
            'Su',
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sa',
        ];

        const f1 = SCREEN_WIDTH / 7;
        const f2 = f1.toString();
        const f3 = f2.substring(0, f2.indexOf('.') >= 0 ? (f2.indexOf('.') + 3) : 3);
        // const text_width = parseInt(SCREEN_WIDTH / 7);
        const text_width = parseFloat(f3);
        // console.warn(text_width)
        return (
            <View style={{flex: 1}}>

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
                            // height: '100%',
                        }}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            {weeks.map((week, index) => <Text key={index} style={{
                                fontSize: 16,
                                color: '#3e3e3e'
                            }}>{week}</Text>)}
                        </View>
                        {
                            <FlatList
                                // getItemCount={}
                                windowSize={21}
                                // getItemLayout={(data, index) => ({
                                //     length: SCREEN_WIDTH,
                                //     offset: SCREEN_WIDTH * index,
                                //     index
                                // })}
                                getItemLayout={(data, index) => ({
                                    length: 250,
                                    offset: 250 * index,
                                    index
                                })}
                                ref={ref => this.flatList = ref}
                                keyExtractor={item => `${item.year}-${item.month}`}
                                data={this.state.dates1}
                                // getItem={}
                                maxToRenderPerBatch={10}
                                updateCellsBatchingPeriod={35}
                                disableVirtualization={false}
                                horizontal={false}
                                pagingEnabled={false}
                                scrollEnabled={true}
                                removeClippedSubviews={false}
                                extraData={this.state}
                                initialNumToRender={5}
                                // legacyImplementation={true}
                                // inverted={true}
                                // initialScrollIndex={this.state.dates1.length - 1}
                                renderItem={({item, index}) => {

                                    return <View style={{width: Dimensions.get('window').width, height: 250}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableOpacity onPress={() => {
                                                console.warn('left: scroll to index');
                                                if (index === 0) return;
                                                this.flatList.scrollToIndex({index: index - 1});
                                            }}>
                                                <Text
                                                    style={{height: 50}}>({item.year + '-' + item.month})Left</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                console.warn(index)
                                                if (index === this.state.dates1.length - 1) return;
                                                this.flatList.scrollToIndex({index: index + 1});
                                            }}>
                                                <Text
                                                    style={{height: 50}}>({item.year + '-' + item.month})Right</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{flexDirection: 'row', flexWrap: 1}}>
                                            {item.days.map((day, index) => {
                                                const _d = `${item.year}-${item.month}-${day}`;
                                                const {selectedDate1, selectedDate2} = this.state;
                                                let textBgColor = 'transparent';

                                                if (selectedDate1 === _d || selectedDate2 === _d) {
                                                    textBgColor = 'orange';
                                                }

                                                if (this._hasSelectedTextBackgroundColor(selectedDate1, selectedDate2, _d)) {
                                                    textBgColor = 'yellow';
                                                }

                                                return day < 0 ? <View key={index} style={{width: text_width}}/> :
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => {
                                                            if (selectedDate1 && selectedDate2) {
                                                                this.setState({
                                                                    selectedDate1: _d,
                                                                    selectedDate2: null,
                                                                });
                                                            } else {
                                                                if (selectedDate1) {
                                                                    const isBigger = this._isMoreThan(selectedDate1, _d);
                                                                    this.setState({
                                                                        selectedDate1: isBigger ? _d : selectedDate1,
                                                                        selectedDate2: isBigger ? selectedDate1 : _d,
                                                                    });
                                                                } else {
                                                                    this.setState({selectedDate1: _d});
                                                                }
                                                            }
                                                        }}
                                                        style={{
                                                            width: text_width,
                                                            // backgroundColor: index % 2 ? 'blue' : 'orange',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <View style={{
                                                            // borderTopWidth: 1,
                                                            // borderTopColor: textBgColor,
                                                            // borderTopStyle: 'dotted',
                                                            // borderBottomColor: textBgColor,
                                                            // borderBottomStyle: 'dotted',
                                                            // borderBottomWidth: 1,
                                                            backgroundColor: textBgColor === 'orange' ? 'yellow' : textBgColor,
                                                            borderTopRightRadius: selectedDate1 && selectedDate2 ? (selectedDate1 === _d ? 0 : ((selectedDate2 === _d) ? 10 : 0)) : 10,
                                                            borderBottomRightRadius: selectedDate1 && selectedDate2 ? (selectedDate1 === _d ? 0 : ((selectedDate2 === _d) ? 10 : 0)) : 10,
                                                            borderTopLeftRadius: selectedDate1 && selectedDate2 ? (selectedDate2 === _d ? 0 : ((selectedDate1 === _d) ? 10 : 0)) : 10,
                                                            borderBottomLeftRadius: selectedDate1 && selectedDate2 ? (selectedDate2 === _d ? 0 : ((selectedDate1 === _d) ? 10 : 0)) : 10,
                                                            width: (index + 1) % 7 === 0 ? text_width - 5 : (index % 7 === 0 ? text_width - 5 : text_width),
                                                            marginRight: (index + 1) % 7 === 0 ? 5 : 0,
                                                            marginLeft: index % 7 === 0 ? 5 : 0,

                                                            // borderWidth: 1,
                                                            // borderColor: textBgColor,
                                                            // borderStyle: 'dotted',
                                                            // borderLeftWidth: index % 7 === 0 ? 1 : 0,
                                                            // borderLeftColor: textBgColor,
                                                            // borderLeftStyle: 'dotted',
                                                            // borderRightWidth: (index + 1) % 7 === 0 ? 1 : 0,
                                                            // borderRightColor: textBgColor,
                                                            // borderRightStyle: 'dotted',
                                                            // justifyContent: 'center',
                                                            marginVertical: 4,
                                                            // backgroundColor: index % 2 ? 'red' : 'green',
                                                        }}>
                                                            <View style={{
                                                                borderRadius: textBgColor === 'orange' ? 10 : 0,
                                                                backgroundColor: textBgColor === 'orange' ? 'orange' : 'transparent'
                                                            }}>
                                                                <Text style={{

                                                                    // backgroundColor: index % 2 ? 'red' : 'green',
                                                                    // backgroundColor: textBgColor,
                                                                    textAlign: 'center',
                                                                    paddingVertical: 3,
                                                                    color: '#3e3e3e',
                                                                    // backgroundColor: textBgColor === 'red' ? 'orange' : 'transparent',
                                                                }}>{day}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                            })}
                                        </View>
                                    </View>
                                }}
                            />
                        }
                    </ModalContent>
                </BottomModal>

                <View style={{backgroundColor: 'yellow', marginTop: 200}}>
                    <Button
                        title="系统Modal测试日期"
                        onPress={() => {
                            this.setState({bottomModal: true});
                        }}
                    />
                </View>

            </View>
        );
    }
}