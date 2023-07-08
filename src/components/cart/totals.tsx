import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { MarginModifiers, PaddingModifiers, Switch, Text, View } from 'react-native-ui-lib';
import { FlexModifiers } from 'react-native-ui-lib/src/commons/modifiers';

type Props = MarginModifiers & FlexModifiers & PaddingModifiers & {
    //   label?: string;
    //   onPress?: PureFunc;
};

const CartTotals = (props: Props) => {
    return (
        <View marginV-10 width={"92%"} style={styles.container}>
            <View row flex spread>
                <Text smallmedium gray>Contactless Delivery</Text>
                <Switch />
            </View>


            <View marginT-10 row flex spread>
                <Text smallmedium gray>Subtotal</Text>
                <Text smallbold gray>$10.30</Text>
            </View>
            <View row flex spread>
                <Text smallmedium gray>Tax & Fee</Text>
                <Text smallbold gray>$103.00</Text>
            </View>
            <View row flex spread>
                <Text smallmedium gray>Delivery</Text>
                <Text smallbold gray>Free</Text>
            </View>
            <View marginB-5 row flex spread>
                <Text smallmedium gray>Tip</Text>
                <Text smallbold gray>$10.00</Text>
            </View>
            <Divider />
            <View marginT-5 row flex spread>
                <Text mediumbold gray>Total</Text>
                <Text mediumbold cyan>$1045.00</Text>
            </View>
        </View>
    );
};

export default CartTotals;

const styles = StyleSheet.create({
    container: {
        alignSelf: "center"
    }
});
