import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface TitleProps { }

const Title = (props: TitleProps) => {
    return (
        <View style={styles.container}>
            <Text>Title</Text>
        </View>
    );
};

export default Title;

const styles = StyleSheet.create({
    container: {}
});
