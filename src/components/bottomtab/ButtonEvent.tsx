import { observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useStores } from '../../stores';

interface ButtonEventProps {
    onPressAction: any;
}

const ButtonEvent = (props: ButtonEventProps) => {
    const { ui } = useStores();
    return (
        <TouchableOpacity activeOpacity={.9} bg-cyan onPress={props.onPressAction.bind(null)} style={[styles.container, styles.nomargin]}>
            <View center width={widthPercentageToDP('93%')} height={"100%"}>
                <Text mediummedium white>{ui.actionText}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(observer(ButtonEvent));

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        marginBottom: 10,
        borderRadius: 40,
        zIndex: 100000
    },
    opacity: {
        opacity: .2,
        borderRadius: 20
    },
    nomargin: {
        marginBottom: 0
    }
});
