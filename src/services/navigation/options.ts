import { Platform } from 'react-native';
import { Options, OptionsTopBar } from 'react-native-navigation';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../../utils/constants';
import { getThemeColor, getThemeStatusBarStyle } from '../../utils/designSystem';
import { NavButton, navButtons } from './buttons';
import { moderateScale } from 'react-native-size-matters';

const ICON_SIZE = 25;

export const navDefaultOptions = (): Options => {
  return {
    layout: {
      orientation: ['portrait'],
      componentBackgroundColor: getThemeColor('bgColor'),
      backgroundColor: "#F4F6FA",
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      backgroundColor: getThemeColor('bgColor'),
      hideShadow: true,
      elevation: 0,
      visible: false,
      tabsAttachMode: 'afterInitialTab',
      animate: true,
    },
    bottomTab: {
      iconColor: Colors.primary,
      textColor: Colors.primary,
      selectedIconColor: Colors.primary,
      selectedTextColor: Colors.primary,
    },
    statusBar: {
      style: getThemeStatusBarStyle(),
      backgroundColor: theme.color.cyan,
    },
    topBar: {
      background: Platform.OS === "ios" ? {
        color: theme.color.cyan
      } : {
        color: getThemeColor('bgColor'),
        component: {
          name: "TopBarBG"
        }
      },
      backButton: {
        color: theme.color.white,
        showTitle: false
      },
      noBorder: true,
      elevation: 0,
      rightButtonColor: getThemeColor('textColor'),
      leftButtonColor: getThemeColor('textColor'),
      title: {
        color: "white",
        alignment: "center",
        fontFamily: theme.font.semibold,
        fontSize: moderateScale(theme.fontSize.large)
      },
      largeTitle: {
        visible: false,
        color: getThemeColor('textColor'),
      },
    },
    animations: {
      push: {
        waitForRender: true
      },
      pop: {
        waitForRender: true
      },
      setRoot: {
        waitForRender: true,
        // enter: {
        //   translationX: {
        //     from: widthPercentageToDP('100%'),
        //     to: 0,
        //   },
        // },
      }
    }
  };
};

export const withBottomTab = (text = 'Screen', icon = 'earth'): Options => ({
  bottomTab: {
    text,
    icon: Ionicons.getImageSourceSync(`${icon}-outline`, ICON_SIZE),
    selectedIcon: Ionicons.getImageSourceSync(icon, ICON_SIZE),
  },
});

export const withTitle = (text = 'Screen'): OptionsTopBar => ({
  title: { text },
});

export const withRightButtons = (...btns: NavButton[]): OptionsTopBar => ({
  rightButtons: btns.map(id => navButtons[id]),
});
