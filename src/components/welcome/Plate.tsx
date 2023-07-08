
import * as React from 'react';
import { ImageSourcePropType, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import Animated, { RotateInDownLeft, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { View } from 'react-native-ui-lib';


class FastImageComponent extends React.Component<FastImageProps> {
    constructor(props: FastImageProps) {
        super(props);
    }
    render() {
        return <FastImage {...this.props} />;
    }
}

const AnimatedFastImage = Animated.createAnimatedComponent(FastImageComponent);

interface PlateComponentProps {
    animate_appear: boolean;
    position: 'left' | 'right';
    image: number | Source | Animated.Node<number | Source | undefined> | undefined;
    rotation?: number;
    rotateTo?: number;
    nativeID: string;
}

const PlateComponent = (props: PlateComponentProps) => {
    //@ts-ignore
    const imageStyle: any = styles[props.position ? (props.position + "_image") : "right_image"];
    const rotation = useSharedValue(props.rotation);

    React.useEffect(() => {
        if (props.rotation !== props.rotateTo) {
            // apply animation style
            //@ts-ignore , { duration: 1000 }
            rotation.value = Platform.OS === "android" ? withSpring(props.rotateTo) : withSpring(props.rotateTo)
        }
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotation.value}deg`
                }
            ]
        };
    });



    return (
        <AnimatedFastImage nativeID={props.nativeID} entering={props.animate_appear ? RotateInDownLeft.springify() : undefined} source={props.image} style={[imageStyle, props.animate_appear ? {} : animatedStyle]} />
    );
};

export default React.memo(PlateComponent);

const styles = StyleSheet.create({
    container: {},
    left: { width: 300, height: 300, position: "absolute", bottom: -100, left: -100 },
    right: { width: 300, height: 300, position: "absolute", bottom: -100, right: -100 },
    left_image: { width: 300, height: 300, position: "absolute", bottom: -50, left: -100 },
    right_image: { width: 300, height: 300, position: "absolute", bottom: -100, right: -100 },
});
