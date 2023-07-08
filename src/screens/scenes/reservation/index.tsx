import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollBar, Text, View } from 'react-native-ui-lib';
import { CoreUI, RestaurantHeader, VectorIcon } from '../../../components';
import { theme } from '../../../utils/constants';
import moment from 'moment'
import { Calendar } from 'react-native-calendars';
import { Bounceable } from 'rn-bounceable';
import DatePicker from 'react-native-date-picker'
import { useState } from 'react';
import { widthPercentageToDP } from 'react-native-responsive-screen';


interface ReservationsProps {
    restaurant: any;
    componentId: string;
    action: "view" | "order"
}
const HEADER_HEIGHT = 200;

const Reservations = (props: ReservationsProps) => {
    const [date, setDate] = useState(new Date())

    const renderheader = () => {
        return (
            <RestaurantHeader restaurant={props.restaurant} />
        )
    }

    const onPressedContinue = () => {

    }

    const addZeroToDigits = (digit: number) => {
        if (digit) {
            let zeroAdded = `0${digit}`;
            return zeroAdded.substring(zeroAdded.length - 2);
        } else {
            return `00`;
        }

    }

    const dataSet = {
        data: {
            firstColumn: [...Array(13).keys()].map((item, idx) => { return { value: addZeroToDigits(item), index: idx } }),
            secondColumn: [...Array(60).keys()].map((item, idx) => { return { value: addZeroToDigits(item), index: idx } }),
            thirdColumn: [
                { value: 'AM', index: 0 },
                { value: 'PM', index: 1 }
            ],
        },
        initials: [8, 25, 0]
    }

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner bottomTabAction={{ text: "Continue", delegate: onPressedContinue.bind(null) }} componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                {renderheader()}

                <View paddingT-210 padding-10 marginT-5>
                    <Calendar
                        headerStyle={styles.headerCalender}
                        minDate={moment().format('YYYY-MM-DD')}
                        initialDate={moment().format('YYYY-MM-DD')}
                        // Collection of dates that have to be marked. Default = {}
                        markedDates={{
                            [moment().format('YYYY-MM-DD')]: {
                                customStyles: {
                                    container: {
                                        backgroundColor: theme.color.cyan,
                                        borderRadius: 0
                                    },
                                    text: {
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontFamily: theme.font.bold
                                    }
                                },
                                selected: true,
                                marked: true,
                                selectedColor: theme.color.cyan,
                                dotColor: '#50cebb'
                            },
                        }}
                        style={styles.shadow}
                        enableSwipeMonths={true}
                        disableAllTouchEventsForDisabledDays={true}
                        hideExtraDays={false}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            textSectionTitleDisabledColor: '#d9e1e8',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: theme.color.cyan,
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: theme.color.cyan,
                            indicatorColor: 'blue',
                            textDayFontFamily: theme.font.regular,
                            textMonthFontFamily: theme.font.regular,
                            textDayHeaderFontFamily: theme.font.regular,
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: theme.fontSize.small,
                            textMonthFontSize: theme.fontSize.medium,
                            textDayHeaderFontSize: theme.fontSize.medium
                        }}


                    />
                </View>





                <View paddingH-15 row flex>
                    <View flex paddingR-5>
                        <Text smallmedium cyan>Table For</Text>
                        <View row spread centerV paddingH-10 height={55} width="100%" bg-white style={[styles.radius, styles.shadowBox]}>
                            <Bounceable>
                                <View width={40} height={40} bg-cyan style={styles.radius} center>
                                    <VectorIcon vector={"AntDesign"} name={'minus'} size={15} color={theme.color.white} />
                                </View>
                            </Bounceable>
                            <Text smallmedium black>12</Text>
                            <Bounceable>
                                <View width={40} height={40} bg-cyan style={styles.radius} center>
                                    <VectorIcon vector={'AntDesign'} name={'plus'} size={15} color={theme.color.white} />
                                </View>
                            </Bounceable>

                        </View>
                    </View>
                    {/* style={[styles.radius, styles.shadowBox, styles.overflowHidden]} */}
                    <View flex>
                        <Text smallmedium cyan>Time</Text>
                        <View row height={55} width="100%" bg-white paddingR-5 style={[styles.radius, styles.shadowBox]} >
                            <DatePicker mode="time" textColor={theme.color.black} style={{ width: widthPercentageToDP('46%'), height: 55, marginRight: 10 }} date={date} onDateChange={setDate} />
                        </View>
                    </View>
                </View>

            </CoreUI.FlowContaner>
        </React.Suspense>
    );
};

export default Reservations;

const styles = StyleSheet.create({
    container: {},
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 1,
        borderRadius: 20,
        overflow: "hidden",
        height: 280
    },
    headerCalender: { height: 45, marginBottom: 6 },
    radius: {
        borderRadius: 10
    },
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 1,
    },
    overflowHidden: {
        overflow: "hidden"
    }
});
