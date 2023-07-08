/// <reference types="react" />
import { ComposedGesture, GestureType } from "react-native-gesture-handler";
import { PageInterpolatorParams } from "react-native-infinite-pager";
import Animated, { useAnimatedStyle, WithSpringConfig } from "react-native-reanimated";
import { DEFAULT_THEME } from "./defaults";
export declare type OnDateSelect = undefined | ((date: Date, options: {
    isSelected: boolean;
}) => void);
export declare type DayComponentType = (props: {
    date: Date;
    isInDisplayedMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
}) => JSX.Element | null;
export declare type WeekComponentType = (props: {
    days: Date[];
}) => JSX.Element | null;
export declare type MonthComponentType = (props: {
    weeks: Date[][];
    firstDayOfMonth: Date;
}) => JSX.Element | null;
export declare type HeaderComponentType = (props: {
    startDate: Date;
    endDate: Date;
}) => JSX.Element | null;
export declare type DayLabelComponentType = (props: {
    date: Date;
}) => JSX.Element | null;
export declare type ImperativeApiOptions = {
    animated?: boolean;
};
export declare type CalendarImperativeApi = {
    incrementPage: (options?: ImperativeApiOptions) => void;
    decrementPage: (options?: ImperativeApiOptions) => void;
    setPage: (date: Date, options?: ImperativeApiOptions) => void;
};
export declare type CalendarPageInterpolator = (params: CalendarPageInterpolatorParams) => ReturnType<typeof useAnimatedStyle>;
export declare type CalendarProps = {
    selectedDate?: Date | null;
    onDateSelect?: OnDateSelect;
    onPageChange?: (date: Date) => void;
    currentDate?: Date;
    HeaderComponent?: HeaderComponentType;
    DayLabelComponent?: DayLabelComponentType;
    DayComponent?: DayComponentType;
    WeekComponent?: WeekComponentType;
    MonthComponent?: MonthComponentType;
    theme?: Partial<typeof DEFAULT_THEME>;
    pageBuffer?: number;
    minDate?: Date;
    maxDate?: Date;
    pageInterpolator?: CalendarPageInterpolator;
    simultaneousGestures?: (ComposedGesture | GestureType)[];
    monthAnimCallbackNode?: Animated.SharedValue<number>;
    gesturesDisabled?: boolean;
    animationConfig?: Partial<WithSpringConfig>;
    weekStartsOn?: WeekDayIndex;
    pageInterval?: PageInterval;
};
export declare type DayProps = {
    date: Date;
    isInDisplayedMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
    DayComponent?: DayComponentType;
    onDateSelect?: OnDateSelect;
    theme: typeof DEFAULT_THEME;
    dateFormatted: string;
};
export declare type DayWrapperProps = {
    isInDisplayedMonth: boolean;
    date: Date;
    dateFormatted: string;
};
export declare type CalendarPageInterpolatorParams = PageInterpolatorParams & {
    theme: typeof DEFAULT_THEME;
};
export declare type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export declare type PageInterval = "day" | "week" | "month";
