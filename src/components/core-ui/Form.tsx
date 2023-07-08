import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { Easing, SlideInDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { theme } from '../../utils/constants';
import Button from './Button';
import Field from './Field';
import { Formik, FormikProps } from 'formik';
import { View } from 'react-native-ui-lib';
import { ButtonProps } from '../../utils/types';

interface FormProps {
    fields: Field[]
    secondaryActions?: ButtonProps[];
    bottomActions?: ButtonProps[];
    actionText: string;
    onFormSubmitted: (form: any) => void;
    loading?:boolean;
    validation?:any
}

const Form = (props: FormProps = { fields: [], secondaryActions: [], bottomActions: [], actionText: "UNDEFINED", onFormSubmitted: () => { }}) => {
    const YTrans = useSharedValue(-100);
    const YTransForm = useSharedValue(-heightPercentageToDP('100%'));

    const animatedStyle = useAnimatedStyle(() => {
        return {
            bottom: YTrans.value
        };
    });

    const animatedStyleForm = useAnimatedStyle(() => {
        return {
            bottom: YTransForm.value
        };
    });


    React.useEffect(() => {
        YTransForm.value = withTiming(0, { duration: 300, easing: Easing.elastic(.8) })
        setTimeout(() => {
            YTrans.value = withTiming(0, { duration: 600, easing: Easing.bounce })
        }, 300);
    }, [""]);

    const formRef = React.useRef<FormikProps<any>>(null);



    return (
        <Animated.View style={[styles.container, animatedStyleForm]}>

            <Formik
                innerRef={formRef}
                initialValues={{
                    // email: "fawad.mahmood@outlook.com",
                    // password: "qwertyuiop"
                }}
                validationSchema={props.validation}
                onSubmit={props.onFormSubmitted && props.onFormSubmitted.bind(null)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                       {props.fields && props.fields.map((field, index) => {
                            return (
                                <Field key={field.key} field={field} {...{ handleBlur, value: values[field.key], error: errors[field.key], handleChange, touched: touched[field.key] }} />
                            )
                        })}

                        <Button
                            loading={props.loading}
                            title={props.actionText}
                            onPress={handleSubmit.bind(null) as unknown as any}
                            color={theme.color.cyan}
                            styles={styles.btn}
                        />
                    </View>
                )}
            </Formik>

            <View paddingV-20 style={styles.btmCon}>
                {props.secondaryActions?.map((action, index) => {
                    return (
                        <Button key={index + "secondaryActions"} {...action} />
                    )
                })}


                {props.bottomActions?.map((action, index) => {
                    return (
                        <Animated.View key={index + "bottomActions"} style={[styles.Wflex, animatedStyle]}>
                            <Button {...action} />
                        </Animated.View>
                    )
                })}
            </View>
        </Animated.View>
    );
};

export default Form;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        flex: 1
    },
    btn: { marginTop: 10 },
    secondBtnLabel: {
        color: theme.color.black,
        fontFamily: theme.font.medium
    },
    btmCon: { flex: 1, justifyContent: "space-between", alignItems: "center" },
    bolder: {
        fontFamily: theme.font.bold
    },
    btmButton: {
        borderColor: theme.color.white,
        backgroundColor: "rgba(0,0,0,.65)",
        borderWidth: 1
    },
    Wflex: {
        width: "100%"
    }
});
