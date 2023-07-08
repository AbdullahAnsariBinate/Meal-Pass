import * as React from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { SceneMap, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import { HScrollView, HFlatList, HSectionList } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import { Text, View } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import About from './About';
import Reviews from './Reviews';
import { CoreUI, VectorIcon } from '../../../components';
import { theme } from '../../../utils/constants';
import Animated, { Extrapolation, FadeIn, interpolate, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useServices } from '../../../services';
import { screens } from '../..';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';

import RenderCount from 'react-native-render-count'
import { FlashList } from '@shopify/flash-list';




interface AboutRestaurantProps {
    restaurant: any;
    componentId: string;
    action: "view" | "order"
}

const AnimatedTabBar = Animated.createAnimatedComponent(TabBar);

const initialLayout = { width: Dimensions.get('window').width };
const HEADER_HEIGHT = 200;
const TAB_BAR_HEADER_HEIGHT = 45;
const AnimatedView = Animated.createAnimatedComponent(View);



const AboutRestaurant = (props: AboutRestaurantProps) => {
    const action: "view" | "order" = props.action ? props.action : "view";


    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState(
        action === "view" ? [
            { key: 'first', title: 'About' },
            { key: 'second', title: 'Reviews' },
        ] : [
            { key: 'first', title: 'About' },
        ]
    );

    const scrollYValue = useSharedValue(0);

    React.useEffect(() => {
        // setTimeout(() => {
        //   scrollYValue.value = withTiming(0, { duration: 3000 });
        // }, 4000);
    }, [' '])

    const renderScene = action === "view" ? SceneMap({
        first: About,
        second: Reviews,
    }) : SceneMap({
        first: About,
    });

    //  entering={FadeIn.delay(300)} 
    const renderheader = () => {
        const DEFAULT_IMAGE = Image.resolveAssetSource(props.restaurant.image);

        return (
            <View height={HEADER_HEIGHT} width={"100%"} absT>
                <FastImage nativeID={'restaurant_image' + props.restaurant.id} resizeMode='cover' style={StyleSheet.absoluteFill} source={DEFAULT_IMAGE} />
                <AnimatedView width={"100%"} height={55} backgroundColor={'rgba(0,0,0,.4)'} absB marginB-0 paddingH-10>
                    <Text white mediumbold>{props.restaurant.title}</Text>
                    <View height={20} width={200} row paddingT-2>
                        {[0, 0, 0, 0, 0].map(() => {
                            return (
                                <VectorIcon vector="FontAwesome" name={'star'} size={15} color={theme.color.starorange} />
                            )
                        })}
                        <Text extraSmallmedium white> {" "}(4.9) (255 Reviews)</Text>
                    </View>
                </AnimatedView>
            </View>
        )
    }


    const { nav } = useServices();


    const onActionPressed = (event: "order" | "review" | "reservation") => {
        switch (event) {
            case "order":
                screens.push(props.componentId, "AboutRestaurant", { action: "order", restaurant: props.restaurant }, {
                    animations: {
                        push: {
                            waitForRender: true,
                            sharedElementTransitions: [
                                {
                                    fromId: 'menu',
                                    toId: 'menu',
                                    interpolation: {
                                        type: "overshoot"
                                    }
                                }
                            ],
                        },
                        pop: {
                            waitForRender: true,
                            sharedElementTransitions: [
                                {
                                    fromId: 'menu',
                                    toId: 'menu',
                                    interpolation: {
                                        type: "overshoot"
                                    }

                                }
                            ],
                        }
                    }
                })
                break;
            case "review":

                break;
            case "reservation":
                screens.push(props.componentId, "Reservation", { action: "order", restaurant: props.restaurant })
                break;
        }
    }


    useNavigationComponentDidAppear(
        (e) => {
            if (props.action === "view" || !props.action) {
                switch (index) {
                    case 0:
                        nav.setBottomTabAction("Order Now", onActionPressed.bind(null, "order"))
                        break;
                    case 1:
                        nav.setBottomTabAction("Post Review", onActionPressed.bind(null, "review"))
                        break;
                }
                return () => {
                    nav.removeBottomTabAction()
                }
            } else if (props.action === "order") {
                nav.setBottomTabAction("Book Reservation", onActionPressed.bind(null, "reservation"))
            }
        },
        { componentId: props.componentId }
    )



    React.useEffect(() => {
        if (props.action === "view" || !props.action) {
            switch (index) {
                case 0:
                    nav.setBottomTabAction("Order Now", onActionPressed.bind(null, "order"))
                    break;
                case 1:
                    nav.setBottomTabAction("Post Review", onActionPressed.bind(null, "review"))
                    break;
            }
            return () => {
                nav.removeBottomTabAction()
            }
        } else if (props.action === "order") {
            nav.setBottomTabAction("Book Reservation", onActionPressed.bind(null, "reservation"))
        }
    }, [index]);

    const renderTabBar = (props: any) => {





        const AnimatedYPositionStyle = useAnimatedStyle(() => {
            const YPosition = interpolate(scrollYValue.value,
                [0, HEADER_HEIGHT],
                [HEADER_HEIGHT, 0],
                { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP }
            );


            return {
                top: YPosition
            }
        })


        return (
            <AnimatedView style={[{ position: "absolute", width: "100%", zIndex: 1000 }, AnimatedYPositionStyle]}>
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: theme.color.cyan, width: 100, marginLeft: "8%", height: 3 }}
                    style={[{ backgroundColor: theme.color.lightgray, height: action === "order" ? 0 : TAB_BAR_HEADER_HEIGHT }]}
                    labelStyle={{ color: theme.color.gray, fontFamily: theme.font.semibold }}
                    activeColor={theme.color.black}
                />
            </AnimatedView>
        )
    }

    // bottomTabShouldHide={action === "order"} setIndex
    return (
        <CoreUI.FlowContaner flex extraProps={{ action: props.action, headerHeight: HEADER_HEIGHT, tabBarheight: TAB_BAR_HEADER_HEIGHT, scrollYValue: scrollYValue }} disableScroll componentId={props.componentId}>
            {renderheader()}

            <TabView
                key={'TabViewRestaurantPage'}
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                initialLayout={initialLayout}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />

            {/* {__DEV__ && <RenderCount />} */}

            {/* <CollapsibleHeaderTabView
        headerHeight={200}
        renderScrollHeader={renderheader.bind(null)}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        scrollEnabled={!(props.action === "view")}
      /> */}
        </CoreUI.FlowContaner>
    );
};

export default AboutRestaurant;

const styles = StyleSheet.create({
    container: {},
});
