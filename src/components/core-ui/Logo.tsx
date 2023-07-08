import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../../../assets/images';

interface LogoComponentProps { }

const LogoComponent = (props: LogoComponentProps) => {
    return (
        <FastImage resizeMode='contain' source={images.Logo} style={styles.img} />
    );
};

export default LogoComponent;

const styles = StyleSheet.create({
    img: {
        width: 150,
        height: 150,
        alignSelf: "center",
        marginVertical: 20
    },
});
