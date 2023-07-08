import { Alert } from "react-native";
import { Options } from "react-native-navigation";
import { screens } from "../../screens";
import { action_keys, IService, ModalProps, modal_types, NavigationProps, PVoid } from "../../utils/types";

const MODALOVERLAY = { component: { name: "Modal", options: { layout: { backgroundColor: "rgba(0,0,0,.5)", componentBackgroundColor: "rgba(0,0,0,.5)" } } } };
export class EventsService implements IService {
    private inited = false;
    private onTabIndexChangedDelegrated: { onIndexChanged: any }[] = [];

    init = async (): PVoid => {
        if (!this.inited) {
            // your code ...

            this.inited = true;
        }
    };

    setTabIndexChangedDelegate = (delegate: { onIndexChanged: any }) => {
        this.onTabIndexChangedDelegrated.push(delegate)
    }

    triggerBottomTabChanged = (index: number) => {
        this.onTabIndexChangedDelegrated.map((delegate) => {
            if (delegate.onIndexChanged) delegate.onIndexChanged(index);
        })
    }

    private eventComponentId: string = "";
    private eventRouteName: any = "";
    private eventArgs: Object | undefined;
    private eventOptions: Options | undefined;
    private delegate: any;



    setEventForLaterNavigation = (eventComponentId: string, eventRouteName: string, eventArgs: any, eventOptions: Options | undefined) => {
        this.eventComponentId = eventComponentId;
        this.eventRouteName = eventRouteName;
        this.eventArgs = eventArgs;
        this.eventOptions = eventOptions;
    }

    onModalAccepted = (args: Object | undefined) => {
        if (this.eventComponentId) {
            const _args: {} = args ? args : {};
            const _oldargs: {} = this.eventArgs ? this.eventArgs : {};

            screens.push(this.eventComponentId, this.eventRouteName, { ..._args, ..._oldargs }, this.eventOptions);
            this.eventComponentId = "";
            this.eventRouteName = undefined;
            this.eventArgs = undefined;
            this.eventOptions = undefined;
        } else if (this.delegate) {
            const _oldargs: {} = this.eventArgs ? this.eventArgs : {};
            this.delegate(_oldargs);
            this.delegate = undefined;
            this.eventArgs = undefined;
        }
    }


    showOverlay = (props: ModalProps) => {
        screens.N.showOverlay({ component: { name: "Modal", passProps: props, options: { layout: { backgroundColor: "rgba(0,0,0,.5)", componentBackgroundColor: "rgba(0,0,0,.5)" } } } });
    }

    onEventPressed = async (event: action_keys | undefined, navigationProps: NavigationProps, delegate?: any | undefined, args?: (({ connectedModal?: boolean, modalArgs?: ModalProps } & any) & undefined)) => {
        console.log("action hit", event, navigationProps);

        if (event === undefined) {
            throw new Error('Function not implemented. ' + event);
        }

        if (delegate) {
            if (args.connectedModal) {
                this.delegate = delegate;
                this.eventArgs = args;
                this.showOverlay(args.modalArgs);
            } else {
                delegate(args);
            }
        } else {
            console.log(JSON.stringify(navigationProps.options));
            switch (event) {
                case "no_account_navigate":
                    screens.push(navigationProps.componentId, "Register", args, navigationProps.options);
                    break;
                case "apple_continue":
                    this.showOverlay({
                        type: "AGREEMENT",
                        dismissable: false,
                        heading: "AGREEMENT",
                        subtext: "I have read and agreed with",
                        checks: [
                            {
                                text: "Terms & Conditions",
                                required: true,
                            },
                            {
                                text: "Privacy Policy",
                                required: true,
                            }
                        ],
                        actions: [
                            {
                                text: "Reject",
                                action: 'dismiss',
                            },
                            {
                                text: "Accept",
                                action: 'acceptance',
                            }
                        ]
                    });
                    this.setEventForLaterNavigation(navigationProps.componentId, "SignIn", args, navigationProps.options);
                    break;
                case "email_continue":
                    this.showOverlay({
                        type: "AGREEMENT",
                        dismissable: false,
                        heading: "AGREEMENT",
                        subtext: "I have read and agreed with",
                        checks: [
                            {
                                text: "Terms & Conditions",
                                required: true,
                            },
                            {
                                text: "Privacy Policy",
                                required: true,
                            }
                        ],
                        actions: [
                            {
                                text: "Reject",
                                action: 'dismiss',
                            },
                            {
                                text: "Accept",
                                action: 'acceptance',
                            }
                        ]
                    });
                    this.setEventForLaterNavigation(navigationProps.componentId, "SignIn", args, navigationProps.options);
                    break;
                case "facebook_continue":
                    this.showOverlay({
                        type: "AGREEMENT",
                        dismissable: false,
                        heading: "AGREEMENT",
                        subtext: "I have read and agreed with",
                        checks: [
                            {
                                text: "Terms & Conditions",
                                required: true,
                            },
                            {
                                text: "Privacy Policy",
                                required: true,
                            }
                        ],
                        actions: [
                            {
                                text: "Reject",
                                action: 'dismiss',
                            },
                            {
                                text: "Accept",
                                action: 'acceptance',
                            }
                        ]
                    });
                    this.setEventForLaterNavigation(navigationProps.componentId, "SignIn", args, navigationProps.options);
                    break;
                case "google_continue":
                    this.showOverlay({
                        type: "AGREEMENT",
                        dismissable: false,
                        heading: "AGREEMENT",
                        subtext: "I have read and agreed with",
                        checks: [
                            {
                                text: "Terms & Conditions",
                                required: true,
                            },
                            {
                                text: "Privacy Policy",
                                required: true,
                            }
                        ],
                        actions: [
                            {
                                text: "Reject",
                                action: 'dismiss',
                            },
                            {
                                text: "Accept",
                                action: 'acceptance',
                            }
                        ]
                    });
                    this.setEventForLaterNavigation(navigationProps.componentId, "SignIn", args, navigationProps.options);
                    break;
                case "forget_password_navigate":
                    screens.push(navigationProps.componentId, "ForgetPassword", args, navigationProps.options);
                    break;
                case "on_reset_code_approved":
                    screens.push(navigationProps.componentId, "ResetPassword", args, navigationProps.options);
                    break;
                case "user_clicked":
                    screens.push(navigationProps.componentId, "SignIn", args, navigationProps.options);
                    break;
                case "restaurant_page_navigate":
                    screens.push(navigationProps.componentId, "AboutRestaurant", args, navigationProps.options);
                    break;
                case "restaurant_dish_navigate":
                    screens.push(navigationProps.componentId, "DishView", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break
                case "to_profile_page":
                    screens.push(navigationProps.componentId, "ProfilePage", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                case "to_preservations":
                    screens.push(navigationProps.componentId, "Reservations", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                case "to_reservation_details":
                    screens.push(navigationProps.componentId, "ReservationDetails", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                case 'to_locations':
                    screens.push(navigationProps.componentId, "Locations", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                case 'to_history':
                    screens.push(navigationProps.componentId, "History", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                case "to_history_details":
                    screens.push(navigationProps.componentId, "HistoryDetails", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                case "to_requests":
                    screens.push(navigationProps.componentId, "Requests", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                case "to_card_details":
                    screens.push(navigationProps.componentId, "CardDetails", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                case "to_settings":
                    screens.push(navigationProps.componentId, "Settings", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                case "to_wallet":
                    screens.push(navigationProps.componentId, "Wallet", args, navigationProps.options).catch(error => Alert.alert('error', JSON.stringify(error)));
                    break;
                default:
                    throw new Error('Function not implemented. ' + event);
                    break;
            }
        }
    }
}
