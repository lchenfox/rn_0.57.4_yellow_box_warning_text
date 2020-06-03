import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import * as Constants from "../contants";
import {listItemStyles} from "../style";

class ListItem extends React.Component {

    _selectDate = date => {
        const {selectDate} = this.props;
        selectDate && typeof selectDate === 'function' && selectDate(date);
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
            selectedDateMarkColor,
            selectedDateMarkRangeColor,
            listItemStyle,
            beyondDatesDisabled,
            beyondDatesDisabledTextColor,
        } = this.props;

        const padding = 12;
        const f1 = (Constants.SCREEN_WIDTH - padding) / 7;
        const f2 = f1.toString();
        const f3 = f2.substring(0, f2.indexOf('.') >= 0 ? (f2.indexOf('.') + 3) : 3);
        const text_width = parseFloat(f3);

        const selectedDateStyle = {};
        const selectedDateRangeStyle = {
            width: text_width,
            marginVertical: 4,
            marginHorizontal: padding / 2,
        };

        const currentDate = `${item.year}-${item.month}-${day}`;

        if (startDate === currentDate || endDate === currentDate) {
            selectedDateStyle.borderRadius = 10;
            selectedDateStyle.backgroundColor = selectedDateMarkColor;
            selectedDateRangeStyle.backgroundColor = selectedDateMarkRangeColor; // all circle
            // selectedDateRangeStyle.backgroundColor = selectedDateMarkColor; // half circle
            if (startDate && endDate) {
                if (endDate === currentDate) {
                    selectedDateRangeStyle.borderTopRightRadius = 10;
                    selectedDateRangeStyle.borderBottomRightRadius = 10;
                }
                if (startDate === currentDate) {
                    selectedDateRangeStyle.borderTopLeftRadius = 10;
                    selectedDateRangeStyle.borderBottomLeftRadius = 10;
                }
            } else {
                // start date & end date here
                selectedDateRangeStyle.borderRadius = 10;
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
                onPress={() => this._selectDate(currentDate)}
                activeOpacity={1}
                style={{width: text_width}}
            >
                <View style={selectedDateRangeStyle}>
                    <View style={selectedDateStyle}>
                        <Text style={[listItemStyles.day, listItemStyle.day || {}, textStyle]}>{day}</Text>
                    </View>
                </View>
            </TouchableOpacity>;
    };

    render() {
        const {item, listItemStyle} = this.props;
        return <View style={[listItemStyles.container, listItemStyle.container || {}]}>
            <View style={[listItemStyles.headerTitleContainer, listItemStyle.headerTitleContainer || {}]}>
                <Text
                    style={[listItemStyles.headerTitle, listItemStyle.headerTitle || {}]}>{this._headerTitle(item)}</Text>
            </View>
            <View style={[listItemStyles.dayContent, listItemStyle.dayContent || {}]}>
                {item.days.map((day, index) => this._renderDays(day, index))}
            </View>
        </View>
    }

}

ListItem.propTypes = {
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
    selectedDateMarkColor: PropTypes.string,
    selectedDateMarkRangeColor: PropTypes.string,
    horizontal: PropTypes.bool,
};

export default ListItem;