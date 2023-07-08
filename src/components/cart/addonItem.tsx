import * as React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { getRandomImageFoodUrl, getRandomImageUrl } from '../../utils/help';

interface AddonItemProps {
    item: any
}

const AddonItem = (props: AddonItemProps) => {
    return (
        <Bounceable>
            <View width={120} marginV-5 height={130} marginR-10 bg-white style={[styles.container, styles.shadowContainer]}>
                <FastImage resizeMode='cover' style={styles.img} source={{ uri: getRandomImageFoodUrl() }} />

                <View padding-10>
                    <Text extraSmallmedium black>{props.item.title}</Text>
                    <Text extraSmallbold cyan>{props.item.price}</Text>
                </View>
            </View>
        </Bounceable>
    );
};

export default AddonItem;

const styles = StyleSheet.create({
    container: {
        borderRadius: 20
    },
    img: {
        flex: 1,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
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
});
