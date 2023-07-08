import * as React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import Animated, { BounceIn, PinwheelIn, SlideInUp, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { images_food, images_logo_restaurants } from '../../../../assets/images';
import { RestaurantHorizontalCard } from '../../../components/restaurant/HorizontalCards';
import { theme } from '../../../utils/constants';
import { getRandomParagraph, useStateContext } from '../../../utils/help';
import { NavigationProps } from '../../../utils/types';

// @ts-ignore
import RenderCount from 'react-native-render-count'
import { useRef } from 'react';
import { useStores } from '../../../stores';
import { WalletCard } from '../../../components';

interface ReceivedProps {
    scrollYValue: any;
    route: { key: string, title: string }
}

const Received = (props: ReceivedProps) => {
    const { ui } = useStores();
    const state: NavigationProps = useStateContext<NavigationProps>() as NavigationProps;

    const received = [
        {
            title: "Burger King",
            date: "15-Aug-2021",
            icon: images_logo_restaurants.BurgerKing,
            text: "Lorem Ipsum address, New York. USA",
            price: "$10"
        },
        {
            title: "Pizza Hut",
            date: "15-Aug-2021",
            icon: images_logo_restaurants.PizzaHut,
            text: "Lorem Ipsum address, New York. USA",
            price: "$10"
        },
        {
            title: "Subway",
            date: "15-Aug-2021",
            icon: images_logo_restaurants.Subway,
            text: "Lorem Ipsum address, New York. USA",
            price: "$10"
        },
        {
            title: "KFC",
            date: "15-Aug-2021",
            icon: images_logo_restaurants.Kfc,
            text: "Lorem Ipsum address, New York. USA",
            price: "$10"
        }
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
            <View paddingT-20 paddingH-15 >
                {ui.isDevMode && <RenderCount />}
                <View marginT-10 nativeID='menu'>
                    {received && received.map((received) => {
                        return (
                            <WalletCard received={received} />
                        )
                    })}
                </View>
            </View>
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

export default Received;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 80
    },
    contentContainerStyle: {
        paddingBottom: 120
    }
});
