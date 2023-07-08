import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Checkbox, Text, View } from 'react-native-ui-lib';
import { screens } from '..';
import LogoComponent from '../../components/core-ui/Logo';
import Modal from '../../components/modal';
import { useServices } from '../../services';
import { auth_options, forms, theme } from '../../utils/constants';
// import {} from "../../components"

interface ForgetPasswordProps {
    componentId: string;
}

const ForgetPassword = (props: ForgetPasswordProps) => {
    const { Components } = useServices();
    const configurations = forms.FORGETPASS;
    const [verify, setVerify] = React.useState(false)
    const onFormSubmitted = () => {
        setVerify(true);
    }

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <Components._Container options={auth_options} componentId={props.componentId} bg-pageColor bottomProps={{ visible: true, rotation: -50, rotateTo: 67, animate: false }} flex>
                <LogoComponent />
                {
                    verify ?
                        <Components._Verification /> :
                        <Components._Form actionText={configurations.actionText} bottomActions={configurations.bottomActions} secondaryActions={configurations.secondaryActions} fields={configurations.fields} onFormSubmitted={onFormSubmitted.bind(null)} />
                }

            </Components._Container>

        </React.Suspense>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {},
    checkBoxContainerStyle: { backgroundColor: theme.color.white, marginTop: 20 },
    checkBoxLabelStyle: { color: theme.color.black, fontFamily: theme.font.regular }
});
