import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { OptionsStatusBar, OptionsLayout, OptionsModalPresentationStyle, OptionsModalTransitionStyle, OptionsTopBar, OptionsFab, OptionsBottomTabs, OptionsBottomTab, OptionsSideMenu, OptionsSplitView, OverlayOptions, ModalOptions, AnimationOptions, NavigationBarOptions, HardwareBackButtonOptions, OptionsPreview, ImageResource, WindowOptions } from "react-native-navigation";

// `stores` layer
interface IStore {
  hydrate?: () => PVoid;
}
type Stores = Record<string, IStore>;

type StoreDefaultKeys = 'set' | 'setMany' | 'hydrate';
type StoreKeysOf<S> = keyof Omit<S, StoreDefaultKeys>;

// `services` layer
interface IService {
  init: () => PVoid;
}
type Services = Record<string, IService>;

// System
type PVoid = Promise<void>;
type VoidAction = () => void;


type AnyObj = Record<string, unknown>;
type PureFunc = () => void;
type PureFuncAsync = () => PVoid;
type PureFuncArg<T> = (value?: T) => void;

// Design system
type StatusBarStyle = 'light' | 'dark' | undefined;
type ThemeColors = {
  textColor: string;
  bgColor: string;
  bg2Color: string;
};



// screens interfaces
interface WelcomeProps {
  componentId: string;
  options: Options;
}




type FieldType = "daterange" | "datetime" | "password" | "email" | "string" | "phone" | "button" | "button_gradient" | "otp"
type Field = {
  placeHolder: string;
  key: string;
  type: FieldType;
  secure: boolean | undefined;
  error: string;
  label?: string;
  icon?: IconProps;
  floating?: string;
  masked?: boolean;
  mask?: string;
  gadients?: string[];
  fontColor?: string;
  disabled?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  multiline?: boolean | undefined,
  borderRadius?: number;
  underline?: boolean;
  fields?: Field[];
  rightIcon?: IconProps;
};

type PageConfigurations = {
  title: string;
  actionText: string;
  fields: Field[];
  secondaryActions?: ButtonProps[];
  bottomActions?: ButtonProps[];
  key: string;
  navigationOptions?: Options
}

type icon_vector = "FontAwesome" | "Fontisto" | "MaterialCommunityIcons" | "AntDesign" | "FontAwesome" | "FontAwesome5" | "Entypo" | "EvilIcons" | "Feather" | "MaterialIcons" | "SimpleLineIcons" | "Zocial" | "Octicons" | "Ionicons" | "Foundation" | "Fontisto"

interface IconProps {
  vector: icon_vector;
  name: string;
  size: number;
  color: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

type action_keys =
  "forget_password_navigate" |
  "no_account_navigate" |
  "email_continue" |
  "apple_continue" |
  "facebook_continue" |
  "google_continue" |
  "user_clicked" |
  "restaurant_page_navigate" |
  "restaurant_dish_navigate" |
  "to_profile_page" |
  "to_preservations" |
  "to_locations" |
  "to_history" |
  "to_requests" |
  "to_card_details" |
  "to_settings" |
  "to_terms" |
  "to_privacy" |
  "to_logout" |
  "to_reservation_details" |
  "to_history_details" |
  "to_wallet" |
  "on_signup_pressed" |
  "on_reset_code_approved"



interface ButtonProps {
  icon?: IconProps;
  color: string;
  onPress?: () => {} | any;
  title: string | Element;
  styles?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  action?: action_keys;
  loading?:boolean;
}


interface Options {
  /**
   * Configure the status bar
   */
  statusBar?: OptionsStatusBar;
  /**
   * Configure the layout
   */
  layout?: OptionsLayout;
  /**
   * Configure the presentation style of the modal
   */
  modalPresentationStyle?: OptionsModalPresentationStyle;
  /**
   * Configure the transition style of the modal
   *
   * #### (Android specific)
   */
  modalTransitionStyle?: OptionsModalTransitionStyle;
  /**
   * Configure the top bar
   */
  topBar?: OptionsTopBar;
  fab?: OptionsFab;
  /**
   * Configure the bottom tabs
   */
  bottomTabs?: OptionsBottomTabs;
  /**
   * Configure the bottom tab associated to the screen
   */
  bottomTab?: OptionsBottomTab;
  /**
   * Configure the side menu
   */
  sideMenu?: OptionsSideMenu;
  /**
   * Configure the splitView controller
   */
  splitView?: OptionsSplitView;
  /**
   * Configure the overlay
   */
  overlay?: OverlayOptions;
  /**
   * Configure the modal
   */
  modal?: ModalOptions;
  /**
   * Animation used for navigation commands that modify the layout
   * hierarchy can be controlled in options.
   *
   * Animations can be modified per command and it's also possible
   * to change the default animation for each command.
   *
   * Example:
```js
setRoot: {
  y: {
    from: 1000,
    to: 0,
    duration: 500,
    interpolation: 'accelerate',
  },
  alpha: {
    from: 0,
    to: 1,
    duration: 400,
    startDelay: 100,
    interpolation: 'accelerate'
  }
}
```
   */
  animations?: AnimationOptions;
  /**
   * Configure Android's NavigationBar
   */
  navigationBar?: NavigationBarOptions;
  /**
   * Android Hardware Back button configuration
   */
  hardwareBackButton?: HardwareBackButtonOptions;
  /**
   * Preview configuration for Peek and Pop
   * #### (iOS specific)
   */
  preview?: OptionsPreview;
  /**
   * Enable or disable swipe back to pop gesture
   * #### (iOS specific)
   * @default true
   */
  popGesture?: boolean;
  /**
   * Background image for the screen
   * #### (iOS specific)
   */
  backgroundImage?: ImageResource;
  /**
   * Background image for the Navigation View
   * #### (iOS specific)
   */
  rootBackgroundImage?: ImageResource;
  /**
   * Provides a way to configure the overall presentation of your application's main user interface
   * #### (iOS specific)
   */
  window?: WindowOptions;
  /**
   * Enable or disable automatically blurring focused input, dismissing keyboard on unmount
   * #### (Android specific)
   * @default false
   */
  blurOnUnmount?: boolean;
}

interface NavigationProps {
  componentId: string;
  options?: Options;
  extraProps?: any;
}


type Scene = () => JSX.Element;
type TabRoute = {
  key: string;
  title: string;
  scene: Scene;
};



type User = "USER" | "RIDER"
interface UserSelectorProps {
  type: User;
  text: string;
}


type modal_types = "AGREEMENT" | "LOGOUT" | "ACCOUNT_SUCCESS" | "PASSWORD_RESET" | "ORDER_CONFIRMATION";

interface ModalProps {
  type: modal_types;
  heading?: string;
  dismissable?: boolean;
  subtext?: string;
  status?: "custom" | "success" | "failed";
  checks?: { text: string, required: boolean, checked?: boolean; }[],
  actions?: { text: string; action: 'dismiss' | "acceptance" }[];
  componentId?: string;
}