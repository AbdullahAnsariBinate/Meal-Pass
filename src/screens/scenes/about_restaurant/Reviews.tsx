import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { ReviewCard } from '../../../components';
import moment from 'moment'
import { getRandomFullName, getRandomImageUrl, useStateContext } from '../../../utils/help';
import { useRef } from 'react';
import { NavigationProps } from '../../../utils/types';
// @ts-ignore
import RenderCount from 'react-native-render-count'
import { useStores } from '../../../stores';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { FlashList } from '@shopify/flash-list';

const AnimatedRecyclerList = Animated.createAnimatedComponent(FlashList);

interface ReviewsProps {
  route: { key: string, title: string }
}
const AnimatedVew = Animated.createAnimatedComponent(View);

const Reviews = (props: ReviewsProps) => {
  const { ui } = useStores();
  const state: NavigationProps = useStateContext<NavigationProps>() as NavigationProps;
  const img = getRandomImageUrl();
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


  // @ts-ignore
  const renderItem = (item) => {
    const temp = {
      image: img,
      full_name: getRandomFullName(),
      date: moment().format("MMM DD,YYYY"),
      color: "gray"
    }


    return (
      <ReviewCard temp={temp} type={'features'} rating={false} />
    )
  }

  return (
    <AnimatedRecyclerList
      // {...state.extraProps.listPanResponder.panHandlers}
      contentContainerStyle={{ paddingTop: state.extraProps.paddingTop + 10 }}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentOffset={{ y: initailOffset.current, x: 0 }}
      onMomentumScrollBegin={state.extraProps.onMomentumScrollBegin}
      onScrollEndDrag={state.extraProps.onScrollEndDrag}
      onMomentumScrollEnd={state.extraProps.onMomentumScrollEnd}
      ref={onReferenceSet.bind(null)}
      data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
      renderItem={renderItem.bind(null)}

    />
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {

  },
  contentContainerStyle: {
  }
});
