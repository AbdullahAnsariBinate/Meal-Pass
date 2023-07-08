import { FlashList } from '@shopify/flash-list';
import React, { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { BounceIn, FadeInUp, PinwheelIn, SlideInDown, SlideInUp, useAnimatedScrollHandler, useSharedValue, ZoomInRotate } from 'react-native-reanimated';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { FlexModifiers, PaddingModifiers } from 'react-native-ui-lib/src/commons/modifiers';
import { Bounceable } from 'rn-bounceable';
import { images_food } from '../../../assets/images';
import { theme } from '../../utils/constants';
import { FoodCard } from '../food/Card';

type Props = MarginModifiers & FlexModifiers & PaddingModifiers & {
    //   label?: string;
    //   onPress?: PureFunc;
};


const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);
const AnimatedView = Animated.createAnimatedComponent(View);

const Explore: React.FC<Props> = ({ ...modifiers }) => {

    const temporary_map = [
        {
            title: "Burger",
            image: images_food.Burger,
            color: theme.color.purple,
            entering: SlideInUp.duration(1000),
            reactive: false
        },
        {
            title: "Grill",
            image: images_food.Buffalo,
            color: theme.color.cyanlight,
            entering: BounceIn.duration(1000),
            reactive: false
        },
        {
            title: "Pizza",
            image: images_food.Pizza,
            color: theme.color.lightbrown,
            entering: PinwheelIn.duration(1000),
            reactive: true,
            type: "rotation"
        },
        {
            title: "Ice cream",
            image: images_food.IceCream,
            color: theme.color.lightblue,
            entering: SlideInUp.duration(1000),
            reactive: true,
            type: "drop",
            prop: images_food.Scoop,
        },
    ]
    const translationY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.x;
    });
    // 
    return (
        <AnimatedView entering={FadeInUp.springify()}  {...modifiers}>
            <View paddingH-15 marginT-10 row spread>
                <Text smallmedium gray>Explore Categories</Text>
                <Text smallmedium gray>Show all</Text>
            </View>
            <View row>
                <AnimatedFlashList
                    showsHorizontalScrollIndicator={false}

                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    horizontal
                    data={temporary_map}
                    renderItem={({ item }) => {
                        return <FoodCard YScrollValue={translationY} temp={item} />
                    }}
                    contentContainerStyle={styles({}).contentContainerStyle}
                    estimatedItemSize={100}
                />
            </View>
        </AnimatedView>
    );
};


export default memo(Explore);


const styles = (props: any) => StyleSheet.create({
    radius: {
        borderRadius: 20
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
        width: "100%",
        height: "80%",
    }
});
