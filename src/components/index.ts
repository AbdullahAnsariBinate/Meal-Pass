import React, { lazy } from 'react'
import TabBarBG from './topbar/Background'
import Title from './topbar/Title'
import UserSelector from './welcome/UserSelector'

const Container = lazy(() => import('./core-ui/Container'))
const Text = lazy(() => import('./core-ui/Text'))
const Button = lazy(() => import('./core-ui/Button'))
const Icon = lazy(() => import('./core-ui/Icon'))
const LogoComponent = lazy(() => import('./core-ui/Logo'))
const Form = lazy(() => import('./core-ui/Form'))
const Field = lazy(() => import('./core-ui/Field'))


const VectorIcon = lazy(() => import('./utils/Vector'))



const Explore = lazy(() => import('./collections/explore'))

const Features = lazy(() => import('./collections/features'))


const RestaurantCard = lazy(() => import('./restaurant/Card'))



const PlateComponent = lazy(() => import('./welcome/Plate'))

const Recommended = lazy(() => import('./collections/recommended'))

const ReviewCard = lazy(() => import('./restaurant/ReviewCard'))

const DishCircle = lazy(() => import('./restaurant/DishCircle'))

const SearchBox = lazy(() => import('./search/SearchBox'))
const SearchResults = lazy(() => import('./search/Results'))

const RewardPointsBox = lazy(() => import('./cart/rewardPoints'))

// const CartDelivery = lazy(() => import('./cart/delivery'))
// const CartAddons = lazy(() => import('./cart//addons'))


// import CartDelivery from './cart/delivery'
// import CartAddons from './cart/addons'

const CartDelivery = lazy(() => import('./cart/delivery'))
const CartAddons = lazy(() => import('./cart/addons'))



const CartTotals = lazy(() => import('./cart/totals'))

const FlowContaner = lazy(() => import('./core-ui/FlowContaner'))

const CollapsableHeaderTabView = lazy(() => import('./core-ui/CollapsableHeaderTabView'))
const RestaurantHeader = lazy(() => import('./restaurant/RestaurantHeader'))

const TopBarButton = lazy(() => import('./buttons/topBarButton'))

const UserInformation = lazy(() => import('./drawer/userInformation'))

const ReservationCard = lazy(() => import('./reservations/reservatonCard'))

const ReservationItemCard = lazy(() => import('./reservations/ReservationItemCard'))
const ReservationTotals = lazy(() => import('./reservations/reservationTotals'))

const LocationCard = lazy(() => import('./locations/Card'))


const HistoryItemCard = lazy(() => import('./history/HistoryItemCard'))

const SplitRequests = lazy(() => import('./requests/SplitRequests'))

const UserRequests = lazy(() => import('./requests/UserRequests'))

const PaymentCard = lazy(() => import('./payment/Card'))
const Verification = lazy(() => import('./verification/index'))

const HomeCards = lazy(() => import('./rider/HomeCards'))
// const Modal = lazy(() => import('./modal'))

const WalletCard = lazy(() => import('./wallet/WalletCard'))




import CustomHeader from './header/customHeader'

export const CoreUI = {
    Container,
    Text,
    LogoComponent,
    Button,
    Icon,
    Form,
    Field,
    RewardPointsBox,
    FlowContaner,
    CollapsableHeaderTabView,
    TopBarButton,
    Verification,
    Modal
}

import DrawerComponent from './drawer'
import Modal from './modal'

export { TabBarBG, Title, UserSelector, PlateComponent, Explore, Features, RestaurantCard, VectorIcon, Recommended, ReviewCard, DishCircle, SearchBox, SearchResults, RewardPointsBox, CartDelivery, CartAddons, CartTotals, RestaurantHeader, DrawerComponent, UserInformation, CustomHeader, ReservationCard, ReservationItemCard, ReservationTotals, LocationCard, HistoryItemCard, SplitRequests, UserRequests, PaymentCard, HomeCards, WalletCard, Modal }