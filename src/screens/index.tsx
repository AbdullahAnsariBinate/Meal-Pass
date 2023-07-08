import { generateRNNScreens } from 'rnn-screens';
import { gestureHandlerRootHOC as withGestureHandler } from 'react-native-gesture-handler';
import { Main } from './main';
import { withServices } from '../services';
import { withStores } from '../stores';
import {
  withBottomTab,
  withRightButtons,
  withTitle,
} from '../services/navigation/options';
import { Sample } from './_screen-sample';
import { Playground } from './playground';
import * as scenes from './scenes'
import { theme } from '../utils/constants';

export const screens = generateRNNScreens(
  {
    Splash: {
      component: scenes.Splash,
      options: {
        topBar: {
          visible: false,
          // background: {
          //   color: theme.color.cyan,
          //   component: {
          //     name: "TopBarBG"
          //   }
          // },
        }
      },
    },
    Welcome: {
      component: scenes.Welcome,
      options: {
        topBar: {
          // background: {
          //   color: theme.color.cyan,
          //   component: {
          //     name: "TopBarBG"
          //   }
          // },
          title: {
            text: 'Select User',
            color: "white"
          }
        }
      },
    },
    PreSignin: {
      component: scenes.PreSignin,
      options: {
        topBar: {
          title: {
            text: 'Pre Sign in',
            color: "white"
          }
        }
      },
    },

    Settings: {
      component: scenes.Settings,
      options: {
        topBar: {
          title: {
            text: 'Settings',
            color: "white"
          }
        }
      },
    },

    Wallet: {
      component: scenes.Wallet,
      options: {
        topBar: {
          title: {
            text: 'My Wallet',
            color: "white"
          }
        }
      },
    },


    SignIn: {
      component: scenes.SignIn,
      options: {
        topBar: {
          title: {
            text: 'Sign in',
            color: "white"
          }
        }
      },
    },
    Register: {
      component: scenes.Register,
      options: {
        topBar: {
          title: {
            text: 'Sign up',
            color: "white"
          }
        }
      },
    },

    ForgetPassword: {
      component: scenes.ForgetPassword,
      options: {
        topBar: {
          title: {
            text: 'Forgot Password',
            color: "white"
          }
        }
      },
    },


    ResetPassword: {
      component: scenes.ResetPassword,
      options: {
        topBar: {
          title: {
            text: 'Password Reset',
            color: "white"
          }
        }
      },
    },


    Home: {
      component: scenes.Home,
      // @ts-ignore
      id: "Home",
      options: {
        topBar: {
          title: {
            text: 'Home'
          }
        }
      },
    },

    Cart: {
      component: scenes.Cart,
      // @ts-ignore
      id: "Cart",
      options: {
        topBar: {
          title: {
            text: 'Cart'
          }
        },
        hardwareBackButton: {
          bottomTabsOnPress: "first"
        }
      },
    },

    RewardPoints: {
      component: scenes.RewardPoints,
      options: {
        topBar: {
          title: {
            text: 'Reward Points'
          }
        }
      },
    },

    Search: {
      component: scenes.Search,
      options: {
        topBar: {
          title: {
            text: 'Search Restaurants'
          },
        }
      },
    },


    AboutRestaurant: {
      component: scenes.AboutRestaurant,
      options: {
        topBar: {
          title: {
            text: 'About Restaurant'
          }
        }
      },
    },

    OrderNow: {
      component: scenes.OrderNow,
      options: {
        topBar: {
          title: {
            text: 'Order Now'
          }
        }
      },
    },

    Reservation: {
      component: scenes.Reservation,
      options: {
        topBar: {
          title: {
            text: 'Reservation'
          }
        }
      },
    },

    Reservations: {
      component: scenes.Reservations,
      options: {
        topBar: {
          title: {
            text: 'Reservations'
          }
        }
      },
    },

    ReservationDetails: {
      component: scenes.ReservationDetails,
      options: {
        topBar: {
          title: {
            text: 'Reservation Details'
          }
        }
      },
    },

    Locations: {
      component: scenes.Locations,
      options: {
        topBar: {
          title: {
            text: 'Locations'
          }
        }
      },
    },

    History: {
      component: scenes.History,
      options: {
        topBar: {
          title: {
            text: 'History'
          }
        }
      },
    },

    HistoryDetails: {
      component: scenes.HistoryDetails,
      options: {
        topBar: {
          title: {
            text: 'History Details'
          }
        }
      },
    },


    Requests: {
      component: scenes.Requests,
      options: {
        topBar: {
          title: {
            text: 'Requests'
          }
        }
      },
    },

    DishView: {
      component: scenes.DishView,
      options: {
        topBar: {
          visible: true, //Platform.OS === "ios" ? true : false,
          title: {
            text: 'Chicken Salid'
          }
        }
      },
    },

    ProfilePage: {
      component: scenes.ProfilePage,
      options: {
        topBar: {
          visible: true,//, Platform.OS === "ios" ? true : false,
          title: {
            text: 'Profile'
          },
          background: {}
        }
      },
    },

    CardDetails: {
      component: scenes.CardDetails,
      options: {
        topBar: {
          visible: true,
          title: {
            text: 'Card details'
          },
        }
      },
    },


    Main: {
      component: Main,
      options: {
        topBar: {
          ...withTitle('Main'),
          ...withRightButtons('inc', 'dec'),
        },
        ...withBottomTab('Main', 'home'),
      },
    },
    Playground: {
      component: Playground,
      options: {
        topBar: {
          ...withTitle('Playground'),
        },
        ...withBottomTab('Playground', 'construct'),
      },
    },
    Sample: {
      component: Sample,
      options: {
        topBar: {
          ...withTitle('Sample'),
        },
      },
    },
  },
  [withGestureHandler, withStores, withServices],
);


// withObserver