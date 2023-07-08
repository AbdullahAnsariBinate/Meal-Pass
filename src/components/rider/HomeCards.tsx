import * as React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlipInXUp, FlipOutXUp } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { CoreUI } from '..';
import { images_rider_home } from '../../../assets/images';

interface HomeCardsProps {
    type: "orders" | "history"
}

const HomeCards = (props: HomeCardsProps) => {
    return (
        // @ts-ignore
        <View reanimated entering={FlipInXUp.springify()} exiting={FlipOutXUp.springify()} row spread centerV width={"93%"} padding-35 marginV-10 marginT-100={props.type === "orders"} height={200} bg-cyan style={[styles.container, styles.radius]}>
            {props.type === "history" && <Text largebold>{"Order History"}</Text>}
            <FastImage style={styles.img} source={props.type === "orders" ? images_rider_home.Orders : images_rider_home.History} />
            {props.type === "orders" && <Text largebold>{"My Orders"}</Text>}
        </View>
    );
};

export default HomeCards;

const styles = StyleSheet.create({
    container: {
        alignSelf: "center"
    },
    radius: {
        borderRadius: 20
    },
    img: {
        width: 100,
        height: 100
    }
});
