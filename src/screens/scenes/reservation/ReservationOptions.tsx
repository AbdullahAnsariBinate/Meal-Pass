import * as React from 'react';
import { StyleSheet } from 'react-native';
import { HScrollView } from 'react-native-head-tab-view'
import { Text, View } from 'react-native-ui-lib';
import { theme } from '../../../utils/constants';
import Calender from './Calender';
import RenderCount from 'react-native-render-count'


interface ReservationOptionsProps { }

const ReservationOptions = (props: ReservationOptionsProps) => {
    return (
        <HScrollView index={0}>
            <View style={styles.container}>
                {__DEV__ && <RenderCount />}
                <Calender key={'asdad'} />
            </View>
        </HScrollView>
    );
};

export default ReservationOptions;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: theme.color.white
    },
    calender: {
        borderRadius: 5,
        height: 350
    }
});
