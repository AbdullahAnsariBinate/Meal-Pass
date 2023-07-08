import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { BounceIn, PinwheelIn, SlideInDown, SlideInUp, useAnimatedScrollHandler, useSharedValue, ZoomInRotate } from 'react-native-reanimated';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { FlexModifiers, PaddingModifiers } from 'react-native-ui-lib/src/commons/modifiers';
import { Bounceable } from 'rn-bounceable';
import { images_food } from '../../../assets/images';
import { theme } from '../../utils/constants';
import { FoodCard } from '../food/Card';
import { RestaurantHorizontalCard } from '../restaurant/HorizontalCards';

type Props = MarginModifiers & FlexModifiers & PaddingModifiers & {
    mode: "most_ordered" | "recommended"
    //   label?: string;
    //   onPress?: PureFunc;
};



const Recommended: React.FC<Props> = ({ mode, ...modifiers }) => {

    const [loading, setLoading] = useState(true);

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, getRandomInt(600));
    }, [' '])

    if (loading) {
        return (
            <View width={"100%"} padding-10 height={220} center>
                <ActivityIndicator color={theme.color.cyan} size={"large"} />
            </View>
        );
    }

    const temporary_map = [
        {
            title: "Burger King",
            image: images_food.Food,
            color: theme.color.purple,
            entering: SlideInUp.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            price: "$240"
        },
        {
            title: "Grill",
            image: images_food.Food2,
            color: theme.color.cyanlight,
            entering: BounceIn.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum"

        },
        {
            title: "Pizza Hut",
            image: images_food.Food3,
            color: theme.color.lightbrown,
            entering: PinwheelIn.duration(1000),
            reactive: true,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum"

        },
        {
            title: "Ice cream",
            image: images_food.Food4,
            color: theme.color.lightblue,
            entering: SlideInUp.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum"

        },
    ]




    return (
        <View  {...modifiers}>
            <View paddingH-15 marginT-10 row spread>
                <Text smallmedium gray marginB-5 cyan={mode === "most_ordered"}>{mode === "most_ordered" ? "Most Ordered" : "Recommended"}</Text>
            </View>
            <View row paddingH-15>
                <FlashList
                    showsHorizontalScrollIndicator={false}
                    data={temporary_map}
                    renderItem={({ item }) => {
                        return <RestaurantHorizontalCard toDish temp={item} type={'features'} rating={true} />
                    }}
                    contentContainerStyle={styles({}).contentContainerStyle}
                    estimatedItemSize={100}
                />
            </View>
        </View>
    );
};

export default React.memo(Recommended);

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
