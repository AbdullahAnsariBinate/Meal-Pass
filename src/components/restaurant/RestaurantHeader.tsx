import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { VectorIcon } from '..';
import { theme } from '../../utils/constants';


const HEADER_HEIGHT = 200;

interface RestaurantHeaderProps {
    restaurant: any;
}
const AnimatedView = Animated.createAnimatedComponent(View);

const RestaurantHeader = (props: RestaurantHeaderProps) => {
    const DEFAULT_IMAGE = Image.resolveAssetSource(props.restaurant.image);


    return (
        <View nativeID='header' height={HEADER_HEIGHT} width={"100%"} absT>
            <FastImage nativeID={'restaurant_image' + props.restaurant.id} resizeMode='cover' style={StyleSheet.absoluteFill} source={DEFAULT_IMAGE} />
            <AnimatedView width={"100%"} height={55} backgroundColor={'rgba(0,0,0,.4)'} absB marginB-0 paddingH-10>
                <Text white mediumbold>{props.restaurant.title}</Text>
                <View height={20} width={200} row paddingT-2>
                    {[0, 0, 0, 0, 0].map(() => {
                        return (
                            <VectorIcon vector="FontAwesome" name={'star'} size={15} color={theme.color.starorange} />
                        )
                    })}
                    <Text extraSmallmedium white> {" "}(4.9) (255 Reviews)</Text>
                </View>
            </AnimatedView>
        </View>
    );
};

export default React.memo(RestaurantHeader);

const styles = StyleSheet.create({
    container: {}
});
