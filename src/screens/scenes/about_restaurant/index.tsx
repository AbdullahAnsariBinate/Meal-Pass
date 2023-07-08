import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { SceneMap } from 'react-native-tab-view';
import { Text, View } from 'react-native-ui-lib';
import { CoreUI, RestaurantHeader, VectorIcon } from '../../../components';
import { theme } from '../../../utils/constants';
import About from './About';
import Reviews from './Reviews';

interface AboutRestaurantProps {
  restaurant: any;
  componentId: string;
  action: "view" | "order"
}


const HEADER_HEIGHT = 200;

const AboutRestaurant = (props: AboutRestaurantProps) => {
  const action: "view" | "order" = props.action ? props.action : "view";

  const [routes] = React.useState(
    action === "view" ? [
      { key: 'first', title: 'About' },
      { key: 'second', title: 'Reviews' },
    ] : [
      { key: 'first', title: 'About' },
    ]
  );


  const renderScene = action === "view" ? {
    first: About,
    second: Reviews,
  } : {
    first: About,
  }

  const renderheader = () => {
    return (
      <RestaurantHeader restaurant={props.restaurant} />
    )
  }

  return (
    <React.Suspense fallback={<Text>loading...</Text>} >
      <CoreUI.CollapsableHeaderTabView
        componentId={props.componentId}
        headerHeight={200}
        routes={routes}
        scenes={renderScene}
        HeaderComponent={renderheader}
        action={props.action}
        restaurant={props.restaurant}
        shouldHideBottomTab={props.action === "order"}
      />
    </React.Suspense>
  );
};

export default AboutRestaurant;

const styles = StyleSheet.create({
  container: {}
});
