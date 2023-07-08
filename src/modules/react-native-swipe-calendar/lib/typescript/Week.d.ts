import React from "react";
declare function Week({ days, firstDayOfMonth, }: {
    days: Date[];
    firstDayOfMonth: Date;
}): JSX.Element;
export default Week;
export declare const WeekPage: React.MemoExoticComponent<({ index }: {
    index: number;
}) => JSX.Element>;
