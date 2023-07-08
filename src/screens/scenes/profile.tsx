import * as React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Text, View } from 'react-native-ui-lib';
import { screens } from '..';
import { CoreUI, CustomHeader, DishCircle, UserInformation, VectorIcon } from '../../components';
import { useServices } from '../../services';
import { theme } from '../../utils/constants';
import { getRandomParagraph } from '../../utils/help';

interface DishViewProps {
    componentId: string
}

const DishView = (props: DishViewProps) => {

    const { Components } = useServices();


    // React.useEffect(() => {
    //     setTimeout(() => {
    //         screens.N.mergeOptions(props.componentId, {
    //             topBar: {
    //                 visible: true,
    //                 background: {
    //                     color: theme.color.cyan,
    //                     component: {
    //                         name: "EmptyBackground"
    //                     }
    //                 }
    //             }
    //         })
    //     }, 1000);

    // }, [' '])

    return (
        <React.Suspense fallback={<Text>loading...</Text>}>
            {/* {Platform.OS === "android" && <CustomHeader heading={'Profile'} componentId={props.componentId} />} */}
            <CoreUI.FlowContaner removeTopBarBG bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                <View flex>
                    <View width={"100%"} height={280} bg-cyan absT style={styles.radius} />
                    <UserInformation textColor={theme.color.white} />


                    <View marginT-10 width={"100%"} style={styles.center}>
                        <Components._Recommended mode={'most_ordered'} />
                    </View>
                </View>
            </CoreUI.FlowContaner>
        </React.Suspense>
    );
};

export default DishView;

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
