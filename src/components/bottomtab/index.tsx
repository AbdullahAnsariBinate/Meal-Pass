import * as React from 'react';
import { Alert, LayoutChangeEvent, Platform, StyleSheet } from 'react-native';
import Animated, { FlipInXUp, FlipOutXDown, interpolate, SlideOutDown, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { theme } from '../../utils/constants';
import VectorIcon from '../utils/Vector';
import MaskedView from '@react-native-masked-view/masked-view';
import { screens } from '../../screens';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useServices } from '../../services';
import { PVoid, VoidAction } from '../../utils/types';
import { Bounceable } from 'rn-bounceable';
import { useNavigationBottomTabSelect } from 'react-native-navigation-hooks';
import ButtonEvent from './ButtonEvent';
import { useStores } from '../../stores';
import BottomsAnimated from './BottomsAnimated'
interface BottomTabProps { }
const AnimatedView = Animated.createAnimatedComponent(View);
const btnWidth = widthPercentageToDP('70%');


const BottomTab = (props: BottomTabProps) => {
    const { nav, events } = useServices();
    const { ui } = useStores();

    const rotationY = useSharedValue(0);
    const translateY = useSharedValue(Platform.OS === "android" ? 0 : 10);
    const buttonRefs = React.useRef<any>();
    const [visible, setVisible] = React.useState(true);
    const currentTabIndex = React.useRef<number>(0);
    const xValue = useSharedValue(0);


    const onTabIndexChanged = (index: number) => {
        if (buttonRefs.current) {
            xValue.value = withSpring((buttonRefs.current[index] - widthPercentageToDP('2.2%')));
        }
    }


    React.useEffect(() => {
        events.setTabIndexChangedDelegate({ onIndexChanged: onTabIndexChanged })
    }, [' ']);


    const bottomtabs = [
        {
            icon: <VectorIcon vector={"Fontisto"} name="home" size={22} color={theme.color.white} />,
            key: 'home'
        },
        {
            icon: <VectorIcon vector={"Fontisto"} name="search" size={22} color={theme.color.white} />,
            key: 'search'
        },
        {
            icon: <VectorIcon vector={"Feather"} name="shopping-cart" size={22} color={theme.color.white} />,
            key: 'cart'
        },
        {
            icon: <VectorIcon vector={"SimpleLineIcons"} name="badge" size={22} color={theme.color.white} />,
            key: 'badge'
        }
    ]

    const onLayout = (e: LayoutChangeEvent, index: number) => {
        const { x } = e.nativeEvent.layout;
        if (!buttonRefs.current) {
            buttonRefs.current = {}
        }
        buttonRefs.current[index] = x;

        if (currentTabIndex.current === index) {
            xValue.value = withSpring((x - widthPercentageToDP('2.2%')))
        }
    }


    const width = useSharedValue(40);


    const animatedLeft = useAnimatedStyle(() => {
        return {
            left: xValue.value,
            width: width.value,
        }
    })

    const onTabChanged = (index: number) => {
        // xValue.value = withSpring((buttonRefs.current[index] - widthPercentageToDP('2.2%')));

        screens.N.mergeOptions("Home", {
            bottomTabs: {
                currentTabIndex: index
            }
        });
    }

    const isVisible = React.useRef<boolean>(true);
    const open = () => {
        translateY.value = withSpring(Platform.OS === "android" ? 0 : 10);
        isVisible.current = true;
    }

    const close = () => {
        translateY.value = withSpring(-100);
        isVisible.current = false;
    }


    const actionDelegate = React.useRef<VoidAction>();
    const [actionText, setActionText] = React.useState<string | undefined | React.ReactElement>()
    const actionTextRef = React.useRef<string | undefined | React.ReactElement>("");

    const onRegisteredAction = (title: string | React.ReactElement, delegate: VoidAction) => {
        if (title !== actionTextRef.current) {
            actionTextRef.current = actionText;
            actionDelegate.current = delegate;
            ui.set('actionText', title);
            if (bottomTabRef.current) bottomTabRef.current.scrollTo({ index: 1, animated: true })
        }
    }


    const translationButtonChanged = () => {
        if (translateY.value < 0) {
            translateY.value = withSpring(Platform.OS === "android" ? 0 : 10);
        }

        rotationY.value = withSequence(
            withTiming(-100, { duration: 100 }),
            withTiming(0, { duration: 300 }),
        )
    }

    const callback = (finished: boolean) => {
        // optional callback that will fire when layout animation ends
    };

    const onRemoveAction = () => {
        actionTextRef.current = undefined;
        actionDelegate.current = undefined;
        if (bottomTabRef.current) bottomTabRef.current.scrollTo({ index: 0, animated: true })
    }


    React.useEffect(() => {
        nav.setBottomTabReference({
            open: open,
            close: close,
            onRegisteredAction: onRegisteredAction,
            onRemoveAction: onRemoveAction
        })
    }, [' '])


    const AnimatedTranslationY = useAnimatedStyle(() => {
        return {
            bottom: translateY.value,
            // transform: [
            //     {
            //         rotateX: `${rotationY.value}deg`
            //     },
            // ]
        }
    })

    const onPressAction = () => {
        if (actionDelegate.current) actionDelegate.current();
    }


    const tabsMemo = React.useMemo(() => bottomtabs && bottomtabs.map((tab, index) => {
        return (
            <TouchableOpacity hitSlop={40} onPress={onTabChanged.bind(null, index)} key={tab.key} onLayout={(e: LayoutChangeEvent) => onLayout(e, index)}>
                {tab.icon}
            </TouchableOpacity>
        )
    }), [' ']);

    const bottomTabRef = React.useRef<any>()

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         if (bottomTabRef.current) bottomTabRef.current.scrollTo({ index: 1, animated: true })
    //     }, 3000);
    // }, [' as'])

    return (
        <AnimatedView center={actionText !== undefined} spread row centerV height={62} width={"100%"} absB style={[styles.container, AnimatedTranslationY]}>
            <BottomsAnimated onPressAction={onPressAction} ref={bottomTabRef} tabsMemo={tabsMemo} animatedLeft={animatedLeft} />
        </AnimatedView>
    )

    return (
        <AnimatedView center={actionText !== undefined} spread row centerV paddingH-40 height={62} width={"93%"} bg-cyan={!actionText} absB style={[styles.container, AnimatedTranslationY]}>
            {!actionText && <AnimatedView absH height={40} bg-white style={[styles.opacity, animatedLeft]} />}
            {!actionText && tabsMemo}

            {actionText &&
                <ButtonEvent onPressAction={onPressAction} />
            }
        </AnimatedView>
    );
};

export default BottomTab;

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
