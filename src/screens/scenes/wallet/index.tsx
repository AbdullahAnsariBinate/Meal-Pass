import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { SceneMap } from 'react-native-tab-view';
import { Text, View } from 'react-native-ui-lib';
import { CoreUI, RestaurantHeader, VectorIcon } from '../../../components';
import { theme } from '../../../utils/constants';
import Received from './Received';
import Withdrawal from './Withdrawal';

interface WalletProps {
    restaurant: any;
    componentId: string;
    action: "view" | "order"
}


const HEADER_HEIGHT = 200;

const Wallet = (props: WalletProps) => {
    const action: "view" | "order" = props.action ? props.action : "view";

    const [routes] = React.useState([
        { key: 'first', title: 'Received History' },
        { key: 'second', title: 'Withdrawl History' },
    ]
    );


    const renderScene = {
        first: Received,
        second: Withdrawal,
    }

    const renderheader = () => {
        return (
            <View centerH>
                <Text extraVLargemedium black>500</Text>
                <Button labelStyle={styles.btnLabel} contentStyle={styles.withdrawBtn} style={styles.withdrawBtn} color={theme.color.black} mode='contained'>Withdrawl</Button>
            </View>
        )
    }

    return (
        <React.Suspense fallback={<Text>loading...</Text>} >
            <CoreUI.CollapsableHeaderTabView
                componentId={props.componentId}
                headerHeight={200}
                routes={routes}
                scenes={renderScene}
                HeaderComponent={renderheader}
                action={props.action}
                restaurant={props.restaurant}
                isCustomTabsCircular
            />
        </React.Suspense>
    );
};

export default Wallet;

const styles = StyleSheet.create({
    container: {},
    withdrawBtn: {
        borderRadius: 40,
        height: 50,
        paddingHorizontal: 10
    },
    btnLabel: {
        textTransform: "none"
    }
});
