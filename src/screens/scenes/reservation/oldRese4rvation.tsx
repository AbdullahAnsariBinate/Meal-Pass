import * as React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { SceneMap, TabBar } from 'react-native-tab-view';
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import { Text, View } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import { CoreUI, VectorIcon } from '../../../components';
import { theme } from '../../../utils/constants';
import Animated from 'react-native-reanimated';
import { useServices } from '../../../services';
import { screens } from '../..';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';
import ReservationOptions from './ReservationOptions';
import RenderCount from 'react-native-render-count'





interface AboutRestaurantProps {
    restaurant: any;
    componentId: string;
    action: "view" | "order"
}


const initialLayout = { width: Dimensions.get('window').width };

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

    const renderScene = SceneMap({
        first: ReservationOptions,
    });

    //  entering={FadeIn.delay(300)} 
    const renderheader = () => {
        const DEFAULT_IMAGE = Image.resolveAssetSource(props.restaurant.image);

        return (
            <View height={200} width={"100%"}>
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


    const onActionPressed = (event: "continue") => {
        switch (event) {
            case "continue":
                // screens.push(props.componentId, "AboutRestaurant", { action: "order", restaurant: props.restaurant }, {
                //     animations: {
                //         push: {
                //             waitForRender: true,
                //             sharedElementTransitions: [
                //                 {
                //                     fromId: 'menu',
                //                     toId: 'menu',
                //                     interpolation: {
                //                         type: "overshoot"
                //                     }
                //                 }
                //             ],
                //         },
                //         pop: {
                //             waitForRender: true,
                //             sharedElementTransitions: [
                //                 {
                //                     fromId: 'menu',
                //                     toId: 'menu',
                //                     interpolation: {
                //                         type: "overshoot"
                //                     }

                //                 }
                //             ],
                //         }
                //     }
                // })
                break;
        }
    }


    useNavigationComponentDidAppear(
        (e) => {
            nav.setBottomTabAction("Continue", onActionPressed.bind(null, "continue"))
        },
        { componentId: props.componentId }
    )

    React.useEffect(() => {
        nav.setBottomTabAction("Continue", onActionPressed.bind(null, "continue"))


        return () => {
            nav.removeBottomTabAction()

        }
    }, [' ']);



    // @ts-ignore
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.color.cyan, width: 100, marginLeft: "8%", height: 3 }}
            style={{ backgroundColor: theme.color.lightgray, height: action === "order" ? 0 : 45 }}
            labelStyle={{ color: theme.color.gray, fontFamily: theme.font.semibold }}
            activeColor={theme.color.black}
        />
    );

    // bottomTabShouldHide={action === "order"}
    return (
        <CoreUI.FlowContaner flex extraProps={{ action: props.action }} disableScroll componentId={props.componentId}>
            {__DEV__ && <RenderCount />}

            <CollapsibleHeaderTabView
                headerHeight={200}
                renderScrollHeader={renderheader.bind(null)}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={() => { }}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
                scrollEnabled={!(props.action === "view")}
            />
        </CoreUI.FlowContaner>
    );
};

export default AboutRestaurant;

const styles = StyleSheet.create({
    container: {},
});
