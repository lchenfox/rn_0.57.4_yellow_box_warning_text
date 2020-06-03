import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import PropTypes from 'prop-types';
import * as Constants from "../contants";
import WeekBar from "./WeekBar";
import ToolBar from "./ToolBar";
import ListItem from "./ListItem";

class CalendarList extends Component {

    state = {
        dataSource: [],
        startDate: '',
        endDate: '',
    };

    componentDidMount() {
        const {
            minDate,
            maxDate,
            firstDayOnWeeks,
        } = this.props;
        this.setState({
            dataSource: Constants.getDates(minDate, maxDate, firstDayOnWeeks),
        });
    }

    /**
     * Select date call back with date parameter.
     * @param date A date string representing the date selected such as '2020-5-11'.
     */
    _selectDate = date => {
        const {startDate, endDate} = this.state;
        if (startDate && endDate) {
            this.setState({
                startDate: date,
                endDate: '',
            });
            return;
        }
        if (startDate) {
            const isBigger = Constants.compareDatesWith(startDate, date);
            this.setState({
                startDate: isBigger ? date : startDate,
                endDate: isBigger ? startDate : date,
            });
        } else {
            this.setState({startDate: date});
        }
    };

    _renderItem = ({item}) => {
        const {
            minDate,
            maxDate,
            headerTitleType,
            listItemStyle,
            selectedDateMarkColor,
            selectedDateMarkRangeColor,
            beyondDatesDisabled,
            beyondDatesDisabledTextColor,
            horizontal,
        } = this.props;
        return <ListItem
            item={item}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            minDate={minDate.replace(/\//g, '-')}
            maxDate={maxDate.replace(/\//g, '-')}
            selectDate={this._selectDate}
            headerTitleType={headerTitleType}
            listItemStyle={listItemStyle}
            selectedDateMarkColor={selectedDateMarkColor}
            selectedDateMarkRangeColor={selectedDateMarkRangeColor}
            beyondDatesDisabled={beyondDatesDisabled}
            beyondDatesDisabledTextColor={beyondDatesDisabledTextColor}
            horizontal={horizontal}
        />;
    };

    render() {

        const {

            horizontal,
            showsHorizontalScrollIndicator,
            showsVerticalScrollIndicator,
            scrollEnabled,
            pagingEnabled,

            containerStyle,
            scrollContentStyle,

            showToolBar,
            toolBarPosition,
            toolBarStyle,
            toolBarCancelStyle,
            toolBarConfirmStyle,
            cancelText,
            confirmText,
            cancel,
            confirm,
            cancelDisabled,
            confirmDisabled,

            showWeeks,
            weeks,
            weeksChineseType,
            firstDayOnWeeks,
            weeksStyle,
            weeksTextStyle,

        } = this.props;

        const _wks = weeksChineseType && weeks === Constants.DEFAULT_WEEK_EN ? Constants.DEFAULT_WEEK_ZH : weeks;
        const _weeks = Constants.getWeekDays(_wks, firstDayOnWeeks);

        const _toolBar = (<ToolBar
            style={toolBarStyle}
            cancelStyle={toolBarCancelStyle}
            confirmStyle={toolBarConfirmStyle}
            cancelText={cancelText}
            cancel={() => {
                cancel && typeof cancel === 'function' && cancel();
            }}
            confirm={() => {
                const {startDate, endDate} = this.state;
                const dates = [Constants.toStandardDateString(startDate), Constants.toStandardDateString(endDate)];
                confirm && typeof confirm === 'function' && confirm(dates);
            }}
            confirmText={confirmText}
            cancelDisabled={cancelDisabled}
            confirmDisabled={confirmDisabled}
        />);

        return (
            <View style={containerStyle}>
                {showToolBar && toolBarPosition === Constants.DEFAULT_TOOL_BAR_POSITION.TOP && _toolBar}
                {showWeeks && <WeekBar
                    weeks={_weeks}
                    style={weeksStyle}
                    textStyle={weeksTextStyle}
                />}
                <FlatList
                    style={scrollContentStyle}
                    automaticallyAdjustContentInsets={false}
                    ref={ref => this.flatList = ref}
                    keyExtractor={item => `${item.year}-${item.month}`}
                    data={this.state.dataSource}
                    extraData={this.state}
                    horizontal={horizontal}
                    showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
                    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                    scrollEnabled={scrollEnabled}
                    pagingEnabled={pagingEnabled}
                    {...this.props}
                    renderItem={this._renderItem}
                />
                {showToolBar && toolBarPosition === Constants.DEFAULT_TOOL_BAR_POSITION.BOTTOM && _toolBar}
            </View>
        );
    }
}

CalendarList.propTypes = {

    /**
     * Seen as FlatList component.
     */
    horizontal: PropTypes.bool,

    /**
     * Seen as FlatList component.
     */
    showsHorizontalScrollIndicator: PropTypes.bool,

    /**
     * Seen as FlatList component.
     */
    showsVerticalScrollIndicator: PropTypes.bool,

    /**
     * Seen as FlatList component.
     */
    scrollEnabled: PropTypes.bool,

    /**
     * Seen as FlatList component.
     */
    pagingEnabled: PropTypes.bool,

    /**
     * Styles for container, you can set it as any view prop styles such as {backgroundColor: 'red'}
     */
    containerStyle: PropTypes.any,

    /**
     * Styles for scroll list - FlatList, you can set it as any view prop styles such as {backgroundColor: 'red'}
     */
    scrollContentStyle: PropTypes.any,

    /**
     * Whether to show tool bar, default is true. If false, hide tool bar on top.
     */
    showToolBar: PropTypes.bool,

    /**
     * The position of tool bar, default is 'top' that is at the top of screen. So far, just both 'top' and 'bottom'
     * are supported.
     */
    toolBarPosition: PropTypes.string,

    /**
     * tool bar view styles, passed like {backgroundColor: 'red'} as you like.
     */
    toolBarStyle: PropTypes.any,

    /**
     * tool bar cancel button text styles, passed like {color: 'red', fontSize: 15} as you like.
     * Note that you can control the active opacity of the button through {activeOpacity: 1}.
     */
    toolBarCancelStyle: PropTypes.any,

    /**
     * tool bar confirm button text styles, passed like {color: 'red', fontSize: 15} as you like.
     * Note that you can control the active opacity of the button through {activeOpacity: 1}.
     */
    toolBarConfirmStyle: PropTypes.any,

    /**
     * tool bar cancel button text, default is "Cancel".
     */
    cancelText: PropTypes.string,

    /**
     * tool bar confirm button text, default is "Confirm".
     */
    confirmText: PropTypes.string,

    /**
     * tool bar cancel button callback.
     */
    cancel: PropTypes.func,

    /**
     * tool bar confirm button callback with a date array like ["2016-01-09", "2019-09-18"]. "2016-01-09" is the
     * start date(min date) you selected. "2019-09-18" is the end date(max date) you selected. If nothing is selected,
     * the array's elements will be empty string like ["", ""].
     */
    confirm: PropTypes.func,

    /**
     * Whether to disable the cancel button. Default is false.
     */
    cancelDisabled: PropTypes.bool,

    /**
     * Whether to disable the confirm button. Default is false.
     */
    confirmDisabled: PropTypes.bool,

    /**
     * Min date to limit, default is "2015-01-01". Other supported formats: "2015-1-1", "2015/01/01", "2015/1/1".
     */
    minDate: PropTypes.string,

    /**
     * Max date to limit, default is today calculated by new Date(). Other supported formats: "2015-1-1", "2015/01/01", "2015/1/1".
     */
    maxDate: PropTypes.string,

    /**
     * Whether to show weeks, default is true.
     */
    showWeeks: PropTypes.bool,

    /**
     * Week days to show, default is from Sunday to Saturday, namely ['Su','Mo','Tu','We','Th','Fr','Sa'].
     * Note that if you want to custom "weeks", then you have to accomplish "firstDayOnWeeks" at the same time.
     * For example, you passed "['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" to "weeks", you must pass 1 to
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

    /**
     * Display form of the header title. Default is 0. Take "2020-04" date as an example:
     * 0:  "2020-04"
     * 1:  "2020年4月"
     * 2:  "Apr 2020"
     * 3:  "April 2020"
     * 4:  "2020/04"
     * 5:  "04/2020"
     */
    headerTitleType: PropTypes.number,

    /**
     * Content styles containing header title and days content. This is a nesting object style. So if you want to set
     * some specific style such as "headerTitle", you can set it to {headerTitle: {fontSize: 18, color: 'red'}}. Details
     * are as follows:
     {
        container: {
            flex: 1,
        },
        headerTitleContainer: {
            height: 50,
        },
        headerTitle: {
            fontSize: 17,
        },
        dayContent: {
            backgroundColor: 'red',
        },
        day: {
            color: '#3e3e3e',
        },
     };
     */
    listItemStyle: PropTypes.any,

    /**
     * Selected date mark background color for start date and end date. Default is 'magenta'.
     */
    selectedDateMarkColor: PropTypes.string,

    /**
     * Selected date mark background color between start date and end date. Default is 'skyblue'.
     */
    selectedDateMarkRangeColor: PropTypes.string,

    /**
     * When the date is out of minDate or maxDate, whether to disable the button. Default is true.
     */
    beyondDatesDisabled: PropTypes.bool,

    /**
     * When the date is out of minDate or maxDate, the button text color. Default is '#b9b9b9'.
     */
    beyondDatesDisabledTextColor: PropTypes.string,
};

CalendarList.defaultProps = {
    horizontal: false,
    showToolBar: true,
    toolBarPosition: Constants.DEFAULT_TOOL_BAR_POSITION.TOP,
    cancelText: Constants.DEFAULT_CANCEL_TEXT,
    confirmText: Constants.DEFAULT_CONFIRM_TEXT,
    cancel: () => {
    },
    confirm: () => {
    },
    cancelDisabled: false,
    confirmDisabled: false,
    minDate: Constants.DEFAULT_MIN_DATE,
    maxDate: Constants.DEFAULT_MAX_DATE,
    showWeeks: true,
    weeks: Constants.DEFAULT_WEEK_EN,
    weeksChineseType: false,
    firstDayOnWeeks: 0,
    headerTitleType: 0,
    listItemStyle: {},
    selectedDateMarkColor: 'magenta',
    selectedDateMarkRangeColor: 'skyblue',
    beyondDatesDisabled: true,
    beyondDatesDisabledTextColor: '#b9b9b9',
};

export default CalendarList;
