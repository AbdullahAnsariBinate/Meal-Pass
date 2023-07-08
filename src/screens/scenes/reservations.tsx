import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BounceIn, PinwheelIn, SlideInUp } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { images_food } from '../../../assets/images';
import { CoreUI, ReservationCard } from '../../components';
import { theme } from '../../utils/constants';

interface UserReservationsProps {
    componentId: string;
}

const UserReservations = (props: UserReservationsProps) => {

    const temporary_map = [
        {
            title: "Burger King",
            table: 10,
            image: images_food.Food,
            color: theme.color.purple,
            entering: SlideInUp.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            price: "$240",
            status: "Pending",
        },
        {
            title: "Grill",
            table: 10,
            image: images_food.Food2,
            color: theme.color.cyanlight,
            entering: BounceIn.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            status: "Completed",
        },
        {
            title: "Pizza Hut",
            table: 10,
            image: images_food.Food3,
            color: theme.color.lightbrown,
            entering: PinwheelIn.duration(1000),
            reactive: true,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            status: "Canceled",
        },
        {
            title: "Ice cream",
            table: 10,
            image: images_food.Food4,
            color: theme.color.lightblue,
            entering: SlideInUp.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            status: "Pending",
        },
    ]




    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner disableScroll componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                <View flex paddingH-15>
                    <FlashList
                        data={temporary_map}
                        renderItem={({ item }) => {
                            return <ReservationCard temp={item} type={'features'} rating={true} />
                        }}
                        contentContainerStyle={styles.contentContainerStyle}
                        estimatedItemSize={100}
                    />
                </View>

            </CoreUI.FlowContaner>
        </React.Suspense >
    );
};

export default UserReservations;

const styles = StyleSheet.create({
    container: {},
    contentContainerStyle: {
        paddingHorizontal: 10,
        paddingTop: 20
    }
});
