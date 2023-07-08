import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addDays, format, isSameDay } from "date-fns";
import { useCalendarContext } from "./context";
import { DayLabel } from "./DayLabels"; // The calendar renders a lot of Days, so we wrap them in order to
// prevent context updates from re-rendering everything

export const DayWrapper = /*#__PURE__*/React.memo(({
  date,
  isInDisplayedMonth,
  dateFormatted
}) => {
  const dateRef = useRef(date);
  const memoDate = useMemo(() => {
    if (isSameDay(dateRef.current, date)) {
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
  } = useCalendarContext();
  const isSelected = useMemo(() => {
    return !!selectedDate && isSameDay(memoDate, selectedDate);
  }, [memoDate, selectedDate]);
  const isToday = useMemo(() => isSameDay(memoDate, new Date()), [memoDate]);
  const onDateSelectRef = useRef(onDateSelect);
  onDateSelectRef.current = onDateSelect;
  const onDateSelectCb = useCallback((date, options) => {
    var _onDateSelectRef$curr;

    return (_onDateSelectRef$curr = onDateSelectRef.current) === null || _onDateSelectRef$curr === void 0 ? void 0 : _onDateSelectRef$curr.call(onDateSelectRef, date, options);
  }, []);
  return /*#__PURE__*/React.createElement(DayItem, {
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
export const DayItem = /*#__PURE__*/React.memo(({
  date,
  isInDisplayedMonth,
  isSelected,
  DayComponent,
  isToday,
  onDateSelect,
  theme,
  dateFormatted
}) => {
  const dayText = format(date, "d");
  const deselectedColor = isInDisplayedMonth ? theme.dayFontColor : theme.dayInactiveFontColor;
  const color = isSelected ? theme.daySelectedFontColor : deselectedColor;

  if (DayComponent) {
    return /*#__PURE__*/React.createElement(DayComponent, {
      date: date,
      isInDisplayedMonth: isInDisplayedMonth,
      isSelected: isSelected,
      isToday: isToday
    });
  }

  const padding = 10;
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
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
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 0,
      aspectRatio: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      backgroundColor: isSelected ? theme.selectedDayBackgroundColor : "transparent",
      borderRadius: 5
    }
  }), /*#__PURE__*/React.createElement(Text, {
    style: {
      color,
      fontSize: theme.dayFontSize,
      fontFamily: theme.dayFontFamily
    }
  }, dayText), /*#__PURE__*/React.createElement(View, {
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
export const DayPage = /*#__PURE__*/React.memo(({
  index
}) => {
  const {
    referenceDate,
    HeaderComponent,
    theme
  } = useCalendarContext();
  const dayOffset = useMemo(() => addDays(referenceDate, index), [referenceDate, index]);
  const firstDayOfMonth = useMemo(() => new Date(dayOffset), [dayOffset]);
  firstDayOfMonth.setDate(1);
  const dayDateFormatted = format(dayOffset, "yyyy-MM-dd");
  const headerText = format(dayOffset, theme.headerDateFormat);
  return /*#__PURE__*/React.createElement(React.Fragment, null, HeaderComponent ? /*#__PURE__*/React.createElement(HeaderComponent, {
    startDate: dayOffset,
    endDate: dayOffset
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
  }, headerText)), /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(DayLabel, {
    day: dayOffset
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(DayWrapper, {
    isInDisplayedMonth: true,
    dateFormatted: dayDateFormatted,
    date: dayOffset
  })));
});
const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  }
});
//# sourceMappingURL=Day.js.map