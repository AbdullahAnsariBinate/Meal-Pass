"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddFn = getAddFn;
exports.getDayLabelDateFormat = getDayLabelDateFormat;
exports.getDiffFn = getDiffFn;
exports.getHeaderDateFormat = getHeaderDateFormat;
exports.getIsSameFn = getIsSameFn;

var _dateFns = require("date-fns");

function getDiffFn(interval) {
  switch (interval) {
    case "day":
      return _dateFns.differenceInDays;

    case "week":
      return _dateFns.differenceInWeeks;

    case "month":
      return _dateFns.differenceInCalendarMonths;
  }
}

function getIsSameFn(interval) {
  switch (interval) {
    case "day":
      return _dateFns.isSameDay;

    case "week":
      return _dateFns.isSameWeek;

    case "month":
      return _dateFns.isSameMonth;
  }
}

function getAddFn(interval) {
  switch (interval) {
    case "day":
      return _dateFns.addDays;

    case "week":
      return _dateFns.addWeeks;

    case "month":
      return _dateFns.addMonths;
  }
}

function getHeaderDateFormat(interval) {
  switch (interval) {
    case "day":
      return "MMMM d, yyyy";

    case "week":
      return "MMMM yyyy";

    case "month":
      return "MMMM yyyy";
  }
}

function getDayLabelDateFormat(interval) {
  switch (interval) {
    case "day":
      return "EEEE";

    case "week":
      return "EEEEEE";

    case "month":
      return "EEEEEE";
  }
}
//# sourceMappingURL=utils.js.map