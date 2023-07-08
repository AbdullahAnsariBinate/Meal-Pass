import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Text } from 'react-native-ui-lib';

const AnimatedText = Animated.createAnimatedComponent(Text);

type fontFamilies = "bold" | "regular"
const TextComponent = (props: React.ComponentClass<any, any> | React.ComponentClass<fontFamilies, boolean> | any) => {
    return (
        <AnimatedText {...props} />
    );
};

export default TextComponent;

const styles = StyleSheet.create({
    container: {}
});
