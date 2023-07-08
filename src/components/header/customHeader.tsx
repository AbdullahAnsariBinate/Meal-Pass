import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { VectorIcon } from '..';
import { screens } from '../../screens';
import { theme } from '../../utils/constants';

interface CustomHeaderProps {
    heading: string;
    componentId: string;
}

const CustomHeader = (props: CustomHeaderProps) => {

    const onBackButtonPressed = () => {
        screens.pop(props.componentId)
    }

    return (
        <Header
            placement="center"
            backgroundColor={theme.color.cyan}
            leftComponent={<VectorIcon onPress={onBackButtonPressed.bind(null)} vector={"AntDesign"} name={'arrowleft'} size={20} color={theme.color.white} />}
            centerComponent={{ text: props.heading, style: { color: theme.color.white, fontFamily: theme.font.semibold } }}
            style={styles.header}
            containerStyle={styles.header}
        />
    );
};

export default React.memo(CustomHeader);

const styles = StyleSheet.create({
    container: {},
    radius: {
        borderBottomEndRadius: 170,
        borderBottomStartRadius: 170
    },
    header: {
        backgroundColor: theme.color.cyan,
        borderBottomWidth: 0,
        elevation: 0
    },
    center: {
        alignSelf: "center"
    }
});
