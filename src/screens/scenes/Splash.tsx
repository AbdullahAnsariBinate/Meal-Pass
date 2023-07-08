import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../../../assets/images';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { screens } from '..';
import { Root, Screen } from 'rnn-screens';
import { View } from 'react-native-ui-lib';
import SplashScreen from 'react-native-splash-screen'

interface SplashProps {
  componentId: string;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Splash = (props: SplashProps) => {
  const sizeValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);
  const rotationValue = useSharedValue(-80);

  React.useEffect(() => {
    SplashScreen.hide();
    rotationValue.value = withSpring(0);
    opacityValue.value = withDelay(2900, withTiming(0))
    sizeValue.value = withDelay(3000, withTiming(100));

    setTimeout(() => {
      screens.N.setRoot(Root(Screen(screens.get('SignIn'))));
    }, 2700);
  }, [''])



  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: sizeValue.value,
        },
        {
          rotate: `${rotationValue.value}deg`
        }
      ]
    }
  })

  const animatedStyleOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value
    }
  })

  return (
    <FastImage source={images.FullBackground} style={styles.container}>
      <View reanimated center centerH centerV width={182} height={182} bg-white style={[styles.box, animatedStyle]}  >
        <AnimatedImage resizeMode='contain' source={images.Logo} style={[styles.img, animatedStyleOpacity]} />
      </View>
    </FastImage>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "80%",
    height: "80%",
  },
  box: { width: 200, height: 200, backgroundColor: "white", borderRadius: 30, justifyContent: "center", alignItems: "center" },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  animation: {
    width: "100%",
    height: 250,
    left: -30,
  },
  anim: { width: "90%", height: 250 }
});
