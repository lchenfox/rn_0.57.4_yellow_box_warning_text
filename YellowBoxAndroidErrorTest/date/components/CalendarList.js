import React, {Component} from 'react';
import {
    Dimensions,
    FlatList,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Constants from "../contants";
import WeekBar from "./WeekBar";
import NavigationBar from "./NavigationBar";
import {getWeekDays} from "../contants";

class CalendarList extends Component {

    state = {
        dates1: [],
        selectedDate1: '',
        selectedDate2: '',
    };

    componentDidMount() {
        const {
            minDate,
            maxDate,
            firstDayOnWeeks,
        } = this.props;
        this.setState({
            dates1: Constants.getDates(minDate, maxDate, firstDayOnWeeks),
        });
    }

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

        const {

            containerStyle,
            scrollContentStyle,

            showNavigationBar,
            navigationBarStyle,
            navigationBarCancelStyle,
            navigationBarConfirmStyle,
            cancelText,
            confirmText,
            cancel,
            confirm,

            showWeeks,
            weeks,
            weeksChineseType,
            firstDayOnWeeks,
            weeksStyle,
            weeksTextStyle,

        } = this.props;

        const f1 = Constants.SCREEN_WIDTH / 7;
        const f2 = f1.toString();
        const f3 = f2.substring(0, f2.indexOf('.') >= 0 ? (f2.indexOf('.') + 3) : 3);
        const text_width = parseFloat(f3);

        const _wks = weeksChineseType && weeks === Constants.DEFAULT_WEEK_EN ? Constants.DEFAULT_WEEK_ZH : weeks;
        const _weeks = getWeekDays(_wks, firstDayOnWeeks);

        return (
            <View style={[{flex: 1}, containerStyle]}>
                {showNavigationBar && <NavigationBar
                    style={navigationBarStyle}
                    cancelStyle={navigationBarCancelStyle}
                    confirmStyle={navigationBarConfirmStyle}
                    cancelText={cancelText}
                    cancel={cancel}
                    confirm={confirm}
                    confirmText={confirmText}
                />}
                {showWeeks && <WeekBar
                    weeks={_weeks}
                    style={weeksStyle}
                    textStyle={weeksTextStyle}
                />}
                <FlatList
                    style={[{flex: 1}, scrollContentStyle]}
                    automaticallyAdjustContentInsets={false}
                    ref={ref => this.flatList = ref}
                    keyExtractor={item => `${item.year}-${item.month}`}
                    data={this.state.dates1}
                    extraData={this.state}
                    renderItem={({item, index}) => {
                        // return <Text style={{fontSize: 30, color: 'red'}}>Hello, world!</Text>
                        // console.warn('render item');
                        return <View style={{width: Dimensions.get('window').width}}>
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
                                    this.props.onRightClick();
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
                                            activeOpacity={1}
                                            style={{width: text_width}}
                                        >
                                            <View style={{
                                                backgroundColor: textBgColor === 'orange' ? 'yellow' : textBgColor,
                                                borderTopRightRadius: selectedDate1 && selectedDate2 ? (selectedDate1 === _d ? 0 : ((selectedDate2 === _d) ? 10 : 0)) : 10,
                                                borderBottomRightRadius: selectedDate1 && selectedDate2 ? (selectedDate1 === _d ? 0 : ((selectedDate2 === _d) ? 10 : 0)) : 10,
                                                borderTopLeftRadius: selectedDate1 && selectedDate2 ? (selectedDate2 === _d ? 0 : ((selectedDate1 === _d) ? 10 : 0)) : 10,
                                                borderBottomLeftRadius: selectedDate1 && selectedDate2 ? (selectedDate2 === _d ? 0 : ((selectedDate1 === _d) ? 10 : 0)) : 10,
                                                width: (index + 1) % 7 === 0 ? text_width - 5 : (index % 7 === 0 ? text_width - 5 : text_width),
                                                marginRight: (index + 1) % 7 === 0 ? 5 : 0,
                                                marginLeft: index % 7 === 0 ? 5 : 0,
                                                marginVertical: 4,
                                            }}>
                                                <View style={{
                                                    borderRadius: textBgColor === 'orange' ? 10 : 0,
                                                    backgroundColor: textBgColor === 'orange' ? 'orange' : 'transparent'
                                                }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        paddingVertical: 3,
                                                        color: '#3e3e3e',
                                                    }}>{day}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                })}
                            </View>
                        </View>
                    }}
                />
            </View>
        );
    }
}

CalendarList.propTypes = {

    /**
     * Styles for container, you can set it as any view prop styles such as {backgroundColor: 'red'}
     */
    containerStyle: PropTypes.any,

    /**
     * Styles for scroll list - FlatList, you can set it as any view prop styles such as {backgroundColor: 'red'}
     */
    scrollContentStyle: PropTypes.any,

    /**
     * Whether to show navigation bar, default is true. If false, hide navigation bar on top.
     */
    showNavigationBar: PropTypes.bool,

    /**
     * navigation bar view styles, passed like {backgroundColor: 'red'} as you like.
     */
    navigationBarStyle: PropTypes.any,

    /**
     * navigation bar cancel button text styles, passed like {color: 'red', fontSize: 15} as you like.
     */
    navigationBarCancelStyle: PropTypes.any,

    /**
     * navigation bar confirm button text styles, passed like {color: 'red', fontSize: 15} as you like.
     */
    navigationBarConfirmStyle: PropTypes.any,

    /**
     * navigation bar cancel button text, default is "Cancel".
     */
    cancelText: PropTypes.string,

    /**
     * navigation bar confirm button text, default is "Confirm".
     */
    confirmText: PropTypes.string,

    /**
     * navigation bar cancel button callback.
     */
    cancel: PropTypes.func,

    /**
     * navigation bar confirm button callback.
     */
    confirm: PropTypes.func,


    /**
     * Min date to limit, default is "2015-01-01".
     */
    minDate: PropTypes.string,

    /**
     * Max date to limit, default is today calculated by new Date().
     */
    maxDate: PropTypes.string,

    /**
     * Whether to show weeks, default is true.
     */
    showWeeks: PropTypes.bool,

    /**
     * Week days to show, default is from Sunday to Saturday, namely ['Su','Mo','Tu','We','Th','Fr','Sa'].
     * Note that if you want to custom "weeks", then you have to accomplish "firstDayOnWeeks" at the same time.
     * For example, you passed "['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" to "weeks", you also need to pass 1 to
     * "firstDayOnWeeks" equal to "firstDayOnWeeks={1}". What's more, 1 means Monday, 2 means Tuesday, ..., 0 Means Sunday.
     */
    weeks: PropTypes.array,

    /**
     * Weeks type. Default is false, namely ['Su','Mo','Tu','We','Th','Fr','Sa']. If you want to use chinese, such as
     * ['日','一','二','三','四','五','六'], just setting "weeksChineseType={true}" is okay. But the precondition is that
     * "weeks" above uses the default value. Or it will be invalid.
     */
    weeksChineseType: PropTypes.bool,

    /**
     * The first day for weeks. Default is 0 equal to Sunday. If you'd like to start with Saturday, "firstDayOnWeeks={6}"
     * will work. The value ranges from 0 to 6.
     */
    firstDayOnWeeks: PropTypes.number,

    /**
     * For week days, set the container styles like {backgroundColor: 'red'}
     */
    weeksStyle: PropTypes.any,

    /**
     * For week days, set the week day text styles like {color: 'blue', fontSize: 14}
     */
    weeksTextStyle: PropTypes.any,
};

CalendarList.defaultProps = {
    showNavigationBar: true,
    cancelText: Constants.DEFAULT_CANCEL_TEXT,
    confirmText: Constants.DEFAULT_CONFIRM_TEXT,
    cancel: () => {
    },
    confirm: () => {
    },
    minDate: Constants.DEFAULT_MIN_DATE,
    maxDate: Constants.DEFAULT_MAX_DATE,
    showWeeks: true,
    weeks: Constants.DEFAULT_WEEK_EN,
    weeksChineseType: false,
    firstDayOnWeeks: 0,
};

export default CalendarList;
