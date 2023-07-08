import * as React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, Text as RNText } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RNNDrawer } from 'react-native-navigation-drawer-extension';
import { Text, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { VectorIcon } from '..';
import { useServices } from '../../services';
import { useStores } from '../../stores';
import { theme } from '../../utils/constants';
import { getRandomFullName, getRandomImageUrl } from '../../utils/help';
import { action_keys } from '../../utils/types';
import UserInformation from './userInformation';



interface DrawerComponentProps { }
const ICON_SIZE = 25;
const DrawerComponent = (props: DrawerComponentProps) => {
    const { events } = useServices()
    const { user } = useStores();
    const onPressCloseModal = () => {
        RNNDrawer.dismissDrawer()
    }


    const drawer = user.type === "USER" ? [
        {
            title: "Profile",
            icon: (<VectorIcon vector={'FontAwesome'} name={'user'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_profile_page" as action_keys
        },
        {
            title: "Reservations",
            icon: (<VectorIcon vector={'MaterialCommunityIcons'} name={'alarm-bell'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_preservations" as action_keys
        },
        {
            title: "Locations",
            icon: (<VectorIcon vector={'MaterialIcons'} name={'person-pin'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_locations" as action_keys
        },
        {
            title: "History",
            icon: (<VectorIcon vector={'MaterialCommunityIcons'} name={'timeline-clock'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_history" as action_keys
        },
        {
            title: "Requests",
            icon: (<VectorIcon vector={'MaterialCommunityIcons'} name={'comment-account'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_requests" as action_keys
        },
        {
            title: "Card Detail",
            icon: (<VectorIcon vector={'FontAwesome'} name={'credit-card-alt'} size={ICON_SIZE - 5} color={theme.color.white} />),
            key: "to_card_details" as action_keys
        },
        {
            title: "Settings",
            icon: (<VectorIcon vector={'MaterialIcons'} name={'settings'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_settings" as action_keys
        },
        {
            title: "Terms & Conditions",
            icon: (<VectorIcon vector={'Foundation'} name={'page-doc'} size={ICON_SIZE - 2} color={theme.color.white} />),
            key: "to_terms" as action_keys
        },
        {
            title: "Privacy policy",
            icon: (<VectorIcon vector={'MaterialIcons'} name={'privacy-tip'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_privacy" as action_keys
        },
        {
            title: "Logout",
            icon: (<VectorIcon vector={'Ionicons'} name={'exit'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_logout" as action_keys
        }
    ] : [
        {
            title: "Profile",
            icon: (<VectorIcon vector={'FontAwesome'} name={'user'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_profile_page" as action_keys
        },
        {
            title: "Home",
            icon: (<VectorIcon vector={'MaterialCommunityIcons'} name={'home'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_none" as action_keys
        },
        {
            title: "My Earnings",
            icon: (<VectorIcon vector={'Foundation'} name={'dollar-bill'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_wallet" as action_keys
        },
        {
            title: "Card Detail",
            icon: (<VectorIcon vector={'FontAwesome'} name={'credit-card-alt'} size={ICON_SIZE - 5} color={theme.color.white} />),
            key: "to_card_details" as action_keys
        },
        {
            title: "Settings",
            icon: (<VectorIcon vector={'MaterialIcons'} name={'settings'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_settings" as action_keys
        },
        {
            title: "Terms & Conditions",
            icon: (<VectorIcon vector={'Foundation'} name={'page-doc'} size={ICON_SIZE - 2} color={theme.color.white} />),
            key: "to_terms" as action_keys
        },
        {
            title: "Privacy policy",
            icon: (<VectorIcon vector={'MaterialIcons'} name={'privacy-tip'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_privacy" as action_keys
        },
        {
            title: "Logout",
            icon: (<VectorIcon vector={'Ionicons'} name={'exit'} size={ICON_SIZE} color={theme.color.white} />),
            key: "to_logout" as action_keys
        }
    ]


    const onButtonPressed = (event: action_keys) => {
        onPressCloseModal();
        events.onEventPressed(event, { componentId: "Home" });
    }


    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <View flex style={styles.container}>
                <UserInformation />
                <VectorIcon onPress={onPressCloseModal.bind(null)} style={styles.closeIcn} vector={'Octicons'} name="x" size={40} color={theme.color.black} />

                <View flex bg-cyan paddingT-15>
                    <ScrollView>
                        {drawer && drawer.map((event, index) => {
                            return (
                                <TouchableOpacity onPress={onButtonPressed.bind(null, event.key)} activeOpacity={.9}>
                                    <View paddingH-15 height={41} key={'drawer_action' + index} row width={'90%'}>
                                        <View width={37} center>
                                            {event.icon}
                                        </View>
                                        <View flex centerV>
                                            <Text numberOfLines={1} adjustsFontSizeToFit smallmedium white>{'    '}{event.title}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        </React.Suspense>
    );
};

export default React.memo(DrawerComponent);

const styles = StyleSheet.create({
    container: {
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        overflow: "hidden",
        paddingTop: Platform.OS === "ios" ? 35 : 0
    },
    border: {
        borderWidth: 1
    },
    borderAvatar: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: theme.color.white
    },
    borderContainer: {
        borderWidth: 3,
        borderColor: theme.color.cyan
    },
    closeIcn: {
        position: "absolute",
        top: Platform.OS === "ios" ? 40 : 10,
        right: 20,
    }
});
