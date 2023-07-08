"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WeekPage = void 0;

var _dateFns = require("date-fns");

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _context = require("./context");

var _Day = require("./Day");

var _DayLabels = require("./DayLabels");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Week({
  days,
  firstDayOfMonth
}) {
  const {
    WeekComponent
  } = (0, _context.useCalendarContext)();
  return WeekComponent ? /*#__PURE__*/_react.default.createElement(WeekComponent, {
    days: days
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.weekContainer
  }, days.map(day => {
    const sameMonth = (0, _dateFns.isSameMonth)(day, firstDayOfMonth);
    const dayDateFormatted = (0, _dateFns.format)(day, "yyyy-MM-dd");
    return /*#__PURE__*/_react.default.createElement(_Day.DayWrapper, {
      key: dayDateFormatted,
      isInDisplayedMonth: sameMonth,
      date: day,
      dateFormatted: dayDateFormatted
    });
  }));
}

var _default = Week;
exports.default = _default;

const WeekPage = /*#__PURE__*/_react.default.memo(({
  index
}) => {
  const {
    referenceDate,
    HeaderComponent,
    theme,
    weekStartsOn
  } = (0, _context.useCalendarContext)();
  const weekOffset = (0, _react.useMemo)(() => (0, _dateFns.addWeeks)(referenceDate, index), [referenceDate, index]);
  const firstDayOfMonth = (0, _react.useMemo)(() => new Date((0, _dateFns.addDays)(weekOffset, 3)), [weekOffset]);
  firstDayOfMonth.setDate(1);
  const weekWithStart = (0, _react.useMemo)(() => (0, _dateFns.eachWeekOfInterval)({
    start: weekOffset,
    end: weekOffset
  }, {
    weekStartsOn
  }), [weekOffset, weekStartsOn]);
  const daysOfWeek = (0, _react.useMemo)(() => (0, _dateFns.eachDayOfInterval)({
    start: weekWithStart[0],
    end: (0, _dateFns.addDays)(weekWithStart[0], 6)
  }), [weekWithStart]);
  const headerText = (0, _dateFns.format)(firstDayOfMonth, theme.headerDateFormat);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, HeaderComponent ? /*#__PURE__*/_react.default.createElement(HeaderComponent, {
    startDate: daysOfWeek[0],
    endDate: daysOfWeek[daysOfWeek.length - 1]
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
  }, headerText)), /*#__PURE__*/_react.default.createElement(_DayLabels.DayLabels, {
    daysOfWeek: daysOfWeek
  }), /*#__PURE__*/_react.default.createElement(Week, {
    days: daysOfWeek,
    firstDayOfMonth: firstDayOfMonth
  }));
});

exports.WeekPage = WeekPage;

const styles = _reactNative.StyleSheet.create({
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row"
  }
});
//# sourceMappingURL=Week.js.map