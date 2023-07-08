import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    Platform,
    StatusBar,
} from 'react-native';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';
import Animated, { Extrapolation, interpolate, useAnimatedReaction, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { CoreUI } from '..';
import { screens } from '../../screens';
import { useServices } from '../../services';
import { theme } from '../../utils/constants';


const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;


type Props = {
    componentId: string;
    headerHeight: number;
    routes: { key: string, title: string }[];
    scenes: any;
    action: "view" | "order";
    HeaderComponent: any;
    restaurant: any;
    isCustomTabsCircular?: boolean;
    shouldHideBottomTab?: boolean;
}

const CollapsableHeaderTabView: React.FC<Props> = ({ shouldHideBottomTab, isCustomTabsCircular, action, componentId, headerHeight, routes, scenes, HeaderComponent, restaurant }) => {
    const HeaderHeight = headerHeight;
    const [tabIndex, setIndex] = useState(0);
    const [_routes] = useState(routes);
    const scrollY = useSharedValue(0);
    const listRefArr = useRef<{ key: string, value: any }[]>([]);
    const listOffset = useRef<any>({});
    const isListGliding = useRef(false);
    const _tabIndex = useRef(0);

    useAnimatedReaction(() => {
        return scrollY.value;
    }, (result, previous) => {
        if (result !== previous) {
            const curRoute = routes[_tabIndex.current].key;
            listOffset.current[curRoute] = result;
        }
    });


    const onActionPressed = (event: "order" | "review" | "reservation") => {
        switch (event) {
            case "order":
                if (false) {
                    screens.push(componentId, "AboutRestaurant", { action: "order", restaurant: restaurant }, {
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
                                    },
                                    {
                                        fromId: 'header',
                                        toId: 'header',
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
                                    },
                                    {
                                        fromId: 'header',
                                        toId: 'header',
                                        interpolation: {
                                            type: "overshoot"
                                        }
                                    }
                                ],
                            }
                        }
                    })
                } else {
                    screens.push(componentId, "OrderNow", { action: "order", restaurant: restaurant }, {
                        animations: {
                            push: {
                                waitForRender: true,
                                sharedElementTransitions: [
                                    {
                                        fromId: 'header',
                                        toId: "header",
                                    }
                                ]
                            },
                            pop: {
                                waitForRender: true,
                                sharedElementTransitions: [
                                    {
                                        fromId: 'header',
                                        toId: "header",
                                    }
                                ]
                            }
                        }
                    });
                }
                break;
            case "review":

                break;
            case "reservation":
                screens.push(componentId, "Reservation", { action: "order", restaurant: restaurant })
                break;
        }
    }



    const { nav } = useServices();

    useNavigationComponentDidAppear(
        (e) => {
            if (!shouldHideBottomTab) {
                nav.showBottomTab();
                if (action === "view" || !action) {
                    switch (tabIndex) {
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
                } else if (action === "order") {
                    nav.setBottomTabAction("Book Reservation", onActionPressed.bind(null, "reservation"))
                }
            } else if (shouldHideBottomTab) {
                nav.hideBottomTab();
            }
        },
        { componentId: componentId }
    )

    /**
     * effect
     */
    useEffect(() => {
        if (action === "view" || !action) {
            switch (tabIndex) {
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
        } else if (action === "order") {
            nav.setBottomTabAction("Book Reservation", onActionPressed.bind(null, "reservation"))
        }
    }, [routes, tabIndex]);

    /**
     *  helper functions
     */
    const syncScrollOffset = () => {
        const curRouteKey = routes[_tabIndex.current].key;
        listRefArr.current.forEach((item) => {
            if (item.key !== curRouteKey) {
                if (scrollY.value < HeaderHeight && scrollY.value >= 0) {
                    if (item.value) {

                        if (item.value.scrollTo) {
                            item.value.scrollTo({
                                x: 0,
                                y: scrollY.value,
                                animated: false,
                            });
                        }


                        if (item.value.scrollToOffset) {
                            item.value.scrollToOffset({
                                offset: scrollY.value,
                                animated: false,
                            })
                        }
                        listOffset.current[item.key] = scrollY.value;
                    }
                } else if (scrollY.value >= HeaderHeight) {
                    if (
                        listOffset.current[item.key] < HeaderHeight ||
                        listOffset.current[item.key] == null
                    ) {
                        if (item.value) {
                            if (item.value.scrollTo) {
                                item.value.scrollTo({
                                    x: 0,
                                    y: HeaderHeight,
                                    animated: false,
                                });
                            }

                            if (item.value.scrollToOffset) {
                                item.value.scrollToOffset({
                                    offset: HeaderHeight,
                                    animated: false,
                                })
                            }
                            listOffset.current[item.key] = HeaderHeight;
                        }
                    }
                }
            }
        });
    };

    const onMomentumScrollBegin = () => {
        isListGliding.current = true;
    };

    const onMomentumScrollEnd = () => {
        isListGliding.current = false;
        syncScrollOffset();
    };

    const onScrollEndDrag = () => {
        console.log(listOffset);
        syncScrollOffset();
    };


    const setChildListReference = (route: {
        key: string,
        value: any,
    }) => {
        const found = listRefArr.current.find((e) => e.key === route.key);
        if (!found) {
            listRefArr.current.push(route as never);
        }

    }

    /**
     * render Helper
     */
    const renderHeader = () => {
        const AnimatedYPositionStyle = useAnimatedStyle(() => {
            const YPosition = interpolate(scrollY.value,
                [0, HeaderHeight],
                [0, -HeaderHeight],
                { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP }
            );


            return {
                top: YPosition
            }
        })

        return (
            <Animated.View
                // {...headerPanResponder.panHandlers}
                style={[styles.header,
                    AnimatedYPositionStyle
                ]}>
                <HeaderComponent />
            </Animated.View>
        );
    };

    const renderScene = SceneMap(scenes);

    // @ts-ignore
    const renderTabBar = (props) => {
        const AnimatedYPositionStyle = useAnimatedStyle(() => {
            const YPosition = interpolate(scrollY.value,
                [0, HeaderHeight],
                [HeaderHeight, 0],
                { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP }
            );


            return {
                top: YPosition
            }
        })



        if (isCustomTabsCircular) {
            return (
                <Animated.View
                    style={[{
                        zIndex: 1,
                        position: 'absolute',
                        // transform: [{ translateY: y }],
                        width: '100%',
                        height: action === "order" ? 0 : TabBarHeight
                    },
                        AnimatedYPositionStyle
                    ]}>
                    <TabBar
                        {...props}
                        onTabPress={({ route, preventDefault }) => {
                            if (isListGliding.current) {
                                preventDefault();
                            }
                        }}
                        indicatorStyle={{ backgroundColor: theme.color.cyan, borderRadius: 50, width: "47%", marginLeft: "1%", height: "85%", top: 5 }}
                        style={[{ backgroundColor: theme.color.white, height: 60 }]}
                        labelStyle={{ color: theme.color.gray, fontFamily: theme.font.semibold, fontSize: scale(11), marginTop: 10, textTransform: "none" }}
                        activeColor={theme.color.white}
                        inactiveColor={theme.color.gray}
                    />
                </Animated.View>
            );
        } else {
            return (
                <Animated.View
                    style={[{
                        zIndex: 1,
                        position: 'absolute',
                        // transform: [{ translateY: y }],
                        width: '100%',
                        height: action === "order" ? 0 : TabBarHeight
                    },
                        AnimatedYPositionStyle
                    ]}>
                    <TabBar
                        {...props}
                        onTabPress={({ route, preventDefault }) => {
                            if (isListGliding.current) {
                                preventDefault();
                            }
                        }}
                        indicatorStyle={{ backgroundColor: theme.color.cyan, width: 100, marginLeft: "8%", height: 3 }}
                        style={[{ backgroundColor: theme.color.lightgray }]}
                        labelStyle={{ color: theme.color.gray, fontFamily: theme.font.semibold }}
                        activeColor={theme.color.black}
                    />
                </Animated.View>
            );
        }


    };

    const renderTabView = () => {
        return (
            <TabView
                onSwipeStart={() => {
                    // setCanScroll(false)}
                }}
                onSwipeEnd={() => {
                    // setCanScroll(true):
                }}
                onIndexChange={(id) => {
                    _tabIndex.current = id;
                    setIndex(id);
                }}
                navigationState={{ index: _tabIndex.current, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                initialLayout={{
                    height: 0,
                    width: windowWidth,
                }}
            />
        );
    };
    // state.extraProps.headerHeight + state.extraProps.tabBarheight
    // listPanResponder: listPanResponder,

    return (
        <CoreUI.FlowContaner
            disableScroll
            bottomTabShouldHide={shouldHideBottomTab}
            extraProps={{
                action: action,
                headerHeight: HeaderHeight,
                tabBarheight: TabBarHeight,
                tabIndex: _tabIndex,
                routes: routes,
                scrollY: scrollY,
                listRefArr: listRefArr,
                onMomentumScrollBegin: onMomentumScrollBegin,
                onScrollEndDrag: onScrollEndDrag,
                onMomentumScrollEnd: onMomentumScrollEnd,
                setChildListReference: setChildListReference,
                paddingTop: action === "order" ? headerHeight : headerHeight + TabBarHeight,
            }}
            componentId={componentId}
            isCustomBottomTabHandled
            style={styles.container}>
            {renderTabView()}
            {renderHeader()}
        </CoreUI.FlowContaner>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: theme.color.white,
    },
    label: { fontSize: 16, color: '#222' },
    tab: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#FFCC80',
        height: TabBarHeight,
    },
    indicator: { backgroundColor: '#222' },
});

export default CollapsableHeaderTabView;