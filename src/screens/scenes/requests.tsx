import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { images_food } from '../../../assets/images';
import { CoreUI, SplitRequests, UserRequests } from '../../components';
import { getRandomFullName, getRandomImageUrl } from '../../utils/help';

interface RequestsProps {
    componentId: string;
}

const Requests = (props: RequestsProps) => {
    const [section, setSection] = React.useState(0);


    const split_request = [
        {
            title: "Double Quater",
            price: "$240",
            subtotal: "$590.00",
            tax: "$5.00",
            delivery: "Free",
            total: "$595.00",
            image: images_food.Food,
        },
        {
            title: "Double Quater",
            price: "$240",
            subtotal: "$590.00",
            tax: "$5.00",
            delivery: "Free",
            total: "$595.00",
            image: images_food.Food2,
        },
    ]


    const cart_requests = [
        {
            username: getRandomFullName(),
            image: getRandomImageUrl(),
        },
        {
            username: getRandomFullName(),
            image: getRandomImageUrl(),
        },
    ]

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner disableScroll bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                <View height={45} paddingH-10 marginT-10 marginB-15 row>
                    <TouchableOpacity onPress={setSection.bind(null, 0)} activeOpacity={.98} flex center bg-gray={section !== 0} bg-cyan={section === 0} height={45} paddingH-20 marginH-5 style={styles.radius}>
                        <Text white>Split Requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setSection.bind(null, 1)} activeOpacity={.98} flex center bg-gray={section !== 1} bg-cyan={section === 1} height={45} paddingH-20 marginH-5 style={styles.radius}>
                        <Text white>Cart Requests</Text>
                    </TouchableOpacity>
                </View>


                {section === 0 && <ScrollView>
                    <View paddingH-15>
                        <Text largemedium cyan>Pendng</Text>
                        {split_request && split_request.map((item) => {
                            return (
                                <SplitRequests type="active" key={item.title + 'splitPayment'} item={item} />
                            )
                        })}
                    </View>


                    <View paddingH-15>
                        <Text largemedium cyan>Past</Text>
                        {split_request && split_request.map((item) => {
                            return (
                                <SplitRequests type="inactive" key={item.title + 'splitPayment'} item={item} />
                            )
                        })}
                    </View>
                </ScrollView>}


                {section === 1 &&
                    <ScrollView>
                        <View paddingH-15>
                            <Text largemedium cyan>Pendng</Text>
                            {cart_requests && cart_requests.map((item) => {
                                return (
                                    <UserRequests type="active" key={item.username + 'cart_requests'} item={item} />
                                )
                            })}
                        </View>


                        <View paddingH-15>
                            <Text largemedium cyan>Past</Text>
                            {cart_requests && cart_requests.map((item) => {
                                return (
                                    <UserRequests type="inactive" key={item.username + 'cart_requestsinactive'} item={item} />
                                )
                            })}
                        </View>
                    </ScrollView>}
            </CoreUI.FlowContaner>
        </React.Suspense>
    );
};

export default Requests;

const styles = StyleSheet.create({
    container: {},
    radius: {
        borderRadius: 30
    }
});
