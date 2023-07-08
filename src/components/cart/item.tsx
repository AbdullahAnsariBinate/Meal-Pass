import * as React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';
import { Shadow } from 'react-native-shadow-2';
import { theme } from '../../utils/constants';
import { Swipeable } from 'react-native-gesture-handler';
import { VectorIcon } from '..';
import { Bounceable } from 'rn-bounceable';

interface itemBoxProps {
    item: any;
}

const itemBox = (props: itemBoxProps) => {


    const renderRightContainer = () => {
        return (
            <Bounceable>
                <View height={100} width={100} marginR-10 center>
                    <View width={'80%'} height={'80%'} bg-cyan center style={[styles.radius, styles.opacity]}>
                        <VectorIcon vector={'FontAwesome5'} name={'trash'} size={30} color={theme.color.cyan} />
                    </View>
                </View>
            </Bounceable>
        )
    }

    return (
        <Swipeable renderRightActions={renderRightContainer.bind(null)} containerStyle={[styles.container]}>
            <View renderToHardwareTextureAndroid shouldRasterizeIOS row width={"92%"} height={"96%"} paddingH-10 centerV bg-white style={[styles.center, styles.shadowContainer]}>
                <FastImage style={styles.img} source={props.item.image} />
                <View flex marginH-20>
                    <Text smallbold black>{props.item.title}</Text>
                    <Text smallbold cyan>{props.item.price}</Text>
                </View>

                <View center paddingV-10 height={"80%"} width={40} bg-white style={[styles.shadowContainer, styles.radius, styles.border]}>
                    <View height={15}>
                        <VectorIcon vector={'FontAwesome'} name={'plus'} size={12} color={theme.color.black} />
                    </View>
                    <View flex center>
                        <Text smallbold cyan>{props.item.quantity}</Text>
                    </View>
                    <View height={15}>
                        <VectorIcon vector={'FontAwesome'} name={'minus'} size={12} color={theme.color.black} />
                    </View>
                </View>
            </View>
        </Swipeable>
    )
};

export default React.memo(itemBox);
// backgroundColor: "white", 
const styles = StyleSheet.create({
    container: { height: 120, width: "100%", },
    center: {
        alignSelf: "center",
        borderRadius: 10
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    shadowContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    radius: {
        borderRadius: 10
    },
    border: {
        borderWidth: .5,
        borderColor: theme.color.lightgray
    },
    opacity: {
        backgroundColor: "rgba(26, 141, 141, .1)"
    }
});
