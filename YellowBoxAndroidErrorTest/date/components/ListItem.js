import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import * as Constants from "../contants";
import {listItemStyles} from "../style";
import WeekBar from "./WeekBar";

const PADDING = 12;

class ListItem extends React.Component {

    _selectDate = (date, index) => {
        const {selectDate} = this.props;
        selectDate && typeof selectDate === 'function' && selectDate(date, index);
    };

    _needSelectedRangeBgColor = (startDate, endDate, currentDate) => {
        if (!startDate || !endDate) return false;
        return !!(Constants.compareDatesWith(currentDate, startDate) && Constants.compareDatesWith(endDate, currentDate));
    };

    _headerTitle = item => {
        const {headerTitleType} = this.props;
        const {year, month} = item;
        const _month = month <= 9 ? `0${month}` : month;
        switch (headerTitleType) {
            case 0:
                return `${year}-${_month}`;
            case 1:
                return `${year}年${month}月`;
            case 2:
                return `${Constants.DEFAULT_MONTH_SHORT[month - 1]} ${year}`;
            case 3:
                return `${Constants.DEFAULT_MONTH_LONG[month - 1]} ${year}`;
            case 4:
                return `${year}/${_month}`;
            case 5:
                return `${_month}/${year}`;
            default:
                return `${year}-${month}`;
        }
    };

    _renderDays = (day, index) => {

        const {
            item,
            startDate,
            endDate,
            minDate,
            maxDate,
            selectedDateMarkType,
            selectedDateMarkColor,
            selectedDateMarkRangeColor,
            listItemStyle,
            beyondDatesDisabled,
            beyondDatesDisabledTextColor,
        } = this.props;

        const f1 = (Constants.SCREEN_WIDTH - PADDING) / 7;
        const f2 = f1.toString();
        const f3 = f2.substring(0, f2.indexOf('.') >= 0 ? (f2.indexOf('.') + 3) : 3);
        const text_width = parseFloat(f3);

        const selectedDateStyle = {};
        const selectedDateRangeStyle = {
            width: text_width,
            marginVertical: 4,
        };

        if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.CIRCLE) {
            selectedDateRangeStyle.width = 30;
            selectedDateRangeStyle.height = 30;
            selectedDateRangeStyle.borderRadius = 999;
            selectedDateRangeStyle.justifyContent = 'center';
            selectedDateRangeStyle.alignItems = 'center';
        }

        const currentDate = `${item.year}-${item.month}-${day}`;

        if (startDate === currentDate || endDate === currentDate) {
            selectedDateStyle.borderRadius = 999;
            selectedDateStyle.backgroundColor = selectedDateMarkColor;

            if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.ELLIPSE) {
                selectedDateRangeStyle.backgroundColor = selectedDateMarkRangeColor;
            } else if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.SEMIELLIPSE) {
                selectedDateRangeStyle.backgroundColor = selectedDateMarkColor;
            } else if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.RECTANGLE) {
                selectedDateStyle.borderRadius = 0;
            } else if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.CIRCLE) {
                selectedDateStyle.backgroundColor = 'transparent';
                selectedDateRangeStyle.backgroundColor = selectedDateMarkColor;
            }

            if (startDate && endDate) {
                if (endDate === currentDate) {
                    selectedDateRangeStyle.borderTopRightRadius = 999;
                    selectedDateRangeStyle.borderBottomRightRadius = 999;
                }
                if (startDate === currentDate) {
                    selectedDateRangeStyle.borderTopLeftRadius = 999;
                    selectedDateRangeStyle.borderBottomLeftRadius = 999;
                }
            } else {
                // start date & end date here
                selectedDateRangeStyle.borderRadius = 999;
            }
        }

        if (this._needSelectedRangeBgColor(startDate, endDate, currentDate)) {
            selectedDateRangeStyle.backgroundColor = selectedDateMarkRangeColor;
        }

        const textStyle = {};
        let disabled = false;
        if (Constants.compareDatesWith(minDate, currentDate) || Constants.compareDatesWith(currentDate, maxDate)) {
            textStyle.color = beyondDatesDisabledTextColor;
            disabled = beyondDatesDisabled;
        }

        return day < 0 ? <View key={index} style={{width: text_width}}/> :
            <TouchableOpacity
                key={index}
                disabled={disabled}
                onPress={() => this._selectDate(currentDate, index)}
                activeOpacity={1}
                style={{width: text_width, justifyContent: 'center', alignItems: 'center'}}
            >
                <View style={selectedDateRangeStyle}>
                    <View style={selectedDateStyle}>
                        <Text style={[listItemStyles.day, listItemStyle.day || {}, textStyle]}>{day}</Text>
                    </View>
                </View>
            </TouchableOpacity>;
    };

    render() {
        const {
            item,
            listItemStyle,
            showWeeks,
            horizontal,
            pagingEnabled,
            weeks,
            weeksTextStyle,
            weeksStyle,
            weeksChineseType,
            firstDayOnWeeks,
        } = this.props;
        const _wks = weeksChineseType && weeks === Constants.DEFAULT_WEEK_EN ? Constants.DEFAULT_WEEK_ZH : weeks;
        const _weeks = Constants.getWeekDays(_wks, firstDayOnWeeks);
        return <View style={[listItemStyles.container, listItemStyle.container || {}]}>
            <View style={[listItemStyles.headerTitleContainer, listItemStyle.headerTitleContainer || {}]}>
                <Text
                    style={[listItemStyles.headerTitle, listItemStyle.headerTitle || {}]}>{this._headerTitle(item)}</Text>
            </View>
            {showWeeks && horizontal && !pagingEnabled && <WeekBar
                weeks={_weeks}
                style={weeksStyle}
                textStyle={weeksTextStyle}
            />}
            <View style={[listItemStyles.dayContent, {paddingLeft: PADDING / 2}, listItemStyle.dayContent || {}]}>
                {item.days.map((day, index) => this._renderDays(day, index))}
            </View>
        </View>
    }

}

ListItem.propTypes = {
    showWeeks: PropTypes.bool,
    horizontal: PropTypes.bool,
    pagingEnabled: PropTypes.bool,
    item: PropTypes.object.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    beyondDatesDisabled: PropTypes.bool,
    beyondDatesDisabledTextColor: PropTypes.string,
    selectDate: PropTypes.func,
    headerTitleType: PropTypes.number,
    listItemStyle: PropTypes.object,
    selectedDateMarkType: PropTypes.string,
    selectedDateMarkColor: PropTypes.string,
    selectedDateMarkRangeColor: PropTypes.string,
};

export default ListItem;