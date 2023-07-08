import * as React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Checkbox, Text, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { theme } from '../../utils/constants';

interface PaymentCardProps {
    card: any;
}

const PaymentCard = (props: PaymentCardProps) => {
    const [isCheck, setIsCheck] = React.useState(false);

    const { card } = props;


    const onSelectAddress = () => {
        setIsCheck(!isCheck);
    }

    return (
        <Bounceable onPress={onSelectAddress.bind(null)}>
            <View spread row padding-8 paddingH-15 centerV bg-white marginV-7 width={"93%"} height={60} style={[styles.container, styles.shadow]}>
                <FastImage resizeMode='contain' source={card.icon} style={styles.img} />
                <Text flex mediummedium black marginL-15 marginT-0>{card.card}</Text>
                <View width={35} centerV paddingR-5>
                    <Checkbox iconColor={theme.color.white} borderRadius={50} color={theme.color.cyan} labelStyle={styles.labelStyle} bg-white value={isCheck} onValueChange={setIsCheck} />
                </View>
            </View>
        </Bounceable>
    );
};

export default PaymentCard;

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        borderRadius: 10
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
    img: {
        width: 45,
        height: 45
    },
    labelStyle: {
        color: theme.color.white
    },
});
