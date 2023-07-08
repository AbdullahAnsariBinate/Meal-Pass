import { FlashList } from '@shopify/flash-list';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BounceIn, PinwheelIn, SlideInUp } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { images_food } from '../../../assets/images';
import { CoreUI, HistoryItemCard, ReservationTotals, RestaurantHeader, VectorIcon } from '../../components';
import { RestaurantHorizontalCard } from '../../components/restaurant/HorizontalCards';
import { theme } from '../../utils/constants';

interface HistoryDetailsProps {
    componentId: string;
    restaurant: any;
}

const HistoryDetails = (props: HistoryDetailsProps) => {
    const { restaurant } = props;

    const temporary_map = [
        {
            title: "Burger King",
            image: images_food.Food,
            color: theme.color.purple,
            entering: SlideInUp.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            price: "$240",
            rating: true
        },
        {
            title: "Grill",
            image: images_food.Food2,
            color: theme.color.cyanlight,
            entering: BounceIn.duration(1000),
            reactive: false,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            price: "$240",
            rating: true

        },
        {
            title: "Pizza Hut",
            image: images_food.Food3,
            color: theme.color.lightbrown,
            entering: PinwheelIn.duration(1000),
            reactive: true,
            subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
            price: "$240",
            rating: true
        },
    ]


    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner shouldRasterizeIOS renderToHardwareTextureAndroid bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                <RestaurantHeader restaurant={props.restaurant} />
                <View flex paddingT-200>
                    <View flex bg-white paddingB-20>
                        <View paddingH-15 marginT-10 row spread>
                            <Text smallmedium cyan>Menu</Text>
                            <View >
                                {restaurant.status &&
                                    <View row centerV style={styles.flexEnd}>
                                        {restaurant.status === "Completed" && <VectorIcon style={styles.check} vector={'FontAwesome'} name={'check'} size={10} color={theme.color.green} />}
                                        <Text extraSmallsemibold style={styles.heading} black>{restaurant.status}</Text>
                                    </View>
                                }
                                <Text numberOfLines={1} marginB-5 adjustsFontSizeToFit black extraVSmalllight>{moment().format('MM:HH A, MM/DD/YYYY')}</Text>
                            </View>
                        </View>
                        <View flex paddingH-15>
                            <FlashList
                                data={temporary_map}
                                renderItem={({ item }) => {
                                    return <HistoryItemCard temp={item} rating={true} type={'history'} />
                                }}
                                contentContainerStyle={styles.contentContainerStyle}
                                estimatedItemSize={100}
                            />
                        </View>
                        <ReservationTotals isHistory reservation={restaurant} />
                    </View>
                </View>

            </CoreUI.FlowContaner>
        </React.Suspense >
    );
};

export default HistoryDetails;

const styles = StyleSheet.create({
    container: {},
    heading: {
        height: 23
    },
    check: {
        marginBottom: 5,
        marginRight: 3
    },
    flexEnd: {
        alignSelf: "flex-end"
    },
    contentContainerStyle: {

    }
});
