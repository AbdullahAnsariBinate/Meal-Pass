import * as React from 'react';
import { Platform, StyleSheet, ViewProps } from 'react-native';
import Animated, { AnimateProps } from 'react-native-reanimated';
import { Text } from 'react-native-ui-lib';
import { useServices } from '../../services';
import { WelcomeProps } from '../../utils/types';



const Welcome = (props: WelcomeProps) => {
    const { Components } = useServices();
    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <Components._Container options={{
                animations: {
                    push: {
                        enabled: true,
                        waitForRender: true,
                        sharedElementTransitions: [
                            {
                                fromId: 'plateBox',
                                toId: 'plateBox',
                                interpolation: {
                                    type: "overshoot"
                                },
                                duration: 1,
                            }
                        ],
                    }
                }
            }}
                componentId={props.componentId} bottomProps={{ visible: true, rotation: 0, rotateTo: 0, animate: true }}
                flex
            >
                <Components._LogoComponent />
                <Animated.View>
                    <Components._UserSelector type="USER" text='Users' />
                    <Components._UserSelector type="RIDER" text='Rider' />
                </Animated.View>
            </Components._Container>
        </React.Suspense>
    );
};


export default Welcome;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 50,
        backgroundColor: "white",
        flex: 1
    },
    img: {
        width: "80%",
        height: "80%",
    },
    box: { width: 150, height: 150, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "white", marginBottom: 20, alignSelf: "center" },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    anim: {
        width: "100%",
        height: "100%",
        left: -20
    }
});
