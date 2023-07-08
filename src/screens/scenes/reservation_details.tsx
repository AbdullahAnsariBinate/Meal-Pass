import { FlashList } from '@shopify/flash-list';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BounceIn, PinwheelIn, SlideInUp } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { images_food } from '../../../assets/images';
import { CoreUI, ReservationItemCard, ReservationTotals, RestaurantHeader, VectorIcon } from '../../components';
import { RestaurantHorizontalCard } from '../../components/restaurant/HorizontalCards';
import { theme } from '../../utils/constants';

interface ReservationDetailsProps {
  componentId: string;
  reservation: any;
}

const ReservationDetails = (props: ReservationDetailsProps) => {
  const { reservation } = props;

  const temporary_map = [
    {
      title: "Burger King",
      image: images_food.Food,
      color: theme.color.purple,
      entering: SlideInUp.duration(1000),
      reactive: false,
      subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
      price: "$240",
    },
    {
      title: "Grill",
      image: images_food.Food2,
      color: theme.color.cyanlight,
      entering: BounceIn.duration(1000),
      reactive: false,
      subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
      price: "$240",

    },
    {
      title: "Pizza Hut",
      image: images_food.Food3,
      color: theme.color.lightbrown,
      entering: PinwheelIn.duration(1000),
      reactive: true,
      subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
      price: "$240",

    },
    // {
    //   title: "Ice cream",
    //   image: images_food.Food4,
    //   color: theme.color.lightblue,
    //   entering: SlideInUp.duration(1000),
    //   reactive: false,
    //   subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
    //   price: "$240",
    // },
  ]


  return (
    <React.Suspense fallback={<Text>Loading</Text>}>
      <CoreUI.FlowContaner shouldRasterizeIOS renderToHardwareTextureAndroid bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={styles.container}>
        <RestaurantHeader restaurant={props.reservation} />
        <View flex paddingT-200>
          <View row>
            <View row height={45} centerV flex bg-lightgray paddingH-30>
              <VectorIcon vector={'FontAwesome'} name={'phone'} size={20} color={theme.color.cyan} />
              <Text marginL-10 smallmedium cyan>Contact US</Text>
            </View>
            <View row height={45} centerV flex bg-lightgray paddingH-30>
              <VectorIcon vector={'Entypo'} name={'location-pin'} size={20} color={theme.color.cyan} />
              <Text marginL-10 smallmedium cyan>Location</Text>
            </View>
          </View>

          <View flex bg-white paddingB-20>
            <View paddingH-10 marginT-10 row spread>
              <Text smallmedium cyan>Items</Text>
              <View >
                {reservation.status &&
                  <View row centerV style={styles.flexEnd}>
                    {reservation.status === "Completed" && <VectorIcon style={styles.check} vector={'FontAwesome'} name={'check'} size={10} color={theme.color.green} />}
                    <Text extraSmallsemibold style={styles.heading} orange={reservation.status === "Pending"} green={reservation.status === "Completed"} red={reservation.status === "Canceled"}>{reservation.status}</Text>
                  </View>
                }
                <Text numberOfLines={1} marginB-5 adjustsFontSizeToFit black extraVSmalllight>{moment().format('MM:HH A, MM/DD/YYYY')}</Text>
              </View>
            </View>
            <View height={220}>
              <FlashList
                data={temporary_map}
                renderItem={({ item }) => {
                  return <ReservationItemCard temp={item} rating={false} />
                }}
                contentContainerStyle={styles.contentContainerStyle}
                estimatedItemSize={100}
              />
            </View>
            <ReservationTotals reservation={reservation} />
          </View>
        </View>

      </CoreUI.FlowContaner>
    </React.Suspense >
  );
};

export default ReservationDetails;

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
