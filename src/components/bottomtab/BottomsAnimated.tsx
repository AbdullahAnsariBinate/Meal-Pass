import * as React from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import ButtonEvent from './ButtonEvent';

const PAGE_WIDTH = widthPercentageToDP('100%') //window.width;

type TabsProps = {
    tabsMemo: any;
    animatedLeft: any;
    onPressAction: any;
}

const Index = React.forwardRef((props: TabsProps, ref: any) => {
    const [isAutoPlay, setIsAutoPlay] = React.useState(false);
    const pressAnim = useSharedValue<number>(0);

    const animationStyle: any = React.useCallback(
        (value: number) => {
            'worklet';

            const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
            const translateX = interpolate(
                value,
                [-1, 0, 1],
                [-PAGE_WIDTH, 0, PAGE_WIDTH]
            );

            return {
                transform: [{ translateX }],
                zIndex,
            };
        },
        []
    );

    // @ts-ignore
    const renderItem = ({ index, item }) => {
        return (
            <CustomItem
                animatedLeft={props.animatedLeft}
                tabItem={item}
                key={index}
                pressAnim={pressAnim}
            />
        );
    };

    return (
        <Carousel
            ref={ref}
            loop={true}
            autoPlay={isAutoPlay}
            style={{ width: PAGE_WIDTH, height: 62 }}
            width={PAGE_WIDTH}
            data={[{ type: 'menu', element: props.tabsMemo }, { type: "btn", element: <ButtonEvent onPressAction={props.onPressAction.bind(null)} /> }]}
            onScrollBegin={() => {
                pressAnim.value = withTiming(1);
            }}
            onScrollEnd={() => {
                pressAnim.value = withTiming(0);
            }}
            renderItem={renderItem.bind(null)}
            customAnimation={animationStyle}
            scrollAnimationDuration={600}
        />
    );
});

interface ItemProps {
    pressAnim: Animated.SharedValue<number>;
    tabItem: any;
    animatedLeft: any;
}

// @ts-ignore
const CustomItem: React.FC<ItemProps> = ({ pressAnim, tabItem, animatedLeft }) => {
    const animStyle = useAnimatedStyle(() => {
        const scale = interpolate(pressAnim.value, [0, 1], [1, 0.9]);
        const borderRadius = interpolate(pressAnim.value, [0, 1], [0, 30]);
        // 
        // borderRadius,
        return {
            transform: [{ scale }],
        };
    }, []);


    if (tabItem.type === "menu") {
        return (
            <View reanimated bg-cyan spread row centerV paddingH-40 height={62} width={"93%"} style={[styles.container, animStyle]}>
                <View reanimated absH height={40} bg-white style={[styles.opacity, animatedLeft]} />
                {tabItem.element}
            </View>
        );
    }


    if (tabItem.type === "btn") {
        return (
            <View reanimated height={62} width={"93%"} style={[styles.container, animStyle]}>
                {tabItem.element}
            </View>
        )
    }


};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        borderRadius: 40,
        zIndex: 100000,
        overflow: "hidden"
    },
    opacity: {
        opacity: .2,
        borderRadius: 20
    }
});

export default React.memo(Index);