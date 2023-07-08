import * as React from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';

import Animated, { FlipInXUp, FlipOutXUp } from 'react-native-reanimated';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { CoreUI } from '..';
import { useStateContext } from '../../utils/help';
import { screens } from '../../screens';
import { useServices } from '../../services';
import { PureFunc, UserSelectorProps, WelcomeProps } from '../../utils/types';

import { verticalScale } from 'react-native-size-matters';
import { useStores } from '../../stores';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const UserSelector = (props: UserSelectorProps) => {
    const { user } = useStores();
    const state: WelcomeProps = useStateContext<WelcomeProps>() as WelcomeProps;
    let animation;



    console.log("WelcomeProps received", state.componentId);

    if (props.type === "USER") animation = require('../../../assets/lootie/customer.json')
    else animation = require('../../../assets/lootie/rider.json')

    const onPressCard = () => {
        user.set('type', props.type);
        screens.push(state.componentId, "PreSignin", {}, state.options);
    }


    return (
        <AnimatedTouchableOpacity onPress={onPressCard.bind(null, "user_clicked", state) as unknown as PureFunc} entering={FlipInXUp.springify()} exiting={FlipOutXUp.springify()} activeOpacity={.98} style={[styles.container, styles.shadow]}>
            <View flex >
                <View style={styles.containerlootie}>
                    <Lottie resizeMode={"cover"} style={[styles.anim]} autoPlay loop={true} source={animation} />
                </View>
                <CoreUI.Text cardBold>{props.text}</CoreUI.Text>
            </View>
        </AnimatedTouchableOpacity>
    );
};

export default UserSelector;

const styles = StyleSheet.create({
    container: {
        width: "95%",
        height: verticalScale(190),
        backgroundColor: "#1A8D8D",
        borderRadius: 20,
        flexDirection: "row",
        overflow: "hidden",
        marginVertical: 5,
        paddingRight: 40,
        alignItems: "center",
        alignSelf: "center",
        zIndex: 1000
    },
    anim: {
        left: Platform.OS === "ios" ? "-10%" : "-15%",
        position: "absolute",
        bottom: -10
    },
    containerlootie: { bottom: verticalScale(-78), position: "absolute", width: "80%", height: "100%" },
    shadow: {
    },
});
