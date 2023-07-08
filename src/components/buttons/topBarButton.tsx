import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface TopBarButtonProps { }

const TopBarButton = (props: TopBarButtonProps) => {
    return (
        <View style={styles.container}>
            <Text>TopBarButton</Text>
        </View>
    );
};

export default TopBarButton;

const styles = StyleSheet.create({
    container: {}
});
