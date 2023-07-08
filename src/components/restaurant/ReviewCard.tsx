import React from 'react';
import { StyleSheet, Text as RNTExt } from 'react-native';
import FastImage from 'react-native-fast-image';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { theme } from '../../utils/constants';
import VectorIcon from '../utils/Vector';

type Props = MarginModifiers & {
    temp: any;
    type: "features" | "favourites"
    rating: boolean;
};

// marginR-10 
const ReviewCard: React.FC<Props> = ({ temp, type, rating, ...modifiers }) => {
    return (
        <Bounceable>
            <View key={temp.title} marginB-10 width={"92%"} padding-10 bg-white  {...modifiers} style={[styles({ color: temp.color }).radius, styles({ color: temp.color }).shadow, styles({ color: temp.color }).center]} >
                <View height={53} paddingH-10 row spread>
                    <View row>
                        <FastImage resizeMode='cover' source={{ uri: temp.image }} style={[styles({}).img, styles({}).radius]} />
                        <View paddingL-10 paddingT-1>
                            <Text cyan smallmedium style={styles({}).heading}>{temp.full_name}</Text>
                            <View height={40} row spread>
                                <View height={20} width={95} row paddingL-0 paddingT-0>
                                    {[0, 0, 0, 0, 0].map(() => {
                                        return (
                                            <VectorIcon vector="FontAwesome" name={'star'} size={15} color={theme.color.starorange} />
                                        )
                                    })}
                                    <Text extraSmallmedium black> {" "}(4.9)</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text gray extraSmallregular style={styles({}).heading}>{temp.date}</Text>
                </View>

                <View row spread paddingL-15 width={"95%"}>
                    <Text numberOfLines={rating ? 2 : -1} marginB-5 black smalllight style={{ maxWidth: "100%" }}>{`Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation?`}</Text>
                </View>
            </View>
        </Bounceable>
    );
};

export default ReviewCard;


const styles = (props: any) => StyleSheet.create({
    radius: {
        borderRadius: 25
    },
    radiusLess: {
        borderRadius: 10,
    },
    shadow: {
        shadowColor: props.color,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 7,
        // backgroundColor:theme.color.cyan
    },
    contentContainerStyle: {
        paddingHorizontal: 10
    },
    heading: {
        height: 23
    },
    bgGray: {
        backgroundColor: theme.color.lightgray
    },
    posTop: {
        top: -1
    },
    img: {
        width: 50,
        height: 50
    },
    center: {
        alignSelf: "center"
    }
});
