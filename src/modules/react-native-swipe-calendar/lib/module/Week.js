import { addDays, addWeeks, eachDayOfInterval, eachWeekOfInterval, format, isSameMonth } from "date-fns";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCalendarContext } from "./context";
import { DayWrapper } from "./Day";
import { DayLabels } from "./DayLabels";

function Week({
  days,
  firstDayOfMonth
}) {
  const {
    WeekComponent
  } = useCalendarContext();
  return WeekComponent ? /*#__PURE__*/React.createElement(WeekComponent, {
    days: days
  }) : /*#__PURE__*/React.createElement(View, {
    style: styles.weekContainer
  }, days.map(day => {
    const sameMonth = isSameMonth(day, firstDayOfMonth);
    const dayDateFormatted = format(day, "yyyy-MM-dd");
    return /*#__PURE__*/React.createElement(DayWrapper, {
      key: dayDateFormatted,
      isInDisplayedMonth: sameMonth,
      date: day,
      dateFormatted: dayDateFormatted
    });
  }));
}

export default Week;
export const WeekPage = /*#__PURE__*/React.memo(({
  index
}) => {
  const {
    referenceDate,
    HeaderComponent,
    theme,
    weekStartsOn
  } = useCalendarContext();
  const weekOffset = useMemo(() => addWeeks(referenceDate, index), [referenceDate, index]);
  const firstDayOfMonth = useMemo(() => new Date(addDays(weekOffset, 3)), [weekOffset]);
  firstDayOfMonth.setDate(1);
  const weekWithStart = useMemo(() => eachWeekOfInterval({
    start: weekOffset,
    end: weekOffset
  }, {
    weekStartsOn
  }), [weekOffset, weekStartsOn]);
  const daysOfWeek = useMemo(() => eachDayOfInterval({
    start: weekWithStart[0],
    end: addDays(weekWithStart[0], 6)
  }), [weekWithStart]);
  const headerText = format(firstDayOfMonth, theme.headerDateFormat);
  return /*#__PURE__*/React.createElement(React.Fragment, null, HeaderComponent ? /*#__PURE__*/React.createElement(HeaderComponent, {
    startDate: daysOfWeek[0],
    endDate: daysOfWeek[daysOfWeek.length - 1]
  }) : /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: theme.headerFontSize,
      fontFamily: theme.headerFontFamily,
      color: theme.headerFontColor,
      textTransform: theme.headerTextTransform
    }
  }, headerText)), /*#__PURE__*/React.createElement(DayLabels, {
    daysOfWeek: daysOfWeek
  }), /*#__PURE__*/React.createElement(Week, {
    days: daysOfWeek,
    firstDayOfMonth: firstDayOfMonth
  }));
});
const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row"
  }
});
//# sourceMappingURL=Week.js.map