import * as React from 'react';
import { Alert, StyleSheet } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Checkbox, Text, View } from 'react-native-ui-lib';
import { useServices } from '../../services';
import { auth_options, available_auth_buttons, theme } from '../../utils/constants';
interface PreSigninProps {
    componentId: string
}

const PreSignin = (props: PreSigninProps) => {
    const { Components } = useServices();
    const [visible, setVisible] = React.useState(true);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <Components._Container options={auth_options} componentId={props.componentId} bg-pageColor bottomProps={{ visible: true, rotation: 0, rotateTo: 50, animate: false }} flex>
                <Components._LogoComponent />
                <Animated.View entering={SlideInDown.stiffness(10)}>
                    {available_auth_buttons && available_auth_buttons.map((btn, index) => {
                        return (
                            <Components._Button key={'presign_buttons' + index} {...btn} />
                        )
                    })}
                </Animated.View>
            </Components._Container>
        </React.Suspense>
    );
};

export default PreSignin;

const styles = StyleSheet.create({
    container: {},
    checkBoxContainerStyle: { backgroundColor: theme.color.white, marginTop: 20 },
    checkBoxLabelStyle: { color: theme.color.black, fontFamily: theme.font.regular }
});
