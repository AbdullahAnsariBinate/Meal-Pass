import { PropTypes } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { FadeIn, FlipInXUp } from 'react-native-reanimated';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { useServices } from '../../services';
import { theme } from '../../utils/constants';
import { useStateContext } from '../../utils/help';
import { action_keys, NavigationProps } from '../../utils/types';
import VectorIcon from '../utils/Vector';

type Props = MarginModifiers & {
    temp: any;
    type: "features" | "favourites",
};

const AnimatedView = Animated.createAnimatedComponent(View);

const RestaurantCard: React.FC<Props> = ({ temp, type, ...modifiers }) => {
    const state: NavigationProps = useStateContext<NavigationProps>() as NavigationProps;

    const { events } = useServices();

    const onPress = (action: action_keys) => {
        const _state = {
            componentId: state.componentId,
            options: {
                animations: {
                    push: {
                        waitForRender: true,
                        sharedElementTransitions: [
                            {
                                fromId: 'restaurant_image' + temp.id,
                                toId: 'restaurant_image' + temp.id,
                                interpolation: {
                                    type: "overshoot"
                                }
                            }
                        ]
                    },
                    pop: {
                        waitForRender: true,
                        sharedElementTransitions: [
                            {
                                fromId: 'restaurant_image' + temp.id,
                                toId: 'restaurant_image' + temp.id,
                                interpolation: {
                                    type: "overshoot"
                                }
                            }
                        ]
                    }
                }
            }
        } as NavigationProps;

        events.onEventPressed(action, _state, undefined, { restaurant: temp });
    }

    return (
        <Bounceable onPress={onPress.bind(null, 'restaurant_page_navigate')}>
            <AnimatedView renderToHardwareTextureAndroid shouldRasterizeIOS entering={FadeIn} key={temp.title} marginR-10 marginB-10 width={280} padding-10 height={220} bg-cyan={type === "features"} bg-white={type === "favourites"}  {...modifiers} style={[styles({ color: temp.color }).radius, styles({ color: temp.color }).shadow]} >
                <View width={"100%"} height={"65%"} marginB-5 backgroundColor={temp.color} style={[styles({ color: temp.color }).radius, styles({ color: temp.color }).shadow]} >
                    <FastImage nativeID={'restaurant_image' + temp.id} resizeMode='cover' source={temp.image} style={[StyleSheet.absoluteFill, styles({}).radius]} />
                </View>

                <Text marginL-5 white={type === "features"} black={type === "favourites"} smallsemibold style={styles({}).heading}>{temp.title}</Text>
                <Text marginL-5 marginB-5 white={type === "features"} black={type === "favourites"} extraVSmalllight>{temp.subline}</Text>

                <View height={50} row spread marginB-10>
                    <View height={20} width={95} row paddingL-5 paddingT-2>
                        {[0, 0, 0, 0, 0].map(() => {
                            return (
                                <VectorIcon vector="FontAwesome" name={'star'} size={15} color={theme.color.starorange} />
                            )
                        })}
                        <Text extraSmallmedium white={type === "features"} black={type === "favourites"}> {" "}(4.9)</Text>
                    </View>
                    <View row marginL-18>
                        <View marginR-5 row spread centerV paddingH-8 paddingR-15 width={70} height={22} marginB-10 style={[styles({}).radiusLess, styles({}).bgGray, styles({}).posTop]}>
                            <VectorIcon vector="Entypo" name={'location-pin'} size={15} color={theme.color.cyan} />
                            <Text extraSmallmedium marginT-2 black>245m</Text>
                        </View>
                        <View marginR-5 row spread centerV paddingH-8 paddingR-15 width={70} height={22} marginB-10 style={[styles({}).radiusLess, styles({}).bgGray, styles({}).posTop]}>
                            <VectorIcon vector="Entypo" name={'clock'} size={15} color={theme.color.cyan} />
                            <Text extraSmallmedium marginT-2 black> 45 min</Text>
                        </View>
                    </View>
                </View>
            </AnimatedView>
        </Bounceable >
    );
};

export default RestaurantCard;


const styles = (props: any) => StyleSheet.create({
    radius: {
        borderRadius: 20
    },
    radiusLess: {
        borderRadius: 10,
    },
    shadow: {
        shadowColor: props.color,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 7,
        // backgroundColor:theme.color.cyan
    },
    contentContainerStyle: {
        paddingHorizontal: 10
    },
    heading: {
        height: 23
    },
    bgGray: {
        backgroundColor: theme.color.lightgray
    },
    posTop: {
        top: -1
    }
});
