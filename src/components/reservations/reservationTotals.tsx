import * as React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { Text, View } from 'react-native-ui-lib';

interface ReservationTotalsProps {
    reservation: any;
    isHistory?: boolean;
}

const ReservationTotals = (props: ReservationTotalsProps) => {
    const { reservation, isHistory } = props;
    return (
        <View height={isHistory ? 160 : 200} paddingH-10>
            <View flex width={"100%"} height={"100%"} bg-white style={[styles.shadow, styles.radius]}>
                <View flex padding-10 >
                    {!isHistory && <View marginT-10 row flex spread>
                        <Text smallmedium gray>Table No</Text>
                        <Text smallbold gray>{reservation.table}</Text>
                    </View>}
                    {!isHistory && <View row flex spread>
                        <Text smallmedium gray>No. Of Persons</Text>
                        <Text smallbold gray>{'2'}</Text>
                    </View>}
                    <View row flex spread>
                        <Text smallmedium gray>Subtotal</Text>
                        <Text smallbold gray>S590.00</Text>
                    </View>
                    <View marginB-5 row flex spread>
                        <Text smallmedium gray>Tax & Fee</Text>
                        <Text smallbold gray>$5.00</Text>
                    </View>
                    <View marginB-5 row flex spread>
                        <Text smallmedium gray>Delivery</Text>
                        <Text smallbold gray>Free</Text>
                    </View>
                    <Divider />
                    <View marginT-5 row flex spread>
                        <Text mediumbold gray>Total</Text>
                        <Text mediumbold cyan>$1045.00</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ReservationTotals;

const styles = StyleSheet.create({
    container: {
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    radius: {
        borderRadius: 20,
        overflow: "hidden"
    }
});
