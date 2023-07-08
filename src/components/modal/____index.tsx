import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Provider, Modal as Modall } from 'react-native-paper';
import { Text, View } from 'react-native-ui-lib';
import { theme } from '../../utils/constants';
import Button from '../core-ui/Button';

interface ModalProps {
    height: any;
    topBar?: string;
    children?: () => React.ReactNode;
    button?: boolean;
    dualButton?: boolean;
    buttonTitle?: string;
    secondaryButtonTitle?: string;
    buttonOnPress?: any;
    secondaryButtonOnPress?: any;
    visible: any;
    onDissmis: any;
}

const Modal = (props: ModalProps) => {

    return (
        <View flex style={{ position: "absolute", zIndex: 1000, elevation: 1000, width: "100%", height: "100%" }}>

            {/* <Provider > */}
            {/* // <Portal> */}
            <Modall dismissable={false} style={{ height: "100%", marginTop: 0, padding: 0, }} visible={props.visible} onDismiss={props.onDissmis} contentContainerStyle={[styles.containerStyle, { height: props.height, justifyContent: "space-between" }]}>
                {props.topBar &&
                    <View style={{ width: "100%", backgroundColor: theme.color.cyan, height: "20%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: theme.color.white, fontFamily: theme.font.bold, fontSize: 20 }}>{props.topBar}</Text>
                    </View>
                }
                <>
                    {props.children}
                </>
                {(props.button || props.dualButton) &&
                    <View row style={{ justifyContent: "center" }}>
                        {props.dualButton &&

                            <Button
                                title={props.secondaryButtonTitle}
                                labelStyle={{ color: theme.color.gray }}
                                // onPress={handleSubmit.bind(null) as unknown as any}
                                color={theme.color.white}
                                styles={[styles.btn, { borderRadius: 0, width: "50%", marginVertical: 0, borderTopWidth: .2, borderColor: theme.color.lightgray }]}
                            />
                        }
                        <Button
                            title={props.buttonTitle}
                            // labelStyle={{ color: theme.color.gray }}
                            onPress={props.buttonOnPress.bind(null) as unknown as any}
                            color={theme.color.cyan}
                            styles={[styles.btn, props.dualButton && { borderRadius: 0, width: "50%", marginVertical: 0 }]}
                        />
                    </View>
                }


            </Modall>
            {/* </Portal> */}

            {/* </Provider> */}
        </View>
    );
};

export default Modal;

const styles = StyleSheet.create({
    btn: { height: 55, },

    container: {},
    containerStyle: { backgroundColor: theme.color.white, width: "85%", alignSelf: "center", borderRadius: 30, justifyContent: "flex-start", overflow: "hidden" }
});
