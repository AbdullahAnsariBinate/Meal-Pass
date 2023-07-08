import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BounceIn, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Checkbox, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useServices } from '../../services';
import { theme } from '../../utils/constants';
import { ModalProps } from '../../utils/types';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { VectorIcon } from '..';
import { screens } from '../../screens';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


const Modal = (props: ModalProps) => {
    const { events } = useServices();
    const [checks, setChecks] = React.useState<typeof props.checks>(props.checks ? props.checks : []);
    const aimatedXvalue = useSharedValue(0);

    const triggerErrorAimation = () => {
        const options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false
        };

        ReactNativeHapticFeedback.trigger("effectDoubleClick", options);
        aimatedXvalue.value = withSequence(
            withTiming(-5, { duration: 50 }),
            withRepeat(withTiming(5, { duration: 100 }), 3, true),
            withTiming(0, { duration: 50 })
        )
    }

    const animatedShakeStyle = useAnimatedStyle(() => {
        return {
            left: aimatedXvalue.value,
        }
    })

    const onPressEvent = (action: typeof props.actions[0]) => {
        switch (action.action) {
            case "acceptance":
                if (checks && checks.length > 0) {
                    for (let i = 0; i < checks.length; i++) {
                        if (checks[i].required && !checks[i].checked) {
                            triggerErrorAimation()
                            return;
                        }
                    }
                }
                screens.N.dismissOverlay(props.componentId as string);
                events.onModalAccepted({});
                break;
            case "dismiss":
                screens.N.dismissOverlay(props.componentId as string)
                break;
        }
    }

    return (
        <View flex style={styles.container} center>
            {/* @ts-ignore */}
            <View reanimated exiting={ZoomOut.springify().duration(50)} entering={ZoomIn.springify()} width={widthPercentageToDP('90%')} bg-white style={styles.radius}>
                {props.heading &&
                    <View center width={"100%"} height={55} bg-cyan>
                        <Text mediummedium white>{props.heading}</Text>
                    </View>
                }
                <View padding-20 nativeID='content' style={styles.centerSelf}>
                    {props.status === "success" &&
                        // @ts-ignore
                        <View reanimated exiting={BounceIn.delay(1000)} center height={120} marginV-10>
                            <View flex width={120} bg-cyan style={styles.circle}>
                                <LinearGradient colors={['#1B8B8A', '#0B7676', '#0B7675']} style={styles.linearGradient}>
                                    <React.Suspense fallback={<Text>loading...</Text>}>
                                        <VectorIcon vector={'Entypo'} name={'check'} size={60} color={theme.color.white} />
                                    </React.Suspense>
                                </LinearGradient>
                            </View>
                        </View>
                    }

                    {props.subtext &&
                        // @ts-ignore
                        <Text center={checks.length === 0} smalllight black>{props.subtext}</Text>
                    }



                    {checks && checks.map((check, index) => {
                        const setIsCheck = () => {
                            const new_checks = [...checks];
                            new_checks[index].checked = !new_checks[index].checked;
                            setChecks(new_checks);
                        }

                        return (
                            <View style={animatedShakeStyle} reanimated marginT-10 height={35} row centerV>
                                <Checkbox iconColor={theme.color.white} borderRadius={50} color={theme.color.cyan} labelStyle={styles.labelStyle} bg-white value={check.checked} onValueChange={setIsCheck} />
                                <Text onPress={setIsCheck} marginL-10 smalllight black>{check.text}</Text>
                            </View>
                        )
                    })}



                </View>


                {props.actions && props.actions.length === 1 &&
                    <View marginB-15>
                        {props.actions.map((action, index) => {
                            return (
                                <TouchableOpacity onPress={onPressEvent.bind(null, action)} activeOpacity={.92}>
                                    <View center width={'90%'} height={55} bg-cyan style={[styles.centerSelf, styles.btnRadius]}>
                                        <Text mediummedium white>{action.text}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                }

                {props.actions && props.actions.length === 2 &&
                    <View height={55} row>
                        {props.actions.map((action, index) => {
                            return (
                                <TouchableOpacity onPress={onPressEvent.bind(null, action)} activeOpacity={.92} flex>
                                    <View center bg-cyan bg-white={index === 0} flex>
                                        <Text mediummedium white gray={index === 0}>{action.text}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                }
            </View>
        </View >
    );
};

export default React.memo(Modal);

const styles = StyleSheet.create({
    container: {},
    radius: {
        borderRadius: 20,
        overflow: "hidden"
    },
    centerSelf: {
        alignSelf: "center"
    },
    labelStyle: {
        color: theme.color.white
    },
    flex: {
        flex: 1
    },
    circle: {
        borderRadius: 100,
        borderWidth: 6,
        borderColor: '#A2D0D0',
        overflow: "hidden"
    },
    linearGradient: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    btnRadius: {
        borderRadius: 60
    }
});
