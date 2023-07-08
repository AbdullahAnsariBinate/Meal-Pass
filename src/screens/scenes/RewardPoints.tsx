import * as React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import LootieView from 'lottie-react-native'
import Confeti from '../../../assets/lootie/confeti.json'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import { images_reward } from '../../../assets/images';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';
import { getRandomParagraph } from '../../utils/help';
import AnimatedLottieView from 'lottie-react-native';
import { useNavigationBottomTabPress, useNavigationBottomTabSelect, useNavigationComponentDidAppear } from 'react-native-navigation-hooks';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { CoreUI } from '../../components';
import { theme } from '../../utils/constants';

interface RewardPointsProps {
  componentId: string
}

const RewardPoints = (props: RewardPointsProps) => {
  const [animation, setAnimation] = React.useState(true);
  const lootieRef = React.useRef<React.LegacyRef<AnimatedLottieView> | undefined>()
  const initailLoad = React.useRef<boolean>(false);


  useNavigationComponentDidAppear(
    (e) => {
      if (!initailLoad.current) {
        initailLoad.current = true;
        onStartPlaying();
        // @ts-ignore
        lootieRef.current.play();
        const options = {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false
        };

        ReactNativeHapticFeedback.trigger("impactLight", options);
      }

    },
    { componentId: props.componentId }
  )


  const onStartPlaying = () => {
    setTimeout(() => {
      if (lootieRef.current) {
        // @ts-ignore
        lootieRef.current.pause();
      }
    }, 1200);
  }

  return (
    <React.Suspense fallback={<Text>Loading</Text>}>
      <CoreUI.FlowContaner isTabScreen index={3} componentId={props.componentId} flex bg-white style={styles.container}>
        {/* @ts-ignore */}
        {true && <LootieView ref={lootieRef} resizeMode="cover" autoPlay={false} loop={false} style={styles.animation} source={Confeti} />}
        <View flex centerH paddingT-30>
          <FastImage resizeMode='contain' source={images_reward.Reward} style={styles.rewardImg} />
          <Text extraLargebold cyan>Congrats</Text>
          <Text smallmedium black marginB-10>You are earned <Text cyan smallbold>2500</Text> Points</Text>
          <Text smalllight black marginH-15>{getRandomParagraph()}</Text>
        </View>
      </CoreUI.FlowContaner>
    </React.Suspense>
  );
};

export default RewardPoints;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.white
  },
  animation: {
    position: "absolute",
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('50%'),
    backgroundColor: "white"
  },
  rewardImg: {
    width: widthPercentageToDP('70%'),
    height: widthPercentageToDP('60%')
  },
});
