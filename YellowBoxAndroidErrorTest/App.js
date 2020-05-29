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

const a = '1980-5-02';
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
    _compare = (date, another) => {
        const dateArr = date.split('-');
        const anotherArr = another.split('-');
        if (parseInt(dateArr[0]) > parseInt(anotherArr[0])) return true;
        if (parseInt(dateArr[0]) === parseInt(anotherArr[0])) {
            if (parseInt(dateArr[1]) > parseInt(anotherArr[1])) return true;
            if (parseInt(dateArr[1]) === parseInt(anotherArr[1])) {
                return parseInt(dateArr[2]) > parseInt(anotherArr[2]);
            }
        }
        return false;
    };

    _hasSelectedTextBackgroundColor = (selectedDate1, selectedDate2, currentDate) => {
        /**
         * 文本边框有圆角、选中虚线
         */

        const selDate1 = this._compare(selectedDate1, selectedDate2) ? selectedDate2 : selectedDate1;
        const selDate2 = this._compare(selectedDate1, selectedDate2) ? selectedDate1 : selectedDate2;
        return !!(selDate1
            && selDate2
            // && _d.indexOf('--') < 0 // Filter invalid value like '2020-05--1'
            && this._compare(currentDate, selDate1)
            && this._compare(selDate2, currentDate));

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
                <View style={styles.container}>

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
                                    // maxToRenderPerBatch={}
                                    // initialNumToRender={}
                                    // windowSize={}
                                    // getItemCount={}
                                    getItemLayout={(data, index) => ({
                                        length: SCREEN_WIDTH,
                                        offset: SCREEN_WIDTH * index,
                                        index
                                    })}
                                    ref={ref => this.flatList = ref}
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.dates1}
                                    // getItem={}
                                    // updateCellsBatchingPeriod={}
                                    // disableVirtualization={}
                                    horizontal={true}
                                    pagingEnabled={true}
                                    scrollEnabled={false}
                                    // initialScrollIndex={this.state.dates1.length - 1}
                                    renderItem={({item, index}) => {
                                        return <View style={{width: Dimensions.get('window').width}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <TouchableOpacity onPress={() => {
                                                    if (index === 0) return;
                                                    this.flatList.scrollToIndex({index: index - 1});
                                                }}>
                                                    <Text
                                                        style={{height: 50}}>({item.year + '-' + item.month})Left</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
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
                                                    // if (selectedDate1 === _d || selectedDate2 === _d) {
                                                    //     textBgColor = 'red';
                                                    // }

                                                    if (this._hasSelectedTextBackgroundColor(selectedDate1, selectedDate2, _d)) {
                                                        textBgColor = 'green';
                                                    }

                                                    return day < 0 ? <View key={index} style={{width: text_width}}/> :
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => {
                                                                if (selectedDate1) {
                                                                    // console.warn(123)
                                                                    this.setState({selectedDate2: `${item.year}-${item.month}-${day}`});
                                                                } else {
                                                                    // console.warn(456)
                                                                    this.setState({selectedDate1: `${item.year}-${item.month}-${day}`});
                                                                }
                                                                // console.warn('select date: ' + _d);
                                                            }}
                                                            style={{
                                                                width: text_width,
                                                                // backgroundColor: index % 2 ? 'blue' : 'orange',
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <View style={{
                                                                borderTopWidth: 1,
                                                                borderTopColor: textBgColor,
                                                                borderTopStyle: 'dotted',
                                                                borderBottomColor: textBgColor,
                                                                borderBottomStyle: 'dotted',
                                                                borderBottomWidth: 1,
                                                                backgroundColor: selectedDate1 === _d || selectedDate2 === _d ? 'red' : null,
                                                                width: (index + 1) % 7 === 0 ? text_width - 5 : (index % 7 === 0 ? text_width - 5 : text_width),
                                                                marginRight: (index + 1) % 7 === 0 ? 5 : 0,
                                                                marginLeft: index % 7 === 0 ? 5 : 0,
                                                                // borderWidth: 1,
                                                                // borderColor: textBgColor,
                                                                // borderStyle: 'dotted',
                                                                borderLeftWidth: index % 7 === 0 ? 1 : 0,
                                                                borderLeftColor: textBgColor,
                                                                borderLeftStyle: 'dotted',
                                                                borderRightWidth: (index + 1) % 7 === 0 ? 1 : 0,
                                                                borderRightColor: textBgColor,
                                                                borderRightStyle: 'dotted',
                                                                // borderRadius: 1,
                                                                // justifyContent: 'center',
                                                                marginVertical: 4,
                                                                // backgroundColor: index % 2 ? 'red' : 'green',
                                                            }}>
                                                                <Text style={{

                                                                    // backgroundColor: index % 2 ? 'red' : 'green',
                                                                    // backgroundColor: textBgColor,
                                                                    textAlign: 'center',
                                                                    paddingVertical: 3,
                                                                    color: '#3e3e3e'
                                                                }}>{day}</Text>
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

                    <Button
                        title="系统Modal测试日期"
                        onPress={() => {
                            this.setState({visible: true})
                        }}
                    />

                    <Button
                        title="Bottom Modal without Title 嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻1"
                        onPress={() => {
                            const startDate = new Date();
                            console.warn('begin: ' + startDate);
                            const dates1 = this._diffMonths1(a, b);
                            const endDate = new Date();
                            console.warn('end: ' + endDate);
                            console.warn('end - start: ' + (endDate - startDate));
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
                    defaultCallback={() => {
                    }}
                    okCallback={() => {
                    }}
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
                    modalAnimation={new SlideAnimation({slideFrom: 'right'})}
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
            </View>
        );
    }
}