import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import moment from 'moment'
import RenderCount from 'react-native-render-count'

interface CalenderProps { }

const Calender = (props: CalenderProps) => {
    const DAYS_IN_MONTH = moment().daysInMonth();

    // Alert.alert("days in month", DAYS_IN_MONTH.toString())
    return (
        <View style={styles.container}>
            {__DEV__ && <RenderCount />}
            <Text>Calender</Text>
        </View>
    );
};

export default Calender;

const styles = StyleSheet.create({
    container: {}
});
