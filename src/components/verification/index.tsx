import * as React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { theme } from '../../utils/constants';
import Button from '../core-ui/Button';
import { ColorHex, CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Animated, { SlideInDown, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useStateContext } from '../../utils/help';
import { NavigationProps, WelcomeProps } from '../../utils/types';
import { useServices } from '../../services';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface VerificationProps { }

type FieldProps = { index: number, symbol: any, isFocused: boolean };
const CELL_COUNT = 6;

const Verification = (props: VerificationProps) => {
    const { events } = useServices();
    const state: NavigationProps = useStateContext<NavigationProps>() as NavigationProps;

    const [value, setValue] = React.useState('');
    const [isError, setError] = React.useState(false);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    React.useEffect(() => {
        if (value.length === 6) {
            if (value === '000000') {
                events.onEventPressed('on_reset_code_approved', state);
            } else {
                triggerErrorAimation();
                setError(true);
            }
        } else {
            setError(false);
        }
    }, [value]);

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

    const renderCell: React.FC<FieldProps> = ({ index, symbol, isFocused }) => (
        <AnimatedText
            key={index}
            style={[styles.cell, isFocused ? styles.focusCell : {}, isError ? { borderColor: "rgba(255,0,0,.2)" } : {}, animatedShakeStyle]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
        </AnimatedText>
    )

    return (
        // @ts-ignore
        <View reanimated entering={SlideInDown} style={styles.container}>
            <View width={"90%"} style={styles.alignCenter}>
                <CodeField
                    ref={ref}
                    {...propss}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    textInputStyle={{ color: theme.color.black }}
                    renderCell={renderCell.bind(null)}


                />
            </View>

            <Button
                title={"Continue"}
                // onPress={handleSubmit.bind(null) as unknown as any}
                color={theme.color.cyan}
                styles={styles.btn}
            />
            <View center marginT-30>

                <CountdownCircleTimer
                    size={120}
                    strokeWidth={7}
                    trailStrokeWidth={7}
                    isPlaying={true}
                    duration={59}
                    // @ts-ignore
                    colors={theme.color.cyan} //{[theme.color.cyan, theme.color.black] as ColorHex[]}
                    // @ts-ignore
                    colorsTime={[60]}

                // zIndex: 10000, elevation: 10,

                >
                    {({ remainingTime }) =>
                        <View style={{ borderWidth: 5, width: "83%", height: "83%", borderRadius: 100000, justifyContent: "center" }}>
                            <Text style={{
                                color: theme.color.cyan, textAlign: "center", textAlignVertical: "center", fontFamily: theme.font.semibold, fontSize: 18,
                                borderColor: theme.color.black,
                                // lineHeight: 100,
                            }}>00:{remainingTime}</Text>
                        </View>
                    }
                </CountdownCircleTimer>
            </View>
            <Text center marginT-20 style={{ color: theme.color.black, fontFamily: theme.font.regular }}>
                Didn't receive code?<Text onPress={() => Alert.alert("DO THE THING")} style={{ color: theme.color.black, fontFamily: theme.font.semibold }}> Resend</Text>
            </Text>
        </View >
    );
};

export default Verification;


const styles = StyleSheet.create({
    btn: { marginTop: 20, height: 55 },
    root: { flex: 1, padding: 20, },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { borderWidth: 0, },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 50,
        fontSize: 13,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: theme.color.fieldborder,
        textAlign: 'center',
        color: theme.color.black,
        fontFamily: theme.font.semibold,
        backgroundColor: theme.color.darkWhite
    },
    focusCell: {
        borderColor: theme.color.cyan,
    },
    container: {
        // borderWidth: 1
    },
    alignCenter: {
        alignSelf: "center"
    }
});