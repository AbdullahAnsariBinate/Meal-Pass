import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';

type Props = MarginModifiers & {
    temp: any;
    YScrollValue: SharedValue<number>;
};


const AnimatedView = Animated.createAnimatedComponent(View);


export const FoodCard: React.FC<Props> = ({ temp, YScrollValue, ...modifiers }) => {

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${YScrollValue.value}deg`
                }
            ]
        }
    })


    const animatedPositionTopStyle = useAnimatedStyle(() => {
        const extrapolation = {
            extrapolateLeft: Extrapolation.CLAMP,
            extrapolateRight: Extrapolation.IDENTITY
        }

        const position = interpolate(YScrollValue.value,
            [0, 100],
            [-110, -80],
            extrapolation
        )

        return {
            top: position,
            position: "absolute",
            alignSelf: "center",
        }
    })


    return (
        <Bounceable>
            <View key={temp.title} marginR-10 width={100} height={120} center>
                <View absB width={"100%"} height={"80%"} backgroundColor={temp.color} style={[styles({ color: temp.color }).radius, styles({ color: temp.color }).shadow]} />
                <AnimatedView flex width={"100%"} height={"100%"} style={temp.reactive && temp.type === "rotation" ? animatedStyle : {}} >
                    <FastImage resizeMode="contain" style={[styles({}).img]} source={temp.image} />
                    {temp.prop &&
                        // animatedPositionTopStyle animatedPositionTopStyle
                        <AnimatedView style={animatedPositionTopStyle}>
                            <FastImage resizeMode="contain" style={[styles({}).propimg]} source={temp.prop} />
                        </AnimatedView>
                    }
                </AnimatedView>
                <Text marginB-15 extraSmallsemibold white style={styles({}).toBot}>{temp.title}</Text>
            </View>
        </Bounceable>
    );
};




const styles = (props: any) => StyleSheet.create({
    radius: {
        borderRadius: 18
    },
    shadow: {
        shadowColor: props.color,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 7
    },
    contentContainerStyle: {
        paddingHorizontal: 10
    },
    img: {
        width: "150%",
        height: "95%",
        alignSelf: "center"
        // position: "absolute",
    },
    toBot: {
        position: "absolute",
        bottom: -11
    },
    propimg: {
        width: 30,
        height: 30,
        position: "absolute",
        alignSelf: "center"
    }
});
