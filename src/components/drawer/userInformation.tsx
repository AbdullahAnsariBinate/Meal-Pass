import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Text, View } from 'react-native-ui-lib';
import { theme } from '../../utils/constants';
import { getRandomFullName, getRandomImageUrl } from '../../utils/help';
import VectorIcon from '../utils/Vector';

interface UserInformationProps {
    textColor?: string;
}

const UserInformation = (props: UserInformationProps) => {
    return (
        <View height={280} centerH paddingT-20>
            <Avatar containerStyle={styles.borderContainer} avatarStyle={styles.borderAvatar} rounded size={140} source={{ uri: getRandomImageUrl() }} />

            <Text mediumbold cyan color={props.textColor}>{getRandomFullName()}</Text>
            <Text vsmalllight black color={props.textColor}>{'john.smith@domain.com'}</Text>
            <Text vsmalllight black color={props.textColor}>{'+0 123 456 789'}</Text>
        </View>
    );
};

export default UserInformation;

const styles = StyleSheet.create({
    container: {
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        overflow: "hidden"
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
        top: 10,
        right: 20
    }
});
