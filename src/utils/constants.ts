import * as React from 'react'
import { Dimensions, Text, View } from 'react-native';
import { Options } from 'react-native-navigation';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const useConstants = () => {
  const dim = Dimensions.get('screen');

  return {
    dim,
    links: {
      github: 'https://github.com/kanzitelli/rnn-starter',
      website: 'https://batyr.io',
    },
  };
};


const fontRegularName = "Poppins"

export const theme = {
  font: {
    light: fontRegularName + "-Light",
    light_italic: fontRegularName + "-LightItalic",
    regular: fontRegularName + "-Regular",
    semibold: fontRegularName + "-SemiBold",
    semibold_italic: fontRegularName + "-SemiBoldItalic",
    extra_light: fontRegularName + "-ExtraLight",
    extra_light_italic: fontRegularName + "-ExtraLightItalic",
    bold: fontRegularName + "-Bold",
    bold_italic: fontRegularName + "-BoldItalic",
    extra_bold: fontRegularName + "-ExtraBold",
    extra_bold_italic: fontRegularName + "-ExtraBoldItalic",
    medium: fontRegularName + "-Medium",
    popins_semibold: "Poppins-SemiBold",
  },
  fontSize: {
    extraVSmall: 9,
    extraSmall: 10,
    small: 14,
    medium: 16,
    large: 18,
    extraLarge: 28,
    extraVLarge: 45,

  },
  color: {
    white: "#FFFFFF",
    cyan: "#1A8D8D",
    black: "#131313",
    fblue: "#1878F3",
    googlered: "#EC4040",
    bg: "#F4F6FA",
    cyanlight: "#42CFB7",
    lightbrown: "#CF8942",
    lightblue: "#46B1E1",
    purple: "#7142CF",
    iconlit: "#1A8D8D",
    transparent: "transparent",
    fieldborder: "#E2E5F1",
    fieldlabel: "#BBC1D2",
    darkWhite: '#FAFAFA',
    starorange: "#F1C40F",
    lightgray: "#e1e4f1",
    pageColor: "#F4F6FA",
    gray: "gray",
    leaf: "#618a3d",
    orange: "orange",
    green: "green",
    red: "red",
  }
}


import { CoreUI } from '../components'
import { action_keys, IconProps, PageConfigurations } from './types';

type Pages = "LOGIN" | "FORGETPASS" | "SIGNUP" | "PRELOGIN" | "VERIFICATION" | "RESETPASSWORD" | "VIEWPROFILE" | "EDITPROFILE" | "CREATEEVENT" | "SIGNUP_RIDER"
type Configuration = { [page in Pages]: PageConfigurations };

export const forms: Configuration = {
  LOGIN: {
    title: "LOGIN",
    key: 'login',
    actionText: "LOGIN",
    fields: [
      {
        placeHolder: "dummy@email.com",
        icon: {
          vector: "Entypo",
          name: "mail",
          color: theme.color.cyan,
          size: 25
        },
        label: "Email Address",
        error: "Please provide valid Email Address",
        key: "email",
        type: "email",
        secure: false,
      },
      {
        placeHolder: "Password",
        icon: {
          vector: "FontAwesome",
          name: "lock",
          color: theme.color.cyan,
          size: 25
        },
        floating: "Password",
        label: "Password",
        error: "Password must be atleast 8 chars.",
        key: "password",
        type: "password",
        secure: true,
      }
    ],
    secondaryActions: [
      {
        color: theme.color.transparent,
        title: "Forget Password?",
        styles: { marginTop: 10 },
        labelStyle: {
          color: theme.color.black,
          fontFamily: theme.font.medium
        },
        action: "forget_password_navigate"
      }
    ],
    bottomActions: [
      {
        color: theme.color.transparent,
        title: React.createElement(Text, {
          children: [
            "Do you have an account?",
            React.createElement(Text, { style: { fontFamily: theme.font.bold }, key: "Signup", children: " Signup" })
          ],
          key: "Do you have an account?",
        }),
        styles: {
          borderColor: theme.color.white,
          backgroundColor: "rgba(0,0,0,.65)",
          borderWidth: 1
        },
        labelStyle: {
          color: theme.color.white,
          fontFamily: theme.font.medium
        },
        action: "no_account_navigate"
      }
    ],
    navigationOptions: undefined
  },
  FORGETPASS: {
    title: 'FORGET PASSWORD',
    actionText: 'Get Code',
    fields: [
      {
        placeHolder: "dummy@email.com",
        icon: {
          vector: "Entypo",
          name: "mail",
          color: theme.color.cyan,
          size: 25
        },
        label: "Email Address",
        error: "Please provide valid Email Address",
        key: "email",
        type: "email",
        secure: false,
      },
    ],
    secondaryActions: undefined,
    bottomActions: undefined,
    key: '',
    navigationOptions: undefined
  },
  SIGNUP_RIDER: {
    title: 'Sign up',
    actionText: 'Sign up',
    fields: [
      {
        placeHolder: "Full Name",
        floating: "Full Name",
        icon: {
          vector: "Entypo",
          name: "user",
          color: theme.color.cyan,
          size: 25
        },
        label: "Full Name",
        error: "Please provide Full Name.",
        key: "full_name",
        type: "string",
        secure: false,
      },
      {
        placeHolder: "Password",
        icon: {
          vector: "FontAwesome",
          name: "lock",
          color: theme.color.cyan,
          size: 25
        },
        floating: "Password",
        label: "Password",
        error: "Password must be atleast 8 chars.",
        key: "password",
        type: "password",
        secure: true,
      },
      {
        placeHolder: "Confirm Password",
        icon: {
          vector: "FontAwesome",
          name: "lock",
          color: theme.color.cyan,
          size: 25
        },
        floating: "Confirm Password",
        label: "Confirm Password",
        error: "Password does not match",
        key: "confirm_password",
        type: "password",
        secure: true,
      },
      {
        placeHolder: "Phone Number",
        icon: {
          vector: "FontAwesome",
          name: "phone",
          color: theme.color.cyan,
          size: 25
        },
        floating: "Confirm Password",
        label: "Confirm Password",
        error: "Password does not match",
        key: "phone",
        type: "phone",
        secure: false,
      },
      {
        placeHolder: "Vehicle Number",
        floating: "Vehicle Number",
        icon: {
          vector: "MaterialCommunityIcons",
          name: "bike",
          color: theme.color.cyan,
          size: 25
        },
        label: "Vehicle Number",
        error: "Please provide Vehicle Number.",
        key: "vehicle_number",
        type: "string",
        secure: false,
      },
      {
        placeHolder: "Licence Number",
        floating: "Licence Number",
        icon: {
          vector: "FontAwesome",
          name: "hashtag",
          color: theme.color.cyan,
          size: 25
        },
        label: "Licence Number",
        error: "Please provide Licence Number.",
        key: "license_no",
        type: "string",
        secure: false,
      },
    ],
    secondaryActions: undefined,
    bottomActions: undefined,
    key: '',
    navigationOptions: undefined
  },
  SIGNUP: {
    title: 'Sign up',
    actionText: 'Sign up',
    fields: [
      {
        placeHolder: "Full Name",
        floating: "Full Name",
        icon: {
          vector: "Entypo",
          name: "user",
          color: theme.color.cyan,
          size: 25
        },
        label: "Full Name",
        error: "Please provide Full Name.",
        key: "name",
        type: "string",
        secure: false,
      },
      {
        placeHolder: "Email Address",
        floating: "Email Address",
        icon: {
          vector: "Entypo",
          name: "mail",
          color: theme.color.cyan,
          size: 25
        },
        label: "Email Address",
        error: "Please provide valid Email Address",
        key: "email",
        type: "email",
        secure: false,
      },
      {
        placeHolder: "Password",
        icon: {
          vector: "FontAwesome",
          name: "lock",
          color: theme.color.cyan,
          size: 25
        },
        floating: "Password",
        label: "Password",
        error: "Password must be atleast 8 chars.",
        key: "password",
        type: "password",
        secure: true,
      },
      {
        placeHolder: "Confirm Password",
        icon: {
          vector: "FontAwesome",
          name: "lock",
          color: theme.color.cyan,
          size: 25
        },
        floating: "Confirm Password",
        label: "Confirm Password",
        error: "Password does not match",
        key: "confirm_password",
        type: "password",
        secure: true,
      },
      {
        placeHolder: "Phone Number",
        icon: {
          vector: "FontAwesome",
          name: "phone",
          color: theme.color.cyan,
          size: 25
        },
        floating: "Phone Number",
        label: "Phone Number",
        error: "Phone Number is required.",
        key: "phone",
        type: "phone",
        secure: false,
      }
    ],
    secondaryActions: undefined,
    bottomActions: undefined,
    key: '',
    navigationOptions: undefined
  },
  PRELOGIN: {
    title: '',
    actionText: '',
    fields: [],
    secondaryActions: undefined,
    bottomActions: undefined,
    key: '',
    navigationOptions: undefined
  },
  VERIFICATION: {
    title: '',
    actionText: '',
    fields: [],
    secondaryActions: undefined,
    bottomActions: undefined,
    key: '',
    navigationOptions: undefined
  },
  RESETPASSWORD: {
    title: "LOGIN",
    key: 'login',
    actionText: "Continue",
    fields: [
      {
        placeHolder: "Enter New Password",
        icon: {
          vector: "FontAwesome",
          name: "lock",
          color: theme.color.cyan,
          size: 25
        },
        floating: "Enter New Password",
        label: "Enter New Password",
        error: "Password must be atleast 8 chars.",
        key: "password",
        type: "password",
        secure: true,
      },
      {
        placeHolder: "Confirm Password",
        icon: {
          vector: "FontAwesome",
          name: "lock",
          color: theme.color.cyan,
          size: 25
        },
        floating: "Confirm Password",
        label: "Confirm Password",
        error: "Password must be atleast 8 chars.",
        key: "confirm_password",
        type: "password",
        secure: true,
      }
    ],
    secondaryActions: undefined,
    bottomActions: undefined,
    navigationOptions: undefined
  },
  VIEWPROFILE: {
    title: '',
    actionText: '',
    fields: [],
    secondaryActions: undefined,
    bottomActions: undefined,
    key: '',
    navigationOptions: undefined
  },
  EDITPROFILE: {
    title: '',
    actionText: '',
    fields: [],
    secondaryActions: undefined,
    bottomActions: undefined,
    key: '',
    navigationOptions: undefined
  },
  CREATEEVENT: {
    title: '',
    actionText: '',
    fields: [],
    secondaryActions: undefined,
    bottomActions: undefined,
    key: '',
    navigationOptions: undefined
  }
}


export const auth_options: Options = {
  animations: {
    push: {
      waitForRender: true,
      enabled: true,
      sharedElementTransitions: [
        {
          fromId: "plateBox",
          toId: "plateBox",
          interpolation: {
            type: "overshoot"
          },
          duration: 1
        }
      ]
    },
  }
};


export const available_auth_buttons = [
  {
    title: "Sign in with Email",
    icon: {
      vector: "MaterialCommunityIcons",
      name: "email",
      color: theme.color.white,
      size: scale(25)
    } as unknown as IconProps,
    action: 'email_continue' as action_keys,
    color: theme.color.cyan,
  },
  {
    title: "Sign in with Apple",
    icon: {
      vector: "MaterialCommunityIcons",
      name: "apple",
      color: theme.color.white,
      size: scale(25)
    } as unknown as IconProps,
    action: 'apple_continue' as action_keys,
    color: theme.color.black,
  },
  {
    title: "Sign in with Facebook",
    icon: {
      vector: "MaterialCommunityIcons",
      name: "facebook",
      color: theme.color.white,
      size: scale(25)
    } as unknown as IconProps,
    action: 'facebook_continue' as action_keys,
    color: "#1878F3",
  },
  {
    title: "Sign in with Google",
    icon: {
      vector: "MaterialCommunityIcons",
      name: "google",
      color: theme.color.white,
      size: 25
    } as unknown as IconProps,
    action: 'google_continue' as action_keys,
    color: "#EC4040",
  }
]
