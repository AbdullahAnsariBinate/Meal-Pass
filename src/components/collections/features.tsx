import * as React from 'react';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { FlexModifiers, PaddingModifiers } from 'react-native-ui-lib/src/commons/modifiers';
import { images_food } from '../../../assets/images';
import { theme } from '../../utils/constants';
import { lazy, useEffect, useState } from 'react';

import uuid from 'react-native-uuid';

const RestaurantCard = lazy(() => import('../restaurant/Card'))


const AnimatedView = Animated.createAnimatedComponent(View);

type Props = MarginModifiers & FlexModifiers & PaddingModifiers & {
    heading: string;
    headerAction?: any[],
    type: "features" | "favourites"
};

const Feature: React.FC<Props> = ({ heading, headerAction, type, ...modifiers }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [' ']);



    if (loading) {
        return (
            <View width={280} padding-10 height={220} center>
                <ActivityIndicator color={theme.color.cyan} size={"large"} />
            </View>
        );
    }


    const temporary_map = [
        {
            title: "Mac Donalds's",
            subline: "BBQ, Fast Foods,Burger",
            image: images_food.Food,
            color: theme.color.purple
        },
        {
            title: "KFC",
            subline: "BBQ, Fast Foods,Burger",
            image: images_food.Food2,
            color: theme.color.cyanlight

        },
        {
            title: "KFC",
            subline: "BBQ, Fast Foods,Burger",
            image: images_food.Food3,
            color: theme.color.cyanlight

        },
        {
            title: "KFC",
            subline: "BBQ, Fast Foods,Burger",
            image: images_food.Food4,
            color: theme.color.cyanlight

        },
    ]


    return (
        <View {...modifiers}>
            <View paddingH-15 marginT-10 row spread>
                <Text smallmedium gray>{heading}</Text>
                {headerAction && headerAction.map((action) => {
                    return (
                        <Text smallmedium gray>{action.title}</Text>
                    )
                })}
            </View>
            <View row>
                <FlashList
                    showsHorizontalScrollIndicator={false}

                    horizontal
                    data={temporary_map}
                    renderItem={({ item, index }) => {
                        const id = uuid.v4();
                        return <RestaurantCard temp={{ ...item, id: id }} type={type} />
                    }}
                    contentContainerStyle={styles({}).contentContainerStyle}
                    estimatedItemSize={400}
                />
            </View>
        </View>
    );
};

export default React.memo(Feature);


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

