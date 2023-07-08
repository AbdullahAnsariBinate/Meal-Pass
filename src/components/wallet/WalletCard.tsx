import * as React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MarginModifiers, Text, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { theme } from '../../utils/constants';
import { action_keys } from '../../utils/types';

type Props = MarginModifiers & {
    received: any;
};

const ReceivedCard = (props: Props) => {
    const { received, ...modifiers } = props;

    const onPress = (action: action_keys) => {
    }


    return (
        <Bounceable activeScale={.98} onPress={onPress.bind(null, 'to_reservation_details')}>
            <View row key={received.title} marginB-10 width={"100%"} paddingL-10 paddingT-10 height={100} bg-white  {...modifiers} style={[styles.radius, styles.shadow, styles.overflowHide]} >
                {received.icon && <FastImage resizeMode='contain' source={received.icon} style={[styles.img, styles.radius]} />}

                <View flex row spread paddingH-15>
                    <View>
                        <Text marginT-5 smallsemibold style={styles.heading} black>{received.title}</Text>
                        <Text marginT-0 extraVSmallmedium style={styles.heading} gray>{received.text}</Text>
                    </View>

                    {/* {temp.price &&
                        <Text cyan smallsemibold style={styles.heading}>{temp.price}</Text>
                    } */}
                </View>

                <View width={80}>
                    <Text marginT-5 extraVSmalllight style={styles.heading} black>{received.date}</Text>
                    <View margin-7 center width={50} height={40} bg-cyan style={styles.radius}>
                        <Text marginT-3 smallmedium style={styles.heading} white>{received.price}</Text>
                    </View>
                </View>


            </View>
        </Bounceable>
    );
};

export default React.memo(ReceivedCard);

const styles = StyleSheet.create({
    radius: {
        borderRadius: 10
    },
    radiusLess: {
        borderRadius: 10,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 2,
    },
    contentContainerStyle: {
        paddingHorizontal: 10
    },
    heading: {
        // height: 23
    },
    bgGray: {
        backgroundColor: theme.color.lightgray
    },
    posTop: {
        top: -1
    },
    img: {
        width: 80,
        height: 80
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
