import { addDays, addMonths, eachDayOfInterval, eachWeekOfInterval, format, lastDayOfMonth } from "date-fns";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCalendarContext } from "./context";
import { DayLabels } from "./DayLabels";
import Week from "./Week";
export const MonthPage = /*#__PURE__*/React.memo(({
  index
}) => {
  const {
    referenceDate,
    HeaderComponent,
    MonthComponent,
    theme,
    weekStartsOn
  } = useCalendarContext();
  const firstDayOfMonth = useMemo(() => addMonths(referenceDate, index), [referenceDate, index]);
  firstDayOfMonth.setDate(1);
  const lastDayOfMo = useMemo(() => lastDayOfMonth(firstDayOfMonth), [firstDayOfMonth]);
  const headerText = format(firstDayOfMonth, theme.headerDateFormat);
  const weekStarts = useMemo(() => eachWeekOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMo
  }, {
    weekStartsOn
  }), [firstDayOfMonth, lastDayOfMo, weekStartsOn]);
  const weeks = useMemo(() => weekStarts.map(week => {
    return eachDayOfInterval({
      start: week,
      end: addDays(week, 6)
    });
  }), [weekStarts]);
  return /*#__PURE__*/React.createElement(View, null, HeaderComponent ? /*#__PURE__*/React.createElement(HeaderComponent, {
    startDate: firstDayOfMonth,
    endDate: lastDayOfMo
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
    daysOfWeek: weeks[0]
  }), MonthComponent ? /*#__PURE__*/React.createElement(MonthComponent, {
    weeks: weeks,
    firstDayOfMonth: firstDayOfMonth
  }) : /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.flex
  }, weeks.map(week => {
    var _week$;

    return /*#__PURE__*/React.createElement(Week, {
      key: `week-${(_week$ = week[0]) === null || _week$ === void 0 ? void 0 : _week$.toISOString()}`,
      days: week,
      firstDayOfMonth: firstDayOfMonth
    });
  }))));
});
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  }
});
//# sourceMappingURL=Month.js.map