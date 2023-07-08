import React from "react";
import { DayProps, DayWrapperProps } from "./types";
export declare const DayWrapper: React.MemoExoticComponent<({ date, isInDisplayedMonth, dateFormatted }: DayWrapperProps) => JSX.Element>;
export declare const DayItem: React.MemoExoticComponent<({ date, isInDisplayedMonth, isSelected, DayComponent, isToday, onDateSelect, theme, dateFormatted, }: DayProps) => JSX.Element>;
export declare const DayPage: React.MemoExoticComponent<({ index }: {
    index: number;
}) => JSX.Element>;
