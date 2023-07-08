import { Color } from 'react-native-navigation';
import { Colors, Spacings, ThemeManager, Typography } from 'react-native-ui-lib';
import { stores } from '../stores';
import { theme } from './constants';
import { PVoid, StatusBarStyle, ThemeColors } from './types';
import { Appearance } from './types/enums';
import { moderateScale, scale } from 'react-native-size-matters';

const colors = {
  primary: '#5383b8', // blue
  secondary: '#469c57', // green
  accent: '#fed330', // yellow
  _black: Colors.rgba(20, 20, 20, 1),
  _black2: Colors.rgba(50, 50, 50, 1),
  _white: Colors.rgba(250, 250, 250, 1),
  _white2: Colors.rgba(230, 230, 230, 1),
};

const themes: Record<Appearance, ThemeColors> = {
  system: {} as any,
  light: {
    textColor: colors._black,
    bgColor: colors._white,
    bg2Color: colors._white2,
  },
  dark: {
    textColor: colors._white,
    bgColor: colors._black,
    bg2Color: colors._black2,
  },
};

// for more information - https://wix.github.io/react-native-ui-lib/foundation/style
export const configureDesignSystem = async (): PVoid => {
  const { ui } = stores;

  if (ui.isAppearanceSystem) {
    Colors.loadColors(colors);
    Colors.loadColors(theme.color);
    Colors.loadSchemes(themes);
  } else {
    Colors.loadColors({ ...colors, ...themes[ui.appearance] });
    Colors.loadSchemes({ dark: {}, light: {} });
  }

  let fontFamilies: any = {}
  let fontProfiles: any = {};

  for (let [key, value] of Object.entries(theme.font)) {
    console.log(`${key}: ${value}`);
    fontFamilies[key] = { fontFamily: value }
  }

  for (let [key, value] of Object.entries(theme.font)) {
    console.log(`${key}: ${value}`);
    fontProfiles['extraSmall' + key] = { fontFamily: value, fontSize: scale(theme.fontSize.extraSmall) }
    fontProfiles['extraLarge' + key] = { fontFamily: value, fontSize: scale(theme.fontSize.extraLarge) }
    fontProfiles['extraVLarge' + key] = { fontFamily: value, fontSize: scale(theme.fontSize.extraVLarge) }

    fontProfiles['large' + key] = { fontFamily: value, fontSize: scale(theme.fontSize.large) }
    fontProfiles['medium' + key] = { fontFamily: value, fontSize: scale(theme.fontSize.medium) }
    fontProfiles['small' + key] = { fontFamily: value, fontSize: scale(theme.fontSize.small) }
    fontProfiles['extraVSmall' + key] = { fontFamily: value, fontSize: scale(theme.fontSize.extraVSmall) }

  }


  Typography.loadTypographies({
    ...fontFamilies,
    ...fontProfiles,
    section: { fontSize: moderateScale(26), fontWeight: '600' },
    cardBold: { color: theme.color.white, fontSize: scale(25), fontWeight: "bold", alignSelf: "flex-end", textAlign: "right" },
    buttonText: { color: theme.color.white, fontSize: scale(15), fontFamily: theme.font.semibold }

  });

  Spacings.loadSpacings({
    page: 15,
  });

  ThemeManager.setComponentTheme('Text', {
    regular: true, // will set the text70 typography modifier prop to be true by default
  });


};

export const getThemeColor = (c: keyof ThemeColors): Color => {
  const { ui } = stores;

  if (ui.isAppearanceSystem) {
    return {
      dark: themes.dark[c],
      light: themes.light[c],
    };
  } else {
    return themes[ui.appearance][c];
  }
};

export const getThemeStatusBarStyle = (): StatusBarStyle => {
  const { ui } = stores;

  if (ui.isAppearanceSystem) {
    return undefined;
  } else {
    switch (ui.appearance) {
      case 'dark':
        return 'light';
      case 'light':
        return 'dark';
    }
  }
};
