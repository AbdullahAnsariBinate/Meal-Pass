import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../../../assets/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface TopBarBGProps { }

const TopBarBG = (props: TopBarBGProps) => {
    return (
        <FastImage resizeMode='stretch' source={images.Background} style={styles.container} />
    );
};

export default React.memo(TopBarBG);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    }
});
