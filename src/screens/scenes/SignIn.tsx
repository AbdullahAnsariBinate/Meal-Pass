import * as React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { screens } from '..';
import { RiderActivity, TabsActivity } from '../../../App';
import { useServices } from '../../services';
import { useStores } from '../../stores';
import { auth_options, forms } from '../../utils/constants';
import { object, string, number, date, InferType } from 'yup';

interface SignInProps {
    componentId: string;
}

const SignIn = (props: SignInProps) => {
    const { Components,api } = useServices();
    const [loading,setLoading] = React.useState(false);
    const { user } = useStores();
    const configurations = forms.LOGIN;


    let validationScheema = object({
        email: string().email().required(),
        password: string().min(8).required()
      });


    const onFormSubmitted =async (form: any) => {
        console.log("signin", form);
        setLoading(true);
        api.auth.signin(form).then(res=>{
            setLoading(false);
            screens.N.setRoot(TabsActivity())
            console.log("signed in occured",res.data);
        }).catch(err=>{
            setLoading(false);
            Alert.alert('invalid credentials', "Invalid Username and Password.")
            console.log("error occured",err.response);
        });
    }

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <Components._Container options={auth_options} componentId={props.componentId} bg-pageColor bottomProps={{ visible: true, rotation: 50, rotateTo: -50, animate: false }} flex>
                <Components._LogoComponent />
                <Components._Form validation={validationScheema} loading={loading} onFormSubmitted={onFormSubmitted.bind(null)} actionText={configurations.actionText} bottomActions={configurations.bottomActions} secondaryActions={configurations.secondaryActions} fields={configurations.fields} />
            </Components._Container>
        </React.Suspense>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {}
});
