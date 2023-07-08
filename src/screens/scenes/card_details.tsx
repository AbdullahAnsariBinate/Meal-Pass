import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { images_cards } from '../../../assets/images';
import { CoreUI, PaymentCard } from '../../components';

interface CardDetailsProps {
    componentId: string;
}

const CardDetails = (props: CardDetailsProps) => {


    const cards = [
        {
            card: "◍◍◍◍ ◍◍◍◍ ◍◍◍◍ 1234",
            icon: images_cards.Paypal
        },
        {
            card: "◍◍◍◍ ◍◍◍◍ ◍◍◍◍ 1234",
            icon: images_cards.Stripe
        }
    ]

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner paddingT-10 bottomTabShouldHide componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                {cards && cards.map((card) => {
                    return (
                        <PaymentCard card={card} />
                    )
                })}
            </CoreUI.FlowContaner>
        </React.Suspense>
    );
};

export default CardDetails;

const styles = StyleSheet.create({
    container: {}
});
