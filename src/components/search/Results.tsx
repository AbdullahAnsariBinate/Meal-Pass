import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { images_food } from '../../../assets/images';
import { theme } from '../../utils/constants';
import RestaurantCard from '../restaurant/Card';
import uuid from 'react-native-uuid';

interface ResultsProps {
    type: "features" | "favourites"
}

const Results = (props: ResultsProps) => {


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
        <View style={styles.container}>
            <View paddingH-15 marginT-10 row spread>
                <Text smallmedium gray>Search Results</Text>
            </View>


            <View width={'94%'} marginT-10 style={styles.center}>
                <FlashList
                    data={temporary_map}
                    renderItem={({ item }) => {
                        const id = uuid.v4();
                        // @ts-ignore
                        return <RestaurantCard temp={{ ...item, id: id }} type={props.type} width={"100%"} />
                    }}
                    contentContainerStyle={styles.contentContainerStyle}
                    estimatedItemSize={400}
                    nestedScrollEnabled
                />
            </View>
        </View>
    );
};

export default Results;

const styles = StyleSheet.create({
    container: {},
    contentContainerStyle: {
        paddingHorizontal: 20,
    },
    center: {
        alignSelf: "center"
    }
});
