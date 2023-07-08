import * as React from 'react';
import { StyleSheet, Text as RnText } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import FacePile from 'react-native-face-pile'
import { getRandomImageUrl } from '../../utils/help';
import { VectorIcon } from '..';
import { theme } from '../../utils/constants';

interface UserRequestsProps {
    type: "active" | "inactive"
    item: any;
}

const UserRequests = (props: UserRequestsProps) => {
    const { item, type } = props;
    const { image, username } = item;


    const FACES = [
        {
            id: 0,
            imageUrl: getRandomImageUrl(),
        },
        {
            id: 1,
            imageUrl: getRandomImageUrl(),
        },
    ];


    return (
        <View marginV-5 marginB-40 padding-10 bg-white style={[styles.container, styles.shadow, styles.radius]}>
            <View spread row height={75} paddingR-20>
                <FastImage resizeMode='cover' source={{ uri: image }} style={[styles.img, styles.imgradius]} />
                <View flex paddingL-13 paddingT-13 >
                    <Text adjustsFontSizeToFit black smallsemibold style={styles.heading} marginT-5>{username}</Text>
                    {/* <RnText ></RnText> */}
                </View>


                <FacePile numFaces={2} faces={FACES} />
            </View>

            <View height={45} width="100%" style={styles.actionCon} absB paddingH-10 marginT-10 marginB-15 row>
                {type === "active" && <TouchableOpacity activeOpacity={.98} flex center bg-gray height={45} paddingH-20 marginH-5 style={styles.radius}>
                    <Text white>Decline</Text>
                </TouchableOpacity>}
                <TouchableOpacity activeOpacity={.98} flex center bg-cyan height={45} paddingH-20 marginH-5 style={styles.radius}>
                    <Text white>{type === "active" ? "Accept" : <Text white><VectorIcon style={styles.icn} vector={'FontAwesome'} name={'check'} size={20} color={theme.color.white} /> Accepted</Text>}</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default UserRequests;

const styles = StyleSheet.create({
    container: {},
    heading: {
        height: 23

    },
    radius: {
        borderRadius: 10
    },
    imgradius: {
        borderRadius: 100

    },

    img: {
        width: 65,
        height: 65
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    actionCon: {
        bottom: -45,
        alignSelf: "center"
    },
    icn: {
        top: 10,
    }
});
