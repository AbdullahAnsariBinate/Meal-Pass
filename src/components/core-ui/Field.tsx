import * as React from 'react';
import { Alert, LayoutChangeEvent, StyleSheet, TextInput } from 'react-native';
import { CoreUI } from '..';
import { theme } from '../../utils/constants';
import { View, Incubator, Colors, Text } from 'react-native-ui-lib'; //eslint-disable-line
import Animated from 'react-native-reanimated';
import { FormikErrors, FormikTouched } from 'formik/dist/types';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { TextField } = Incubator;

interface FieldProps {
    field: Field;
    handleBlur: any;
    error: string | FormikErrors<any> | string[] | FormikErrors<any>[] | undefined;
    handleChange: any;
    touched: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
    value: string;
}

const Field = (props: FieldProps) => {
    const { field } = props;
    const [top, setTop] = React.useState(field.floating ? -0 : 0);
    const fieldHeight = React.useRef<number>(0);

    console.log("Field has", props.value);


    const onBlur = () => {
        if (field.floating && !props.value) {
            setTop(0)
        }
    }


    const onFocus = () => {
        console.log("field is focused");
        if (field.floating) {
            setTop(10)
        }
    }


    React.useEffect(() => {
        if (field.floating && props.value) {
            setTop(10)
        }
    }, [' '])


    const onLayout = (event: LayoutChangeEvent) => {
        fieldHeight.current = event.nativeEvent.layout.height;
    }


    
    return (
        <>
        <View onLayout={onLayout.bind(null)} style={styles.container}>
            {field.icon && <View style={styles.iconCon}>
                {field.icon && <CoreUI.Icon {...field.icon} />}
            </View>}
            <TextField
                black
                placeholder={field.label}
                floatingPlaceholder={field.floating ? true : false}
                floatingPlaceholderColor={{
                    focus: Colors.$textDefault,
                    default: Colors.$textNeutral
                }}
                label={!field.floating ? field.label : undefined}
                labelStyle={{
                    fontFamily: theme.font.regular,
                    fontSize: scale(10),
                    top: scale(12),
                    color: theme.color.fieldlabel
                }}
                floatingPlaceholderStyle={{
                    fontFamily: theme.font.regular,
                    fontSize: scale(12),
                    top: top,
                    color: theme.color.fieldlabel
                }}
                value={props.value}
                style={!field.floating && field.label ? { height: 35, fontSize: 12, fontFamily: theme.font.medium, top: 3 } : { height: scale(35), fontSize: scale(12), fontFamily: theme.font.medium }}
                containerStyle={{ flex: 1, marginTop: -13 }}
                fieldStyle={styles.wihtoutUnderline}
                floatOnFocus={true}
                onChangeText={props.handleChange(props.field.key)}
                onFocus={onFocus.bind(null)}
                onBlur={onBlur.bind(null)}
                secureTextEntry={field.secure}
            />
            
        </View>
        <View style={{width:"85%",alignSelf:"center"}}>
             {props.error &&
                <Text red style={{fontSize:10,marginTop:-5}}>{props.error}</Text>
            }
        </View>
        </>
    );
};

export default Field;

const styles = StyleSheet.create({
    iconCon: { width: 50, height: "100%", justifyContent: "center", alignItems: "center" },
    container: { width: "90%", borderWidth: 1, borderRadius: 40, justifyContent: "center", flexDirection: "row", paddingVertical: 8, backgroundColor: theme.color.white, borderColor: theme.color.fieldborder, height: 55, marginVertical: 5, alignSelf: "center" },
    withUnderline: {
        borderBottomWidth: 1,
        borderColor: Colors.$outlineDisabledHeavy,
        paddingBottom: 4
    },
    wihtoutUnderline: {
        borderBottomWidth: 0,
        borderColor: Colors.$outlineDisabledHeavy,
        paddingBottom: 4
    },
    withFrame: {
        borderWidth: 1,
        borderColor: Colors.$outlineDisabledHeavy,
        padding: 4,
        borderRadius: 2
    }
});
