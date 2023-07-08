import * as React from 'react';
import { Alert, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { View } from 'react-native-ui-lib';
import { images_icons } from '../../../assets/images';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { DirectionType } from 'react-native-navigation-drawer-extension/lib/RNNDrawer';

interface MenuButtonProps { }

const MenuButton = (props: MenuButtonProps) => {

    const onMenuPressed = () => {
        RNNDrawer.showDrawer({
            component: {
                name: "Drawer",
                passProps: {
                    animationOpenTime: 300,
                    animationCloseTime: 300,
                    direction: DirectionType.left,
                    dismissWhenTouchOutside: true,
                    fadeOpacity: 0.6,
                    drawerScreenWidth: "75%" || 445, // Use relative to screen '%' or absolute
                    drawerScreenHeight: "100%" || 700,
                    parentComponentId: "",
                    style: { // Styles the drawer container, supports any react-native style
                        borderTopEndRadius: 20,
                        borderBottomEndRadius: 20
                    }
                },
            }
        });
    }

    return (
        <TouchableOpacity activeOpacity={.9} onPress={onMenuPressed.bind(null)}>
            <View width={20} height={20} marginL-15={Platform.OS === "android"}>
                <FastImage resizeMode='contain' source={images_icons.Menu} style={StyleSheet.absoluteFill} />
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(MenuButton);

const styles = StyleSheet.create({
    container: {}
});
