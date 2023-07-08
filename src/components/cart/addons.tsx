import { FlashList } from '@shopify/flash-list';
import React, { lazy } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { FlexModifiers, PaddingModifiers } from 'react-native-ui-lib/src/commons/modifiers';
import { images_food } from '../../../assets/images';
import AddonItem from './addonItem';


type Props = MarginModifiers & FlexModifiers & PaddingModifiers & {
    //   label?: string;
    //   onPress?: PureFunc;
};


const AnimatedView = Animated.createAnimatedComponent(View);

const AddonsComponent: React.FC<Props> = ({ ...modifiers }) => {

    const items = [
        {
            title: "Side Salads",
            price: "$20.00",
            quantity: 2,
            image: images_food.Food4
        },
        {
            title: "BBQ Shrimp & Lobster",
            price: "$20.00",
            quantity: 1,
            image: images_food.Food3
        },
        {
            title: "Soft Drink",
            price: "$20.00",
            quantity: 1,
            image: images_food.Food3
        },
        {
            title: "Straw Dessert",
            price: "$20.00",
            quantity: 1,
            image: images_food.Food3
        }
    ]

    // @ts-ignore
    const renderItem = ({ item }) => {
        return (
            <AddonItem item={item} />
        )
    };
    //  entering={FadeInUp.springify()} 
    return (
        <AnimatedView {...modifiers}>
            <View paddingH-15 marginT-10 row spread>
                <Text smallmedium cyan>Add On's</Text>
            </View>
            {/* <View row  width={"100%"} flex> */}
            <FlashList
                horizontal
                data={items}
                renderItem={renderItem.bind(null)}
                contentContainerStyle={styles({}).contentContainerStyle}
                estimatedItemSize={200}
                numColumns={1}
            />
            {/* </View> */}
        </AnimatedView>
    );
};


export default AddonsComponent;


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
        paddingHorizontal: 15,
        height: "100%"
    },
    img: {
        width: "100%",
        height: "80%",
    }
});
