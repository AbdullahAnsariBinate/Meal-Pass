import { addDays, differenceInWeeks, isSameWeek } from "date-fns";
import { PageInterval } from "./types";
export declare function getDiffFn(interval: PageInterval): typeof differenceInWeeks;
export declare function getIsSameFn(interval: PageInterval): typeof isSameWeek;
export declare function getAddFn(interval: PageInterval): typeof addDays;
export declare function getHeaderDateFormat(interval: PageInterval): "MMMM yyyy" | "MMMM d, yyyy";
export declare function getDayLabelDateFormat(interval: PageInterval): "EEEEEE" | "EEEE";
