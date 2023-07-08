import React from 'react';
import { Alert, StyleSheet, Text as RNTExt } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider } from 'react-native-paper';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { screens } from '../../screens';
import { useServices } from '../../services';
import { theme } from '../../utils/constants';
import { useStateContext } from '../../utils/help';
import { action_keys, NavigationProps } from '../../utils/types';
import VectorIcon from '../utils/Vector';

type Props = MarginModifiers & {
    temp: any;
    type: "features" | "favourites" | "history"
    rating: boolean;
    action?: "view" | "order"
};

const HistoryItemCard: React.FC<Props> = ({ temp, type, rating, ...modifiers }) => {

    const state: NavigationProps = useStateContext<NavigationProps>() as NavigationProps;

    const { events } = useServices();

    const onPress = (action: action_keys) => {
        const _state = {
            componentId: state.componentId,
        } as NavigationProps;


        events.onEventPressed(action, _state, undefined, {
            restaurant: temp
        });
    }


    return (
        <Bounceable disabled={state.extraProps?.action === "order"} onPress={onPress.bind(null, 'restaurant_dish_navigate')}>
            <View row key={temp.title} marginR-10 marginB-10 width={"100%"} padding-10 height={95} bg-white  {...modifiers} style={[styles({ color: temp.color }).radius, styles({ color: temp.color }).shadow]} >
                <FastImage resizeMode='cover' source={temp.image} style={[styles({}).img, styles({}).radius]} />
                <View flex paddingH-15>
                    <View row spread paddingR-0 >
                        <Text black smallsemibold style={styles({}).heading}>{temp.title}</Text>


                    </View>

                    <View row spread paddingR-23 width={"90%"}>
                        <Text numberOfLines={rating ? 2 : 2} marginB-5 black extraVSmalllight style={{ maxWidth: "100%" }}>{`He heard the song coming from a distance, lightly floating over the air to his ears. Although it was soft and calming, he was wary. It seemed a little too soft and a little too calming for everything that was going on. He wanted it to be nothing more than beautiful music coming from the innocent and pure joy of singing, but in the back of his mind, he knew it was likely some type of trap.`}</Text>
                    </View>

                    {state.extraProps?.action === "order" &&
                        <Bounceable contentContainerStyle={styles({}).cartBtn}>
                            <View width={"100%"} height={"100%"} center bg-cyan absH>
                                <VectorIcon vector={'Entypo'} name={'plus'} size={20} color={theme.color.white} />
                            </View>
                        </Bounceable>
                    }

                    <View row>
                        {rating && <View height={40} row spread marginB-10>
                            <View height={20} width={45} row paddingL-0 paddingT-0>
                                {[0].map(() => {
                                    return (
                                        <VectorIcon vector="FontAwesome" name={'star'} size={15} color={theme.color.starorange} />
                                    )
                                })}
                                <Text extraSmallmedium black> {" "}4.9</Text>
                            </View>
                        </View>}

                        <Divider style={styles({ color: theme.color.bg }).divider} />

                        <Text cyan smallsemibold={type !== "history"} extraSmallmedium={type === "history"} style={styles({}).heading}>{temp.price}</Text>

                    </View>

                </View>
            </View>
        </Bounceable>
    );
};

export default HistoryItemCard;


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
    },
    img: {
        width: 75,
        height: 75
    },
    cartBtn: {
        marginRight: 10,
        borderRadius: 20,
        position: "absolute",
        right: 5,
        bottom: 5,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    divider: { width: 1, height: '30%', marginHorizontal: 10, marginTop: 3 }
});
