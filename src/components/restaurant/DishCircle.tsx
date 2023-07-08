import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { images_food } from '../../../assets/images';
import { theme } from '../../utils/constants';
import VectorIcon from '../utils/Vector';

type Props = MarginModifiers & {

};

const AnimatedView = Animated.createAnimatedComponent(View);
const DishCircle: React.FC<Props> = ({ ...modifiers }) => {
    const rotation = useSharedValue(0);


    const animatedRotation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotation.value}deg`
                }
            ]
        }
    })


    useEffect(() => {
        rotation.value = withTiming(280, { duration: 90000 });
    }, [' ']);


    return (
        <View>
            <FastImage resizeMode='contain' style={styles({}).topLeftProp} source={images_food.DishProp} />
            <VectorIcon style={styles({}).bottomRightProp} vector={'Ionicons'} name={'leaf'} size={30} color={theme.color.leaf} />
            <AnimatedView marginR-10 center marginB-10 width={250} padding-10 height={250} {...modifiers} style={[styles({}).center, animatedRotation]} >
                <FastImage resizeMode='contain' style={StyleSheet.absoluteFill} source={images_food.Dish} />
            </AnimatedView>
        </View>
    );
};


export default DishCircle;

const styles = (props: any) => StyleSheet.create({
    radius: {
        borderRadius: 220 / 2
    },
    radiusLess: {
        borderRadius: 10,
    },
    shadow: {
        // shadowColor:props.color,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 7,
        // backgroundColor:theme.color.cyan
    },
    contentContainerStyle: {
        paddingHorizontal: 10
    },
    heading: {
        height: 23
    },
    bgGray: {
        backgroundColor: theme.color.lightgray
    },
    posTop: {
        top: -1
    },
    center: {
        alignSelf: "center",
        marginTop: 50
    },
    topLeftProp: {
        position: "absolute",
        top: "20%",
        left: "9%",
        width: 60,
        height: 60
    },
    bottomRightProp: {
        position: "absolute",
        bottom: "2%",
        right: "5%",
        width: 60,
        height: 60,
        opacity: 1
    }
});
