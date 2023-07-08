import React, { useMemo, useRef, useEffect, useImperativeHandle, useCallback } from "react";
import { isEqual } from "lodash";
import InfinitePager from "react-native-infinite-pager";
import { defaultPageInterpolator, DEFAULT_THEME } from "./defaults";
import { CalendarContext } from "./context";
import { MonthPage } from "./Month";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { getAddFn, getDayLabelDateFormat, getDiffFn, getHeaderDateFormat, getIsSameFn } from "./utils";
import { WeekPage } from "./Week";
import { DayPage } from "./Day";
import { getDaysInMonth } from "date-fns";

function getPageComponent(interval) {
  switch (interval) {
    case "day":
      return DayPage;

    case "week":
      return WeekPage;

    case "month":
      return MonthPage;
  }
}

function Calendar({
  selectedDate,
  onDateSelect,
  onPageChange,
  currentDate,
  HeaderComponent,
  DayLabelComponent,
  DayComponent,
  WeekComponent,
  MonthComponent,
  theme = {},
  pageBuffer = 1,
  minDate,
  maxDate,
  pageInterpolator = defaultPageInterpolator,
  simultaneousGestures,
  monthAnimCallbackNode,
  gesturesDisabled,
  animationConfig,
  weekStartsOn = 0,
  // Sunday is default week start
  pageInterval = "month"
}, ref) {
  const initialDateRef = useRef(currentDate || new Date());
  const pagerRef = useRef(null);
  const currentDateRef = useRef(currentDate);
  const currentPageRef = useRef(0);
  const pageCallbackNode = useSharedValue(0);
  const minPageIndex = useMemo(() => {
    if (!minDate) return -Infinity;
    const differ = getDiffFn(pageInterval);
    return differ(initialDateRef.current, minDate) * -1;
  }, [minDate, pageInterval]);
  const maxPageIndex = useMemo(() => {
    if (!maxDate) return Infinity;
    const differ = getDiffFn(pageInterval);
    return differ(initialDateRef.current, maxDate) * -1;
  }, [maxDate, pageInterval]);
  const onPageChangeRef = useRef(onPageChange);
  onPageChangeRef.current = onPageChange;
  const fullThemeObj = { ...DEFAULT_THEME,
    dayLabelDateFormat: getDayLabelDateFormat(pageInterval),
    headerDateFormat: getHeaderDateFormat(pageInterval),
    ...theme
  };
  const fullThemeRef = useRef(fullThemeObj);
  const fullTheme = useMemo(() => {
    const updatedTheme = { ...fullThemeRef.current,
      ...theme
    }; // If the theme object is defined inline, we only want to trigger context updates
    // if the values contained actually change.

    if (isEqual(fullThemeRef.current, updatedTheme)) {
      return fullThemeRef.current;
    } else {
      fullThemeRef.current = updatedTheme;
      return updatedTheme;
    }
  }, [theme]);
  useImperativeHandle(ref, () => ({
    incrementPage: options => {
      var _options$animated, _pagerRef$current;

      const animated = (_options$animated = options === null || options === void 0 ? void 0 : options.animated) !== null && _options$animated !== void 0 ? _options$animated : true;
      (_pagerRef$current = pagerRef.current) === null || _pagerRef$current === void 0 ? void 0 : _pagerRef$current.incrementPage({
        animated
      });
    },
    decrementPage: options => {
      var _options$animated2, _pagerRef$current2;

      const animated = (_options$animated2 = options === null || options === void 0 ? void 0 : options.animated) !== null && _options$animated2 !== void 0 ? _options$animated2 : true;
      (_pagerRef$current2 = pagerRef.current) === null || _pagerRef$current2 === void 0 ? void 0 : _pagerRef$current2.decrementPage({
        animated
      });
    },
    setPage: (date, options) => {
      var _options$animated3, _pagerRef$current3;

      const animated = (_options$animated3 = options === null || options === void 0 ? void 0 : options.animated) !== null && _options$animated3 !== void 0 ? _options$animated3 : false;
      const differ = getDiffFn(pageInterval);
      const page = differ(date, initialDateRef.current);
      (_pagerRef$current3 = pagerRef.current) === null || _pagerRef$current3 === void 0 ? void 0 : _pagerRef$current3.setPage(page, {
        animated
      });
    }
  }), [pageInterval]);
  useEffect(() => {
    // Hard set the page if the passed-in currentDate changes and the calendar isn't already displaying that month.
    const isSameFn = getIsSameFn(pageInterval);
    const diffFn = getDiffFn(pageInterval);

    if (currentDate && currentDateRef.current && !isSameFn(currentDate, currentDateRef.current)) {
      var _pagerRef$current4;

      const page = diffFn(currentDate, initialDateRef.current);
      if (page === currentPageRef.current) return;
      (_pagerRef$current4 = pagerRef.current) === null || _pagerRef$current4 === void 0 ? void 0 : _pagerRef$current4.setPage(page, {
        animated: false
      });
    }

    currentDateRef.current = currentDate;
  }, [currentDate, pageInterval]);

  const _onPageChange = useCallback(pg => {
    var _onPageChangeRef$curr;

    currentPageRef.current = pg;
    const addFn = getAddFn(pageInterval);
    const dateWithOffset = addFn(initialDateRef.current, pg);
    dateWithOffset.setDate(1);
    (_onPageChangeRef$curr = onPageChangeRef.current) === null || _onPageChangeRef$curr === void 0 ? void 0 : _onPageChangeRef$curr.call(onPageChangeRef, dateWithOffset);
  }, [pageInterval]);

  const providerValue = useMemo(() => ({
    referenceDate: initialDateRef.current,
    selectedDate,
    onDateSelect,
    HeaderComponent,
    DayLabelComponent,
    DayComponent,
    WeekComponent,
    MonthComponent,
    theme: fullTheme,
    pageInterpolator,
    weekStartsOn
  }), [selectedDate, onDateSelect, HeaderComponent, DayLabelComponent, DayComponent, WeekComponent, MonthComponent, fullTheme, pageInterpolator, weekStartsOn]);
  const pageInterpolatorInternal = useCallback(params => {
    "worklet";

    return pageInterpolator(Object.assign({}, params, {
      theme: fullTheme
    }));
  }, [fullTheme, pageInterpolator]);
  return /*#__PURE__*/React.createElement(CalendarContext.Provider, {
    value: providerValue
  }, /*#__PURE__*/React.createElement(InfinitePager, {
    ref: pagerRef,
    PageComponent: getPageComponent(pageInterval),
    pageBuffer: pageBuffer,
    onPageChange: _onPageChange,
    minIndex: minPageIndex,
    maxIndex: maxPageIndex,
    pageInterpolator: pageInterpolatorInternal,
    simultaneousGestures: simultaneousGestures,
    pageCallbackNode: monthAnimCallbackNode ? pageCallbackNode : undefined,
    gesturesDisabled: gesturesDisabled,
    animationConfig: animationConfig
  }), monthAnimCallbackNode && /*#__PURE__*/React.createElement(AnimUpdater, {
    pageInterval: pageInterval,
    initialDateRef: initialDateRef,
    monthAnimCallbackNode: monthAnimCallbackNode,
    pageCallbackNode: pageCallbackNode
  }));
} // Separate updater component so we only take the (slight) performance hit if the user provides a callback node


function AnimUpdater({
  initialDateRef,
  pageCallbackNode,
  monthAnimCallbackNode,
  pageInterval
}) {
  const initialMonthIndex = initialDateRef.current.getMonth();
  const initialDayOfMonth = initialDateRef.current.getDate();
  useDerivedValue(() => {
    function getMonthFromPage(page, initialOffset) {
      switch (pageInterval) {
        case "week":
          {
            const midweek = page * 7 + 3.5 + initialOffset;
            return getMonthFromDay(midweek);
          }

        case "day":
          {
            return getMonthFromDay(page + initialOffset);
          }

        case "month":
          // In 'month' view the pages already map to months
          return page;
      }
    }

    const initialOffset = daysElapsedAtMonthStart[initialMonthIndex] + initialDayOfMonth;
    const monthAnim = getMonthFromPage(pageCallbackNode.value, initialOffset);
    const rawVal = monthAnim;
    let modVal = rawVal % 12;

    if (modVal < 0) {
      modVal = 12 + modVal;
    }

    monthAnimCallbackNode.value = modVal;
  }, [pageCallbackNode, monthAnimCallbackNode, initialMonthIndex, initialDayOfMonth, pageInterval]);
  return null;
}

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Calendar));
const numDaysInMonth = [...Array(12)].fill(0).flatMap((d, i) => {
  const month = new Date();
  month.setMonth(i);
  const numDaysInMonth = getDaysInMonth(month);
  return numDaysInMonth;
});
const daysElapsedAtMonthStart = numDaysInMonth.reduce((acc, cur) => {
  const last = acc[acc.length - 1] || 0;
  acc.push(last + cur);
  return acc;
}, [0]);
const dayOfYearToMonthIndex = numDaysInMonth.flatMap((numDaysInMonth, monthIndex) => {
  return [...new Array(numDaysInMonth)].fill(0).map((_, i) => {
    return {
      pct: monthIndex + i / numDaysInMonth,
      numDaysInMonth
    };
  });
});

function getMonthFromDay(dayOfYear) {
  "worklet";

  const floor = Math.floor(dayOfYear);
  const remainder = dayOfYear % 1;
  const {
    pct,
    numDaysInMonth
  } = dayOfYearToMonthIndex[floor % 365];
  return pct + remainder / numDaysInMonth;
}
//# sourceMappingURL=Calendar.js.map