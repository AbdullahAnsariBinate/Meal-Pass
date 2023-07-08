import * as React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MarginModifiers, Text, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { theme } from '../../utils/constants';
import { action_keys } from '../../utils/types';

type Props = MarginModifiers & {
    temp: any;
    rating: boolean;
    action?: "view" | "order"
};

const ReservationItemCard = (props: Props) => {
    const { temp, ...modifiers } = props;

    const onPress = (action: action_keys) => {
    }


    return (
        <Bounceable activeScale={.98} onPress={onPress.bind(null, 'to_reservation_details')}>
            <View row key={temp.title} marginB-10 width={"100%"} paddingL-10 paddingT-10 height={60} bg-white  {...modifiers} style={[styles.radius, styles.shadow, styles.overflowHide]} >
                <FastImage resizeMode='cover' source={temp.image} style={[styles.img, styles.radius]} />
                <View flex row spread paddingH-15>
                    <View>
                        <Text smallsemibold style={styles.heading} black>{temp.title}</Text>
                        <Text smallmedium style={styles.heading} gray>{'Cheese Flavour'}</Text>
                    </View>

                    {temp.price &&
                        <Text cyan smallsemibold style={styles.heading}>{temp.price}</Text>
                    }
                </View>

            </View>
        </Bounceable>
    );
};

export default React.memo(ReservationItemCard);

const styles = StyleSheet.create({
    radius: {
        borderRadius: 5
    },
    radiusLess: {
        borderRadius: 10,
    },
    shadow: {
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 5.62,
        // elevation: 7,
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
        width: 50,
        height: 50
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
