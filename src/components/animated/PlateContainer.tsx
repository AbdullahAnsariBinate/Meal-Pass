import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { images } from '../../../assets/images';
import { NavigationProps } from '../../utils/types';
import PlateComponent from '../welcome/Plate';

interface PlateContainerProps {
    state: NavigationProps;
    _props: any;
    nativeId: string;
}

const PlateContainer = (props: PlateContainerProps) => {
    const { state, _props } = props;
    return (
        <View pointerEvents='none' key={state.componentId} nativeID={props.nativeId} style={styles.plateCon}>
            <PlateComponent nativeID={'plate1'} rotateTo={_props.bottomProps?.rotateTo} rotation={_props.bottomProps.rotation} animate_appear={_props.bottomProps?.animate} position={'left'} image={images.Steak} />
            <PlateComponent nativeID={'plate2'} rotateTo={_props.bottomProps?.rotateTo} rotation={_props.bottomProps.rotation} animate_appear={_props.bottomProps?.animate} position={'right'} image={images.Tree} />
        </View>
    );
};

export default React.memo(PlateContainer);

const styles = StyleSheet.create({
    container: {},
    plateCon: { position: "absolute", height: "100%", width: "100%", bottom: -90, zIndex: -1000 },

});
