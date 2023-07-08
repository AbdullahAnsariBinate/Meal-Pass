import { addDays, addMonths, addWeeks, differenceInCalendarMonths, differenceInDays, differenceInWeeks, isSameDay, isSameMonth, isSameWeek } from "date-fns";
export function getDiffFn(interval) {
  switch (interval) {
    case "day":
      return differenceInDays;

    case "week":
      return differenceInWeeks;

    case "month":
      return differenceInCalendarMonths;
  }
}
export function getIsSameFn(interval) {
  switch (interval) {
    case "day":
      return isSameDay;

    case "week":
      return isSameWeek;

    case "month":
      return isSameMonth;
  }
}
export function getAddFn(interval) {
  switch (interval) {
    case "day":
      return addDays;

    case "week":
      return addWeeks;

    case "month":
      return addMonths;
  }
}
export function getHeaderDateFormat(interval) {
  switch (interval) {
    case "day":
      return "MMMM d, yyyy";

    case "week":
      return "MMMM yyyy";

    case "month":
      return "MMMM yyyy";
  }
}
export function getDayLabelDateFormat(interval) {
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