import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';

interface TopBarBGProps { }

const EmptyBackground = (props: TopBarBGProps) => {
    return (
        <View width={"100%"} height={'100%'} bg-cyan />
    );
};

export default EmptyBackground;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    }
});
