import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { CoreUI, LocationCard } from '../../components';

interface LocationsProps {
    componentId: string;
}

const Locations = (props: LocationsProps) => {

    const locations = [
        {
            address: '816, Lorem Street, Dummy Address, USA'
        },
        {
            address: '816, Lorem Street, Dummy Address, USA'
        },
        {
            address: '816, Lorem Street, Dummy Address, USA'
        },
        {
            address: '816, Lorem Street, Dummy Address, USA'
        },
        {
            address: '816, Lorem Street, Dummy Address, USA'
        }
    ]

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner paddingH-15 paddingT-10 disableScroll bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                {locations && locations.map((address, index) => {
                    return <LocationCard key={index + 'addresscard'} address={address} />
                })}
            </CoreUI.FlowContaner>
        </React.Suspense>
    );
};

export default Locations;

const styles = StyleSheet.create({
    container: {}
});
