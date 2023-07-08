import { format } from "date-fns";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCalendarContext } from "./context";
export function DayLabels({
  daysOfWeek
}) {
  return /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.dayLabelRow
  }, daysOfWeek.map(day => /*#__PURE__*/React.createElement(DayLabel, {
    key: `day-label-${day.toISOString()}`,
    day: day
  }))));
}
export function DayLabel({
  day
}) {
  const {
    DayLabelComponent,
    theme
  } = useCalendarContext();
  const dayLabelText = format(day, theme.dayLabelDateFormat);
  return DayLabelComponent ? /*#__PURE__*/React.createElement(DayLabelComponent, {
    date: day
  }) : /*#__PURE__*/React.createElement(View, {
    style: styles.dayLabelContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: theme.dayLabelColor,
      fontFamily: theme.dayLabelFontFamily,
      fontSize: theme.dayLabelFontSize,
      textTransform: theme.dayLabelTextTransform
    }
  }, dayLabelText));
}
const styles = StyleSheet.create({
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