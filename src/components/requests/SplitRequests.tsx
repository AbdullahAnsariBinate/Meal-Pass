import * as React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider } from 'react-native-paper';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';

interface SplitRequestsProps {
    item: any;
    type: "active" | "inactive"
}

const SplitRequests = (props: SplitRequestsProps) => {
    const { item, type } = props;
    return (
        <View padding-10 marginV-5 bg-white height={type === "active" ? 300 : 220} style={[styles.container, styles.shadow, styles.radius]}>
            <View spread row height={75}>
                <FastImage resizeMode='cover' source={item.image} style={[styles.img, styles.radius]} />
                <View flex paddingL-10 >
                    <Text black smallsemibold style={styles.heading}>{item.title}</Text>
                    <Text cyan smallsemibold style={styles.heading} marginT-5>{item.price}</Text>
                </View>
                <Text extraLargebold cyan>2{" "}</Text>
            </View>



            <View height={80} flex>
                <View row flex spread>
                    <Text smallmedium gray>Subtotal</Text>
                    <Text smallmedium gray>$10.30</Text>
                </View>
                <View row flex spread>
                    <Text smallmedium gray>Tax & Fee</Text>
                    <Text smallmedium gray>$103.00</Text>
                </View>
                <View row flex spread>
                    <Text smallmedium gray>Delivery</Text>
                    <Text smallmedium gray>Free</Text>
                </View>
                <View marginB-5 row flex spread>
                    <Text smallmedium gray>Tip</Text>
                    <Text smallmedium gray>$10.00</Text>
                </View>
                <Divider />
                <View marginT-5 row flex spread>
                    <Text mediumbold gray>Total</Text>
                    <Text mediumbold cyan>$1045.00</Text>
                </View>

            </View>


            {type === "active" && <View height={40} paddingH-10 marginT-20 marginB-10 row>
                <TouchableOpacity activeOpacity={.98} flex center bg-gray height={40} paddingH-20 marginH-5 style={styles.radius}>
                    <Text white>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.98} flex center bg-cyan height={40} paddingH-20 marginH-5 style={styles.radius}>
                    <Text white>Accept</Text>
                </TouchableOpacity>
            </View>}
        </View>
    );
};

export default SplitRequests;

const styles = StyleSheet.create({
    container: {},
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    radius: {
        borderRadius: 10
    },
    img: {
        width: 65,
        height: 65
    },
    heading: {
        height: 23
    },
});
