import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Switch, Text, View } from 'react-native-ui-lib';
import { screens } from '..';
import { App } from '../../../App';
import { CoreUI } from '../../components';
import { useStores } from '../../stores';
import { theme } from '../../utils/constants';
import { getRandomParagraph } from '../../utils/help';

interface SettingsProps {
    componentId: string;
}

const Settings = (props: SettingsProps) => {
    const { user } = useStores();

    const onPressedLogout = () => {
        screens.N.setRoot(App())
    }

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner paddingT-10 bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={[styles.container]}>
                <View width={"93%"} padding-15 bg-white style={[styles.shadow, styles.radius, styles.centerH]}>
                    <Text largemedium cyan>About us</Text>
                    <Text smalllight black>{getRandomParagraph()}</Text>
                </View>

                <View spread marginT-10 row width={"93%"} padding-15 bg-white style={[styles.shadow, styles.radius, styles.centerH]}>
                    <Text smallmedium black>{"Notifications"}</Text>
                    <Switch onColor={theme.color.green} value={true} />
                </View>

                {user.type === "RIDER" && <View spread marginT-10 row width={"93%"} padding-15 bg-white style={[styles.shadow, styles.radius, styles.centerH]}>
                    <Text onColor={theme.color.green} smallmedium black>{"Ringer"}</Text>
                    <Switch onColor={theme.color.green} value={true} />
                </View>}

                <View spread marginT-10 row width={"93%"} padding-15 bg-white style={[styles.shadow, styles.radius, styles.centerH]}>
                    <Text onColor={theme.color.green} smallmedium black>{"Geo - Location"}</Text>
                    <Switch />
                </View>

                <View marginT-15>
                    <CoreUI.Button color={theme.color.cyan} title={"Change Password"} />
                    <CoreUI.Button onPress={onPressedLogout.bind(null)} color={theme.color.cyan} title={"Logout"} />
                </View>

            </CoreUI.FlowContaner>
        </React.Suspense >
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {},
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    radius: {
        borderRadius: 10
    },
    centerH: {
        alignSelf: "center"
    }
});
