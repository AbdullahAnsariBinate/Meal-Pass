"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _reactNativeInfinitePager = _interopRequireDefault(require("react-native-infinite-pager"));

var _defaults = require("./defaults");

var _context = require("./context");

var _Month = require("./Month");

var _reactNativeReanimated = require("react-native-reanimated");

var _utils = require("./utils");

var _Week = require("./Week");

var _Day = require("./Day");

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getPageComponent(interval) {
  switch (interval) {
    case "day":
      return _Day.DayPage;

    case "week":
      return _Week.WeekPage;

    case "month":
      return _Month.MonthPage;
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
  pageInterpolator = _defaults.defaultPageInterpolator,
  simultaneousGestures,
  monthAnimCallbackNode,
  gesturesDisabled,
  animationConfig,
  weekStartsOn = 0,
  // Sunday is default week start
  pageInterval = "month"
}, ref) {
  const initialDateRef = (0, _react.useRef)(currentDate || new Date());
  const pagerRef = (0, _react.useRef)(null);
  const currentDateRef = (0, _react.useRef)(currentDate);
  const currentPageRef = (0, _react.useRef)(0);
  const pageCallbackNode = (0, _reactNativeReanimated.useSharedValue)(0);
  const minPageIndex = (0, _react.useMemo)(() => {
    if (!minDate) return -Infinity;
    const differ = (0, _utils.getDiffFn)(pageInterval);
    return differ(initialDateRef.current, minDate) * -1;
  }, [minDate, pageInterval]);
  const maxPageIndex = (0, _react.useMemo)(() => {
    if (!maxDate) return Infinity;
    const differ = (0, _utils.getDiffFn)(pageInterval);
    return differ(initialDateRef.current, maxDate) * -1;
  }, [maxDate, pageInterval]);
  const onPageChangeRef = (0, _react.useRef)(onPageChange);
  onPageChangeRef.current = onPageChange;
  const fullThemeObj = { ..._defaults.DEFAULT_THEME,
    dayLabelDateFormat: (0, _utils.getDayLabelDateFormat)(pageInterval),
    headerDateFormat: (0, _utils.getHeaderDateFormat)(pageInterval),
    ...theme
  };
  const fullThemeRef = (0, _react.useRef)(fullThemeObj);
  const fullTheme = (0, _react.useMemo)(() => {
    const updatedTheme = { ...fullThemeRef.current,
      ...theme
    }; // If the theme object is defined inline, we only want to trigger context updates
    // if the values contained actually change.

    if ((0, _lodash.isEqual)(fullThemeRef.current, updatedTheme)) {
      return fullThemeRef.current;
    } else {
      fullThemeRef.current = updatedTheme;
      return updatedTheme;
    }
  }, [theme]);
  (0, _react.useImperativeHandle)(ref, () => ({
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
      const differ = (0, _utils.getDiffFn)(pageInterval);
      const page = differ(date, initialDateRef.current);
      (_pagerRef$current3 = pagerRef.current) === null || _pagerRef$current3 === void 0 ? void 0 : _pagerRef$current3.setPage(page, {
        animated
      });
    }
  }), [pageInterval]);
  (0, _react.useEffect)(() => {
    // Hard set the page if the passed-in currentDate changes and the calendar isn't already displaying that month.
    const isSameFn = (0, _utils.getIsSameFn)(pageInterval);
    const diffFn = (0, _utils.getDiffFn)(pageInterval);

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

  const _onPageChange = (0, _react.useCallback)(pg => {
    var _onPageChangeRef$curr;

    currentPageRef.current = pg;
    const addFn = (0, _utils.getAddFn)(pageInterval);
    const dateWithOffset = addFn(initialDateRef.current, pg);
    dateWithOffset.setDate(1);
    (_onPageChangeRef$curr = onPageChangeRef.current) === null || _onPageChangeRef$curr === void 0 ? void 0 : _onPageChangeRef$curr.call(onPageChangeRef, dateWithOffset);
  }, [pageInterval]);

  const providerValue = (0, _react.useMemo)(() => ({
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
  const pageInterpolatorInternal = (0, _react.useCallback)(params => {
    "worklet";

    return pageInterpolator(Object.assign({}, params, {
      theme: fullTheme
    }));
  }, [fullTheme, pageInterpolator]);
  return /*#__PURE__*/_react.default.createElement(_context.CalendarContext.Provider, {
    value: providerValue
  }, /*#__PURE__*/_react.default.createElement(_reactNativeInfinitePager.default, {
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
  }), monthAnimCallbackNode && /*#__PURE__*/_react.default.createElement(AnimUpdater, {
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
  (0, _reactNativeReanimated.useDerivedValue)(() => {
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

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Calendar));

exports.default = _default;
const numDaysInMonth = [...Array(12)].fill(0).flatMap((d, i) => {
  const month = new Date();
  month.setMonth(i);
  const numDaysInMonth = (0, _dateFns.getDaysInMonth)(month);
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