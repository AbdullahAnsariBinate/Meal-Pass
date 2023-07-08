"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayWrapper = exports.DayPage = exports.DayItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _dateFns = require("date-fns");

var _context = require("./context");

var _DayLabels = require("./DayLabels");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// The calendar renders a lot of Days, so we wrap them in order to
// prevent context updates from re-rendering everything
const DayWrapper = /*#__PURE__*/_react.default.memo(({
  date,
  isInDisplayedMonth,
  dateFormatted
}) => {
  const dateRef = (0, _react.useRef)(date);
  const memoDate = (0, _react.useMemo)(() => {
    if ((0, _dateFns.isSameDay)(dateRef.current, date)) {
      return dateRef.current;
    } else {
      dateRef.current = date;
      return date;
    }
  }, [date]);
  const {
    selectedDate,
    onDateSelect,
    DayComponent,
    theme
  } = (0, _context.useCalendarContext)();
  const isSelected = (0, _react.useMemo)(() => {
    return !!selectedDate && (0, _dateFns.isSameDay)(memoDate, selectedDate);
  }, [memoDate, selectedDate]);
  const isToday = (0, _react.useMemo)(() => (0, _dateFns.isSameDay)(memoDate, new Date()), [memoDate]);
  const onDateSelectRef = (0, _react.useRef)(onDateSelect);
  onDateSelectRef.current = onDateSelect;
  const onDateSelectCb = (0, _react.useCallback)((date, options) => {
    var _onDateSelectRef$curr;

    return (_onDateSelectRef$curr = onDateSelectRef.current) === null || _onDateSelectRef$curr === void 0 ? void 0 : _onDateSelectRef$curr.call(onDateSelectRef, date, options);
  }, []);
  return /*#__PURE__*/_react.default.createElement(DayItem, {
    date: memoDate,
    dateFormatted: dateFormatted,
    isSelected: isSelected,
    isToday: isToday,
    isInDisplayedMonth: isInDisplayedMonth,
    DayComponent: DayComponent,
    onDateSelect: onDateSelectCb,
    theme: theme
  });
});

exports.DayWrapper = DayWrapper;

const DayItem = /*#__PURE__*/_react.default.memo(({
  date,
  isInDisplayedMonth,
  isSelected,
  DayComponent,
  isToday,
  onDateSelect,
  theme,
  dateFormatted
}) => {
  const dayText = (0, _dateFns.format)(date, "d");
  const deselectedColor = isInDisplayedMonth ? theme.dayFontColor : theme.dayInactiveFontColor;
  const color = isSelected ? theme.daySelectedFontColor : deselectedColor;

  if (DayComponent) {
    return /*#__PURE__*/_react.default.createElement(DayComponent, {
      date: date,
      isInDisplayedMonth: isInDisplayedMonth,
      isSelected: isSelected,
      isToday: isToday
    });
  }

  const padding = 10;
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: `react-native-swipe-calendar:${dateFormatted}${isInDisplayedMonth ? "" : ":isInDisplayedMonth:false"}`,
    onPress: () => onDateSelect === null || onDateSelect === void 0 ? void 0 : onDateSelect(date, {
      isSelected
    }),
    style: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      padding
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 0,
      aspectRatio: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      backgroundColor: isSelected ? theme.selectedDayBackgroundColor : "transparent",
      borderRadius: 5
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color,
      fontSize: theme.dayFontSize,
      fontFamily: theme.dayFontFamily
    }
  }, dayText), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      position: "absolute",
      width: 5,
      height: 5,
      bottom: padding / 2,
      borderRadius: 5,
      backgroundColor: isToday ? theme.todayIndicatorDotColor : "transparent"
    }
  }));
});

exports.DayItem = DayItem;

const DayPage = /*#__PURE__*/_react.default.memo(({
  index
}) => {
  const {
    referenceDate,
    HeaderComponent,
    theme
  } = (0, _context.useCalendarContext)();
  const dayOffset = (0, _react.useMemo)(() => (0, _dateFns.addDays)(referenceDate, index), [referenceDate, index]);
  const firstDayOfMonth = (0, _react.useMemo)(() => new Date(dayOffset), [dayOffset]);
  firstDayOfMonth.setDate(1);
  const dayDateFormatted = (0, _dateFns.format)(dayOffset, "yyyy-MM-dd");
  const headerText = (0, _dateFns.format)(dayOffset, theme.headerDateFormat);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, HeaderComponent ? /*#__PURE__*/_react.default.createElement(HeaderComponent, {
    startDate: dayOffset,
    endDate: dayOffset
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: theme.headerFontSize,
      fontFamily: theme.headerFontFamily,
      color: theme.headerFontColor,
      textTransform: theme.headerTextTransform
    }
  }, headerText)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_DayLabels.DayLabel, {
    day: dayOffset
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(DayWrapper, {
    isInDisplayedMonth: true,
    dateFormatted: dayDateFormatted,
    date: dayOffset
  })));
});

exports.DayPage = DayPage;

const styles = _reactNative.StyleSheet.create({
  row: {
    flexDirection: "row"
  }
});
//# sourceMappingURL=Day.js.map