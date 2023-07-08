import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SlideInUp, BounceIn, PinwheelIn } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { images_food } from '../../../assets/images';
import { CoreUI } from '../../components';
import { RestaurantHorizontalCard } from '../../components/restaurant/HorizontalCards';
import { theme } from '../../utils/constants';

interface HistoryProps {
    componentId: string;
}

const History = (props: HistoryProps) => {

    const temporary_map = [
        {
            title: "Burger King",
            image: images_food.Food,
            color: theme.color.purple,
            entering: SlideInUp.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            price: "$240",
            status: "Picku-up"
        },
        {
            title: "Grill",
            image: images_food.Food2,
            color: theme.color.cyanlight,
            entering: BounceIn.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            status: "Delivery"

        },
        {
            title: "Pizza Hut",
            image: images_food.Food3,
            color: theme.color.lightbrown,
            entering: PinwheelIn.duration(1000),
            reactive: true,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            status: "Picku-up"

        },
        {
            title: "Ice cream",
            image: images_food.Food4,
            color: theme.color.lightblue,
            entering: SlideInUp.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            status: "Picku-up"

        },
    ]

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner disableScroll bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                <View flex paddingH-15 paddingT-10>
                    <FlashList
                        data={temporary_map}
                        renderItem={({ item }) => {
                            return <RestaurantHorizontalCard temp={item} type={'history'} rating={true} />
                        }}
                        estimatedItemSize={100}
                    />
                </View>
            </CoreUI.FlowContaner>
        </React.Suspense>
    );
};

export default History;

const styles = StyleSheet.create({
    container: {},
    contentContainerStyle: {
        paddingTop: 15
    }
});
