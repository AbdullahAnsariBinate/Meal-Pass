import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { VectorIcon } from '..';
import { theme } from '../../utils/constants';

interface SearchBoxProps { }

const SearchBox = (props: SearchBoxProps) => {
    return (
        <View row centerV spread height={55} paddingH-15 width="100%" bg-cyan style={styles.container}>
            <VectorIcon vector={"Fontisto"} name={'search'} size={25} color={theme.color.white} />
            <TextInput placeholder='Search Restaurant' placeholderTextColor={theme.color.lightgray} style={styles.field} />
        </View>
    );
};

export default SearchBox;

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        // borderWidth: 2,
        borderColor: theme.color.lightgray,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
        // borderRadius: 10
    },
    field: {
        flex: 1,
        marginLeft: 13,
        color: theme.color.white,
        fontFamily: theme.font.medium,
        height: 55,
        marginTop: 3
    }
});
