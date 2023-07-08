import * as React from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView, Text } from 'react-native-ui-lib';
import { screens } from '..';
import { TabsActivity, RiderActivity } from '../../../App';
import { useServices } from '../../services';
import { useStores } from '../../stores';
import { auth_options, forms } from '../../utils/constants';
import { createStateContext } from '../../utils/help';
import { NavigationProps } from '../../utils/types';
import * as Yup from 'yup';

interface RegisterProps {
    componentId: string;
}

const Register = (props: RegisterProps) => {
    const { Components, api,events } = useServices();
    const [loading,setLoading] = React.useState(false);


    let validationScheema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
        confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
        phone: Yup.string().required(),
      });

    const { user } = useStores();

    const StateContext = createStateContext<NavigationProps>();
    const configurations = user.type === "USER" ? forms.SIGNUP : forms.SIGNUP_RIDER;

    const onSignupContinue = () => {
        if (user.type === "USER") {
            screens.N.setRoot(TabsActivity())
        } else {
            screens.N.setRoot(RiderActivity())
        }
    }


    const onFormSubmitted = (form: any) => {
        setLoading(true);
        // form
        api.auth.signup({}).then(res=>{
            setLoading(false);
            events.onEventPressed("on_signup_pressed", {
                componentId: props.componentId
            }, onSignupContinue.bind(null), {
                connectedModal: true,
                modalArgs: {
                    type: "ACCOUNT_SUCCESS",
                    status: "success",
                    dismissable: false,
                    subtext: "Congratulations,\nyour account set up was Successful.",
                    actions: [
                        {
                            text: "Continue",
                            action: 'acceptance',
                        }
                    ]
                }
            })
        }).catch(err=>{
            setLoading(false);
            Alert.alert('invalid credentials', "Email Address already taken.")
            console.log("error occured",err.response);
        });

        
    }


    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>
            <StateContext.Provider value={{ componentId: props.componentId, options: auth_options }}>
                <Components._Container options={auth_options} componentId={props.componentId} bg-pageColor bottomProps={{ visible: true, rotation: -50, rotateTo: 90, animate: false }} flex>
                    <Components._LogoComponent />
                    <Components._Form validation={validationScheema} loading={loading} actionText={configurations.actionText} bottomActions={configurations.bottomActions} secondaryActions={configurations.secondaryActions} fields={configurations.fields} onFormSubmitted={onFormSubmitted.bind(null)} />
                </Components._Container>
            </StateContext.Provider>
            </KeyboardAwareScrollView>
        </React.Suspense>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {},
    contentContainerStyle:{
        minHeight:Dimensions.get('window').height/1.05
    }
});
