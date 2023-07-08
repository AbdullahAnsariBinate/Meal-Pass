import * as React from 'react';
import { ComponentProvider, Platform, StyleSheet } from 'react-native';
import Animated, { event } from 'react-native-reanimated';
import { ContainerModifiers, View, ViewProps } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { createStateContext, useStateContext } from '../../utils/help';
import { WelcomeProps, NavigationProps, PVoid, VoidAction } from '../../utils/types';
import { useNavigationComponentDidAppear, useNavigationComponentDidDisappear } from 'react-native-navigation-hooks/dist';
import { useServices } from '../../services';
import { screens } from '../../screens';
import { OptionsTopBarButton } from 'react-native-navigation';
import { theme } from '../../utils/constants';

interface ContainerProps {
    children?: React.ReactNode;
    componentId: string;
    bottomTabShouldHide?: boolean;
    disableScroll?: boolean;
    bottomTabAction?: { text: string, delegate: VoidAction };
    extraProps?: Object;
    rightButtons?: { name: string, component: ComponentProvider }[],
    leftButtons?: { name: string, component: ComponentProvider }[];
    index?: number;
    isTabScreen?: boolean;
    removeTopBarBG?: boolean;
    isCustomBottomTabHandled?: boolean;
}


const AnimatedView = Animated.createAnimatedComponent(View);
const Container = (props: ContainerModifiers & ViewProps & ContainerProps) => {
    const StateContext = createStateContext<WelcomeProps>();
    let _containerProps = { ...props } as unknown as ContainerProps;
    let _props: ContainerProps = props as ContainerProps;
    const { nav, events } = useServices();


    React.useEffect(() => {
        let rightButtons: OptionsTopBarButton[] = [];
        let leftButtons: OptionsTopBarButton[] = [];

        if (props.rightButtons && props.rightButtons.length > 0) {
            props.rightButtons.forEach((btn) => {
                screens.N.registerComponent(btn.name, btn.component);
                rightButtons.push({
                    component: {
                        name: btn.name
                    },
                    id: btn.name
                })
            });
        }

        if (props.leftButtons && props.leftButtons.length > 0) {
            props.leftButtons.forEach((btn) => {
                screens.N.registerComponent(btn.name, btn.component);

                leftButtons.push({
                    component: {
                        name: btn.name,
                    },
                    id: btn.name,
                })
            });
        }


        if (props.removeTopBarBG) {
            screens.N.mergeOptions(props.componentId, {
                topBar: {
                    background: Platform.OS === "android" ? {
                        color: theme.color.cyan,
                        component: {
                            name: "EmptyBackground"
                        },
                    } : {
                        color: theme.color.cyan,
                    },
                    rightButtons: rightButtons,
                    leftButtons: leftButtons
                }
            })
        } else {
            screens.N.mergeOptions(props.componentId, {
                topBar: {
                    background: Platform.OS === "android" ? {
                        color: theme.color.cyan,
                        component: {
                            name: "TopBarBG"
                        },
                    } : {
                        color: theme.color.cyan,
                    },
                    rightButtons: rightButtons,
                    leftButtons: leftButtons
                }
            });
        }
    }, [' '])

    useNavigationComponentDidAppear(
        (e) => {
            if (!props.isCustomBottomTabHandled) {
                if (props.bottomTabShouldHide) {
                    nav.hideBottomTab();
                }

                if (!props.bottomTabShouldHide) {
                    nav.showBottomTab();
                }

                if (props.bottomTabAction) {
                    nav.setBottomTabAction(props.bottomTabAction.text, props.bottomTabAction.delegate);
                }

                if (props.isTabScreen) {
                    events.triggerBottomTabChanged(props.index as number)
                }
            }


        },
        { componentId: props.componentId }
    )


    useNavigationComponentDidDisappear(
        (e) => {
            if (props.bottomTabAction) {
                nav.removeBottomTabAction();
            }
        },
        { componentId: props.componentId }
    )

    return (
        <StateContext.Provider value={{ componentId: props.componentId, extraProps: props.extraProps }}>
            <View  {..._containerProps} bg-bg >
                {!props.disableScroll ?
                    <KeyboardAwareScrollView contentContainerStyle={[styles.contentContainerStyle, !props.bottomTabShouldHide ? { paddingBottom: 70 } : {}]}>
                        {_props.children}
                    </KeyboardAwareScrollView> :
                    <View flex>
                        {_props.children}
                    </View>
                }
            </View>
        </StateContext.Provider>
    );
};

export default Container;

const styles = StyleSheet.create({
    container: {
        minHeight: "100%"
    },
    contentContainerStyle: {
        minHeight: "100%"
    },
    plateCon: { position: "absolute", height: heightPercentageToDP('100%'), width: "100%" },
});
