import * as React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, Text as Texta, Platform } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Text } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { CoreUI } from '..';
import { useServices } from '../../services';
import { theme } from '../../utils/constants';
import { useStateContext } from '../../utils/help';
import { ButtonProps, NavigationProps, PureFunc, WelcomeProps } from '../../utils/types';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ActivityIndicator } from 'react-native-paper';


const Button = (props: ButtonProps) => {
    const state: NavigationProps = useStateContext<NavigationProps>() as WelcomeProps;
    const { events } = useServices();

    return (
        <Bounceable onPress={props.onPress ? props.onPress.bind(null) : events.onEventPressed.bind(null, props.action, state) as unknown as PureFunc} bg-blue contentContainerStyle={[styles(props).container, StyleSheet.flatten(props.styles)]}>
            {props.icon &&
                <View style={styles(props).iconCon}>
                    {props.icon && <CoreUI.Icon {...props.icon} />}
                </View>}
           {props.loading ? <ActivityIndicator color='white' size={"small"}  /> :  <Text adjustsFontSizeToFit numberOfLines={1} buttonText style={[styles(props).label, StyleSheet.flatten(props.labelStyle)]}>{props.title}</Text>}
        </Bounceable>
    );
};

export default Button;


const styles = (props: ButtonProps) => StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "90%",
        height: scale(55),
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        backgroundColor: props.color ? props.color : theme.color.cyan,
        justifyContent: props.icon ? "flex-start" : "center"
    },
    icn: {
        marginRight: 10
    },
    iconCon: { width: "30%", height: "100%", justifyContent: "center", alignItems: "flex-end", paddingRight: 20 },
    label: {
        maxWidth: "80%",
        marginTop: Platform.OS === "ios" ? 0 : 2
    }
});
