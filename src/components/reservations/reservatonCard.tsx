import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet, Text as RNTExt } from 'react-native';
import FastImage from 'react-native-fast-image';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { images_food } from '../../../assets/images';
import { screens } from '../../screens';
import { useServices } from '../../services';
import { theme } from '../../utils/constants';
import { useStateContext } from '../../utils/help';
import { action_keys, NavigationProps } from '../../utils/types';
import VectorIcon from '../utils/Vector';

type Props = MarginModifiers & {
    temp: any;
    type: "features" | "favourites"
    rating: boolean;
    action?: "view" | "order"
};

const ReservationCard: React.FC<Props> = ({ temp, type, rating, ...modifiers }) => {

    const state: NavigationProps = useStateContext<NavigationProps>() as NavigationProps;

    const { events } = useServices();

    const onPress = (action: action_keys) => {
        const _state = {
            componentId: state.componentId,
        } as NavigationProps;


        events.onEventPressed(action, _state, undefined, {
            reservation: temp
        });
    }


    return (
        <Bounceable activeScale={.98} disabled={state.extraProps?.action === "order"} onPress={onPress.bind(null, 'to_reservation_details')}>
            <View row key={temp.title} marginB-10 width={"100%"} paddingL-10 paddingT-10 height={100} bg-white  {...modifiers} style={[styles({ color: temp.color }).radius, styles({ color: temp.color }).shadow, styles({ color: temp.color }).overflowHide]} >
                <FastImage resizeMode='cover' source={temp.image} style={[styles({}).img, styles({}).radius]} />
                <View flex paddingL-15>
                    <View row spread paddingR-10 >
                        <Text smallsemibold style={styles({}).heading} cyan>{temp.title}</Text>

                        {temp.status &&
                            <View row centerV>
                                {temp.status === "Completed" && <VectorIcon style={styles({}).check} vector={'FontAwesome'} name={'check'} size={10} color={theme.color.green} />}
                                <Text extraSmallsemibold style={styles({}).heading} orange={temp.status === "Pending"} green={temp.status === "Completed"} red={temp.status === "Canceled"}>{temp.status}</Text>
                            </View>
                        }


                    </View>

                    <View flex row>
                        <View paddingR-23 width={"50%"} >
                            <Text numberOfLines={1} black extraVSmalllight>{`Table No. ${temp.table}`}</Text>
                            <Text numberOfLines={1} black extraVSmalllight>{`No. of Person  ${2}`}</Text>
                            <Text numberOfLines={1} black extraVSmalllight>{`${2} Items`}</Text>
                        </View>
                        <View pointerEvents='none' height={58} centerH flex >
                            <Text numberOfLines={1} marginB-5 adjustsFontSizeToFit black extraVSmalllight>{moment().format('MM:HH A, MM/DD/YYYY')}</Text>
                            <ScrollView horizontal>
                                {[0, 0, 0, 0, 0, 0].map((value, index) => {

                                    if (index > 2) {
                                        return null;
                                    }
                                    return (
                                        <View width={40} bg-cyan marginR-5 style={[styles({}).radiusLess, styles({}).overflowHide]}>
                                            <FastImage source={images_food.Food} style={StyleSheet.absoluteFill} />
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>


                </View>
            </View>
        </Bounceable >
    );
};


export default ReservationCard;

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
    check: {
        marginBottom: 5,
        marginRight: 3
    },
    overflowHide: {
        overflow: "hidden"
    }
});
