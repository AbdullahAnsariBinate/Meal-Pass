import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Text, View } from 'react-native-ui-lib';
import { screens } from '..';
import { CoreUI, CustomHeader, DishCircle, VectorIcon } from '../../components';
import { theme } from '../../utils/constants';
import { getRandomParagraph } from '../../utils/help';

interface DishViewProps {
    componentId: string
}

const DishView = (props: DishViewProps) => {
    return (
        <React.Suspense fallback={<Text>loading...</Text>}>
            {/* <CustomHeader componentId={props.componentId} heading={'Chicken Salad'} /> */}
            <CoreUI.FlowContaner bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                <View flex>
                    <View width={"100%"} height={200} bg-cyan absT style={styles.radius} />
                    <DishCircle />
                    <View width={"93%"} style={styles.center}>
                        <Text cyan smallmedium>Description</Text>
                        <Text gray smallregular>{getRandomParagraph() + getRandomParagraph() + getRandomParagraph()}</Text>
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
        borderBottomEndRadius: 1000,
        borderBottomStartRadius: 1000
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
