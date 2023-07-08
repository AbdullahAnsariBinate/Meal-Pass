"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayLabel = DayLabel;
exports.DayLabels = DayLabels;

var _dateFns = require("date-fns");

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DayLabels({
  daysOfWeek
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.dayLabelRow
  }, daysOfWeek.map(day => /*#__PURE__*/_react.default.createElement(DayLabel, {
    key: `day-label-${day.toISOString()}`,
    day: day
  }))));
}

function DayLabel({
  day
}) {
  const {
    DayLabelComponent,
    theme
  } = (0, _context.useCalendarContext)();
  const dayLabelText = (0, _dateFns.format)(day, theme.dayLabelDateFormat);
  return DayLabelComponent ? /*#__PURE__*/_react.default.createElement(DayLabelComponent, {
    date: day
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.dayLabelContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: theme.dayLabelColor,
      fontFamily: theme.dayLabelFontFamily,
      fontSize: theme.dayLabelFontSize,
      textTransform: theme.dayLabelTextTransform
    }
  }, dayLabelText));
}

const styles = _reactNative.StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  dayLabelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dayLabelRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  }
});
//# sourceMappingURL=DayLabels.js.map