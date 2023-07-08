import { FlashList } from '@shopify/flash-list';
import React, { lazy } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { FlexModifiers, PaddingModifiers } from 'react-native-ui-lib/src/commons/modifiers';
import { images_food } from '../../../assets/images';


import Item from './item'

// const Item = lazy(() => import('./item'))

type Props = MarginModifiers & FlexModifiers & PaddingModifiers & {
    //   label?: string;
    //   onPress?: PureFunc;
};


const AnimatedView = Animated.createAnimatedComponent(View);

const CartDelivery: React.FC<Props> = ({ ...modifiers }) => {

    const items = [
        {
            title: "Double Quarter",
            price: "$240",
            quantity: 2,
            image: images_food.Food4
        },
        {
            title: "BBQ Grill",
            price: "$240",
            quantity: 1,
            image: images_food.Food3
        }
    ]

    return (
        <AnimatedView entering={FadeInUp.springify()}  {...modifiers}>
            <View paddingH-15 marginT-10 row spread>
                <Text smallmedium gray>Delivery</Text>
            </View>
            <View flex>
                {items.map((item) => {
                    return <Item item={item} />
                })}
                {/* <FlashList
                    data={items}
                    renderItem={({ item }) => {
                        return (
                            <View height={100} width={"100%"}>
                                <Item item={item} />
                            </View>
                        )
                    }}
                    contentContainerStyle={styles({}).contentContainerStyle}
                    estimatedItemSize={200}
                    numColumns={1}
                /> */}
            </View>
        </AnimatedView>
    );
};


export default CartDelivery;


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
        paddingHorizontal: 10,
        height: "100%"
    },
    img: {
        width: "100%",
        height: "80%",
    }
});
