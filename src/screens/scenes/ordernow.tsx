import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { CoreUI, RestaurantHeader, VectorIcon } from '../../components';
import { theme } from '../../utils/constants';
import { useState } from 'react';
import { getRandomParagraph } from '../../utils/help';
import { Button } from 'react-native-paper';
import { screens } from '..';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';
import { useServices } from '../../services';


interface OrderNowProps {
    restaurant: any;
    componentId: string;
    action: "view" | "order"
}
const HEADER_HEIGHT = 200;

const OrderNow = (props: OrderNowProps) => {
    const [date, setDate] = useState(new Date())

    const renderheader = () => {
        return (
            <RestaurantHeader restaurant={props.restaurant} />
        )
    }

    const onPressedContinue = (action: "to_reservation" | "pickup" | "delivery") => {
        switch (action) {
            case "to_reservation":
                screens.push(props.componentId, "Reservation", { restaurant: props.restaurant }, {
                    animations: {
                        push: {
                            waitForRender: true,
                            sharedElementTransitions: [
                                {
                                    fromId: "header",
                                    toId: "header"
                                }
                            ]
                        },
                        pop: {
                            waitForRender: true,
                            sharedElementTransitions: [
                                {
                                    fromId: "header",
                                    toId: "header"
                                }
                            ]
                        }
                    }
                })
                break;
            case "pickup":
                screens.push(props.componentId, "AboutRestaurant", { restaurant: props.restaurant, action: "order" }, {
                    animations: {
                        push: {
                            waitForRender: true,
                            sharedElementTransitions: [
                                {
                                    fromId: "header",
                                    toId: "header"
                                }
                            ]
                        },
                        pop: {
                            waitForRender: true,
                            sharedElementTransitions: [
                                {
                                    fromId: "header",
                                    toId: "header"
                                }
                            ]
                        }
                    }
                })
                break;
            case "delivery":
                screens.push(props.componentId, "AboutRestaurant", { restaurant: props.restaurant, action: "order" }, {
                    animations: {
                        push: {
                            sharedElementTransitions: [
                                {
                                    fromId: "header",
                                    toId: "header"
                                }
                            ]
                        },
                        pop: {
                            sharedElementTransitions: [
                                {
                                    fromId: "header",
                                    toId: "header"
                                }
                            ]
                        }
                    }
                })
                break;
        }
    }

    const addZeroToDigits = (digit: number) => {
        if (digit) {
            let zeroAdded = `0${digit}`;
            return zeroAdded.substring(zeroAdded.length - 2);
        } else {
            return `00`;
        }

    }

    const { nav } = useServices();
    useNavigationComponentDidAppear(
        (e) => {
            nav.setBottomTabAction("Book Reservation", onPressedContinue.bind(null, 'to_reservation'))
        },
        { componentId: props.componentId }
    )

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
            <CoreUI.FlowContaner isCustomBottomTabHandled bottomTabAction={{ text: "Book Reservation", delegate: onPressedContinue.bind(null, 'to_reservation') }} componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                {renderheader()}

                <View flex paddingT-210 padding-10 marginT-5>
                    <View spread>
                        <Text smallmedium cyan>Description</Text>
                        <Text gray smallregular>{getRandomParagraph()}</Text>


                    </View>
                </View>



                <View spread row height={60} marginB-10 width={"93%"} style={styles.alignCenter}>
                    <View flex marginR-8>
                        <Button onPress={onPressedContinue.bind(null, "pickup")} color={theme.color.cyan} labelStyle={styles.labelStyle} contentStyle={styles.btn} style={styles.btn} mode="contained">Pick-up</Button>
                    </View>
                    <View flex>
                        <Button onPress={onPressedContinue.bind(null, "delivery")} color={theme.color.cyan} labelStyle={styles.labelStyle} contentStyle={styles.btn} style={styles.btn} mode="contained">Delivery</Button>
                    </View>
                </View>


            </CoreUI.FlowContaner>
        </React.Suspense>
    );
};

export default OrderNow;

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
    },
    btn: {
        flex: 1,
        borderRadius: 100,
        height: 55,
        justifyContent: "center",
        alignItems: "center"
    },
    labelStyle: {
        color: theme.color.white,
        textTransform: "none"
    },
    alignCenter: {
        alignSelf: "center"
    }
});
