import * as React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import Animated, { BounceIn, PinwheelIn, SlideInUp, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { images_food } from '../../../../assets/images';
import { RestaurantHorizontalCard } from '../../../components/restaurant/HorizontalCards';
import { theme } from '../../../utils/constants';
import { getRandomParagraph, useStateContext } from '../../../utils/help';
import { NavigationProps } from '../../../utils/types';

// @ts-ignore
import RenderCount from 'react-native-render-count'
import { useRef } from 'react';
import { useStores } from '../../../stores';

interface AboutProps {
  scrollYValue: any;
  route: { key: string, title: string }
}

const AnimatedVew = Animated.createAnimatedComponent(View);
const About = (props: AboutProps) => {
  const { ui } = useStores();
  const state: NavigationProps = useStateContext<NavigationProps>() as NavigationProps;

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
    {
      title: "Ice cream",
      image: images_food.Food4,
      color: theme.color.lightblue,
      entering: SlideInUp.duration(1000),
      reactive: false,
      subline: "Lorem Ipsum Dorat, Lorem Lorem ipsum ipsum",
      price: "$240",
    },
  ]

  const initailOffset = useRef<number>(0);


  const scrollHandler = useAnimatedScrollHandler((event) => {
    initailOffset.current = event.contentOffset.y;
    state.extraProps.scrollY.value = event.contentOffset.y;
  });


  // @ts-ignore
  const onReferenceSet = (ref) => {
    if (ref) {
      state.extraProps.setChildListReference({
        key: props.route.key,
        value: ref,
      });
    }
  };


  const RenderMenu = () => {
    return (
      <AnimatedVew paddingH-15 >
        {ui.isDevMode && <RenderCount />}
        {(!state.extraProps?.action || state.extraProps?.action === "view") &&
          <View marginT-10>
            <Text cyan smallmedium>About</Text>

            <Text gray smallregular>{getRandomParagraph()}</Text>
          </View>
        }
        <View marginT-10 nativeID='menu'>
          <Text cyan marginB-5 smallmedium>Menu</Text>
          {temporary_map && temporary_map.map((temp) => {
            return (
              <RestaurantHorizontalCard toDish action={state.extraProps?.action} rating={false} temp={temp} type={'features'} />
            )
          })}
        </View>
      </AnimatedVew>
    )
  }

  const RenderMenuMemonized = React.memo(RenderMenu)
  //  minHeight: heightPercentageToDP('200%'),  minHeight: heightPercentageToDP('100%') + state.extraProps.headerHeight, style={styles.container}
  return (
    <Animated.ScrollView
      // {...state.extraProps.listPanResponder.panHandlers}
      contentContainerStyle={{ paddingTop: state.extraProps.paddingTop }}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentOffset={{ y: initailOffset.current, x: 0 }}
      onMomentumScrollBegin={state.extraProps.onMomentumScrollBegin}
      onScrollEndDrag={state.extraProps.onScrollEndDrag}
      onMomentumScrollEnd={state.extraProps.onMomentumScrollEnd}
      ref={onReferenceSet.bind(null)}
    >
      {<RenderMenuMemonized />}
    </Animated.ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80
  },
  contentContainerStyle: {
    paddingBottom: 120
  }
});
