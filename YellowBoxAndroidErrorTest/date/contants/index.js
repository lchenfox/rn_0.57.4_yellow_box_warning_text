import {Dimensions} from 'react-native';
import {getWeekDay, getDaysInMonth, getToday} from '../utils/dateFormat';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export const DEFAULT_MIN_DATE = '2015-01-01';
export const DEFAULT_MAX_DATE = getToday();
export const DEFAULT_CANCEL_TEXT = 'Cancel';
export const DEFAULT_CONFIRM_TEXT = 'Confirm';

export const DEFAULT_WEEK_ZH = [
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
];

export const DEFAULT_WEEK_EN = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
];

export function getWeekDays(weeks: [string], firstDay: number): [string] {
    let _weeks = [];
    // Use default week
    if (weeks === DEFAULT_WEEK_EN || weeks === DEFAULT_WEEK_ZH) {
        const temWeeks = weeks === DEFAULT_WEEK_EN ? DEFAULT_WEEK_EN : DEFAULT_WEEK_ZH;
        const _pre = [];
        const _later = [];
        temWeeks.forEach((day, index) => {
            if (index < firstDay) {
                _later.push(day);
            } else {
                _pre.push(day);
            }
        });
        _weeks = _pre.concat(_later);
    } else {
        _weeks = weeks;
    }
    return _weeks;
}

/**
 * Construct dates according to given two dates
 * @param startDate A string date like '2019-05-20'
 * @param endDate A string date like '2020-06-02'
 * @param firstDay
 * @returns {[]} Return a date array consists of year, month and day such as [{year: 2019, month: 1, days: [1, 2, 3, ...]}, {year: 2019, month: 2, days: [1, 2, 3, ...]}, {year: 2020, month: 6, days: [1, 2, 3, ...]}]
 */
export function getDates(startDate: string, endDate: string, firstDay: number) {
    const startArr = startDate.split('-');
    const endArr = endDate.split('-');
    const startYear = +startArr[0];
    const endYear = +endArr[0];
    const startMonth = +startArr[1];
    const endMonth = +endArr[1];
    let dates = [];
    for (let year = startYear; year <= endYear; year++) {
        if (startYear === endYear) {
            dates = dates.concat(constructDates(year, startMonth, endMonth, firstDay));
        } else if (year === startYear) {
            dates = dates.concat(constructDates(year, startMonth, 12, firstDay));
        } else if (year === endYear) {
            dates = dates.concat(constructDates(year, 1, endMonth, firstDay));
        } else {
            dates = dates.concat(constructDates(year, 1, 12, firstDay));
        }
    }
    return dates;
}

/**
 * Returns a date array containing all dates via year, month and day
 * @param year A numeric value equal to the year
 * @param startMonth A numeric value equal to the month from 1 to 12
 * @param endMonth A numeric value equal to the month from 1 to 12
 * @param firstDay
 * @returns {[]}
 */
function constructDates(year: number, startMonth: number, endMonth: number, firstDay: number) {
    const dates = [];
    for (let month = startMonth; month <= endMonth; month++) {
        const obj = {year};
        obj.month = month;

        const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
        let weekDay = -1;
        let maxDayInMonth = -1;

        weekDay = getWeekDay(`${year}-${month <= 9 ? '0' : ''}${month}-01`) - firstDay;
        if (weekDay < 0) {
            weekDay = weekDay + 7;
        }
        maxDayInMonth = getDaysInMonth(year, month);

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
}