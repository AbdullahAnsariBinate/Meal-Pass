import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Text, View } from 'react-native-ui-lib';
import { theme } from '../../utils/constants';
import { Shadow } from 'react-native-shadow-2';

interface RewardPointsBoxProps { }

const RewardPointsBox = (props: RewardPointsBoxProps) => {
    return (
        <Shadow distance={50} style={styles.shadowContainer} startColor={'rgba(26, 141, 141, .08)'} endColor={'rgba(26, 141, 141, .0)'} offset={[0, 0]}>
            <View bottom row spread marginV-10 padding-15 height={90} width={"92%"} style={styles.container} bg-cyan>
                <View style={styles.circleBox} />
                <View>
                    <Text smallmedium white>Reward Points</Text>
                    <Text largemedium white>25 Points</Text>
                </View>
                <Button labelStyle={styles.btnLabel} style={styles.btn} color={theme.color.white} mode='contained'>Redeem Points</Button>
            </View>
        </Shadow>
    );
};

export default RewardPointsBox;

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        borderRadius: 13,


        //shadow
        shadowColor: theme.color.cyan,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    shadowContainer: {
        width: "100%"
    },

    circleBox: {
        width: 150,
        height: 150,
        position: "absolute",
        backgroundColor: theme.color.white,
        borderRadius: 100,
        right: -50,
        top: -90,
        opacity: .2
    },
    btn: {
        height: 35,
        marginRight: 5
    },
    btnLabel: {
        fontFamily: theme.font.medium,
        fontSize: 10,
        color: theme.color.cyan,
        textTransform: "none"
    }
});
