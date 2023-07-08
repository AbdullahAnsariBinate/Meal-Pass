import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { ContainerModifiers, View, ViewProps } from 'react-native-ui-lib';
import { images } from '../../../assets/images';
import PlateComponent from '../welcome/Plate';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { createStateContext, useStateContext } from '../../utils/help';
import PlateContainer from '../animated/PlateContainer';
import { Options } from 'react-native-navigation';
import { WelcomeProps, NavigationProps } from '../../utils/types';

interface ContainerProps {
    children?: React.ReactNode;
    bottomProps?: { visible?: boolean, rotation?: number, rotateTo?: number; leftKey?: string, rightKey?: string, animate: boolean }
    componentId: string;
    options?: Options;
    plateNativeId?: string;
}

const Container = (props: ContainerModifiers & ViewProps & ContainerProps) => {
    const StateContext = createStateContext<WelcomeProps>();
    const state: NavigationProps = useStateContext<NavigationProps>() as WelcomeProps;


    let _containerProps = { ...props } as unknown as ContainerProps;
    let _props: ContainerProps = props as ContainerProps;
    if (_containerProps.bottomProps) {
        delete _containerProps.bottomProps;
        delete _containerProps.options;
    }

    return (
        <StateContext.Provider value={{ componentId: props.componentId, options: props.options }}>
            <View flex reanimated {..._containerProps} bg-bg >
                <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>
                    {_props.children}
                </KeyboardAwareScrollView>

                {_props.bottomProps?.visible &&
                    <PlateContainer nativeId={props.plateNativeId ? props.plateNativeId : 'plateBox'} _props={_props} state={state} />
                }
            </View>
        </StateContext.Provider>
    );
};

export default React.memo(Container);

const styles = StyleSheet.create({
    container: {
        minHeight: "100%"
    },
    contentContainerStyle: {
        // minHeight: "100%"
        flex: 1
    },
    plateCon: { position: "absolute", height: heightPercentageToDP('100%'), width: "100%" },
});
