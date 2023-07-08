import * as React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { Checkbox, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { VectorIcon } from '..';
import { theme } from '../../utils/constants';

interface LocationCardProps {
    address: any;
}

const LocationCard = (props: LocationCardProps) => {
    const [isCheck, setIsCheck] = React.useState(false);
    const { address } = props;


    const onSelectAddress = () => {
        setIsCheck(!isCheck);
    }

    return (
        // <TouchableOpacity onPress={onSelectAddress.bind(null)} activeOpacity={1}>
        <View row centerV height={75} marginT-10 bg-white style={[styles.container, styles.shadow, styles.radius]}>
            <View width={35} centerV paddingL-15>
                <Checkbox iconColor={theme.color.white} borderRadius={50} color={theme.color.cyan} labelStyle={styles.labelStyle} bg-white value={isCheck} onValueChange={setIsCheck} />
            </View>
            <TouchableOpacity onPress={onSelectAddress.bind(null)} activeOpacity={1} row flex paddingL-10 centerV>
                <VectorIcon vector={'Entypo'} name={'location-pin'} size={35} color={theme.color.black} />
                <Text adjustsFontSizeToFit numberOfLines={2} verySmallmedium black marginL-5 style={styles.contain}>{address.address}</Text>
            </TouchableOpacity>
            <View spread row width={85} paddingR-10>
                <Bounceable>
                    <View center bg-cyan width={35} height={35} style={styles.rounded}>
                        <VectorIcon vector={'Entypo'} name={'edit'} size={15} color={theme.color.white} />
                    </View>
                </Bounceable>
                <Bounceable>
                    <View center bg-cyan width={35} height={35} style={styles.rounded}>
                        <VectorIcon vector={'Entypo'} name={'trash'} size={20} color={theme.color.white} />
                    </View>
                </Bounceable>
            </View>
        </View>
        // </TouchableOpacity>
    );
};

export default LocationCard;

const styles = StyleSheet.create({
    container: {},
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 4
    },
    radius: {
        borderRadius: 15
    },
    labelStyle: {
        color: theme.color.white
    },
    rounded: {
        borderRadius: 20
    },
    contain: {
        maxWidth: "80%"
    }
});
