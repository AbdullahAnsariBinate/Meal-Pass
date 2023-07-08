import { InteractionManager } from 'react-native';
import { Root, Screen, BottomTabs } from 'rnn-screens';
import { DrawerComponent, Modal, Title } from './src/components';
import BottomTab from './src/components/bottomtab';
import TopBarBG from './src/components/topbar/Background';
import EmptyBackground from './src/components/topbar/EmptyBackground';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { screens } from './src/screens';
import { initServices } from './src/services';
import { hydrateStores } from './src/stores';
import { configureDesignSystem } from './src/utils/designSystem';
import { PVoid } from './src/utils/types';


export const beforeStart = async (): PVoid => {
  // 1. hydrate stores
  await hydrateStores();

  // 2. configure design system
  await configureDesignSystem();

  // 3. init services
  await initServices();

  screens.N.registerComponent('TopBarBG', () => TopBarBG)
  screens.N.registerComponent('EmptyBackground', () => EmptyBackground)

  screens.N.registerComponent('Title', () => Title)
  screens.N.registerComponent('BottomTabs', () => BottomTab)
  screens.N.registerComponent('Modal', () => Modal)

  screens.N.registerComponent("Drawer", () => RNNDrawer.create(DrawerComponent));


};

export const TabsActivity = () => {
  InteractionManager.runAfterInteractions(() => {
    screens.N.showOverlay({
      component: {
        name: "BottomTabs",
        options: {
          layout: {
            componentBackgroundColor: "transparent"
          },
          overlay: {
            interceptTouchOutside: false,
            handleKeyboardEvents: true
          },
        }
      }
    })
  });

  return Root(
    BottomTabs([
      Screen(screens.get("Home")),
      Screen(screens.get('Search')),
      Screen(screens.get('Cart')),
      Screen(screens.get('RewardPoints')),
      // Screen(screens.get("Home")),
      // Screen(screens.get('Search')),
      // Screen(screens.get('Cart')),
      // Screen(screens.get('RewardPoints')),
    ]),
  );

}


export const RiderActivity = () => {
  screens.N.dismissAllOverlays();
  // once whole alpha finalized please change it to splash route
  return Root(
    Screen(screens.get("Home"))
  );
}





export const App = () => {

  // once whole alpha finalized please change it to splash route
  return Root(
    Screen(screens.get("Splash"))
  );
}

