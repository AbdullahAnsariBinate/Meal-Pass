import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { lazy } from 'react';
import { Alert, Platform, ScrollView, StyleSheet } from 'react-native';
import { useNavigationComponentDidAppear, useNavigationComponentDidDisappear } from 'react-native-navigation-hooks';
import { Button } from 'react-native-paper';
import { Text, View } from 'react-native-ui-lib';
import { screens } from '..';
import { CartAddons, CartTotals, CoreUI, VectorIcon } from '../../components';

const CartDelivery = lazy(() => import('../../components/cart/delivery'))
const RewardPointsBox = lazy(() => import('../../components/cart/rewardPoints'))


// import CartDelivery from '../../components/cart/delivery';
// import RewardPointsBox from '../../components/cart/rewardPoints';


import { useServices } from '../../services';
import { theme } from '../../utils/constants';

interface CartProps {
    componentId: string;
}

const Cart = (props: CartProps) => {

    const childerens = [
        <React.Suspense fallback={<Text>Loading</Text>}>
            <RewardPointsBox />
        </React.Suspense>,
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CartDelivery />
        </React.Suspense>,
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CartAddons />
        </React.Suspense>,
        <React.Suspense fallback={<Text>Loading</Text>}>
            <View row spread centerV paddingH-page marginT-10 height={40} width={"100%"}>
                <Text mediummedium black>Split Partner</Text>
                <Button style={styles.addBtn} labelStyle={styles.btnLbl} color={theme.color.cyan} mode='contained'>Add</Button>
            </View>
        </React.Suspense>,
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CartTotals />
        </React.Suspense>,
        <React.Suspense fallback={<Text>Loading</Text>}>
            <Button labelStyle={styles.chkLabelBtn} color={theme.color.cyan} contentStyle={styles.chkoutBtn} style={styles.chkoutBtn} mode="contained">Checkout</Button>
        </React.Suspense>
    ]

    const goBack = React.useCallback(() => {
        const onPressBack = () => {
            screens.N.mergeOptions(props.componentId, {
                bottomTabs: {
                    currentTabIndex: 0
                }
            })
        }
        return (
            <React.Suspense fallback={<Text>Loading</Text>}>
                <VectorIcon onPress={onPressBack.bind(null)} vector={'AntDesign'} name={'arrowleft'} size={20} color={theme.color.white} style={styles.marginRight} />
            </React.Suspense>
        )
    }, [' ']);

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner leftButtons={[{ name: "GoBack", component: () => goBack.bind(null) }]} isTabScreen index={2} disableScroll bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                <FlashList
                    contentContainerStyle={styles.contentContainer}
                    data={childerens}
                    renderItem={({ item }) => {
                        return item;
                    }}
                    estimatedItemSize={300}
                />
            </CoreUI.FlowContaner>
        </React.Suspense>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {},
    addBtn: {
        borderRadius: 20,
        width: 90
    },
    btnLbl: {
        textTransform: "none"
    },
    chkoutBtn: {
        width: "92%",
        alignSelf: "center",
        height: 50,
        borderRadius: 20
    },
    chkLabelBtn: {
        textTransform: "none",
        fontFamily: theme.font.semibold
    },
    contentContainer: { paddingBottom: 20 },
    marginRight: {
        marginLeft: Platform.OS === "android" ? 10 : 0
    }
});
