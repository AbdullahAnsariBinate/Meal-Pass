import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { screens } from '..';
import { RiderActivity, TabsActivity } from '../../../App';
import { useServices } from '../../services';
import { useStores } from '../../stores';
import { auth_options, forms } from '../../utils/constants';

interface ResetPasswordProps {
    componentId: string;
}

const ResetPassword = (props: ResetPasswordProps) => {
    const { Components, events } = useServices();
    const { user } = useStores();
    const configurations = forms.RESETPASSWORD;

    const onResetCompleted = () => {
        if (user.type === "USER") {
            screens.N.setRoot(TabsActivity())
        } else {
            screens.N.setRoot(RiderActivity())
        }
    }


    const onFormSubmitted = (form: any) => {
        events.onEventPressed("on_signup_pressed", {
            componentId: props.componentId
        }, onResetCompleted.bind(null), {
            connectedModal: true,
            modalArgs: {
                type: "RESET_PASSWORD",
                status: "success",
                dismissable: false,
                subtext: "Password Reset\nSuccessful",
                actions: [
                    {
                        text: "Continue",
                        action: 'acceptance',
                    }
                ]
            }
        })
    }

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <Components._Container options={auth_options} componentId={props.componentId} bg-pageColor bottomProps={{ visible: true, rotation: 67, rotateTo: 110, animate: false }} flex>
                <Components._LogoComponent />
                <Components._Form onFormSubmitted={onFormSubmitted.bind(null)} actionText={configurations.actionText} bottomActions={configurations.bottomActions} secondaryActions={configurations.secondaryActions} fields={configurations.fields} />
            </Components._Container>
        </React.Suspense>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {}
});
