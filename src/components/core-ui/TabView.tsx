import React, { useState } from 'react';
import { Dimensions, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SceneMap, TabBar, TabView as Tab } from 'react-native-tab-view';
import { theme } from '../../utils/constants';
import { Scene, TabRoute } from '../../utils/types';

import Text from './Text';

type Props = {
  initialRouteKey?: string;
  isScrollEnabled: boolean;
  routes: Array<TabRoute>;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function TabView(props: Props) {
  let { width: dimensionsWidth } = Dimensions.get('screen');
  const initialLayout = { width: dimensionsWidth };
  const { routes, containerStyle, isScrollEnabled, initialRouteKey } = props;

  let indexInitialRoute = 0;

  let allRoutes = routes;
  if (initialRouteKey) {
    indexInitialRoute = allRoutes.findIndex(
      ({ key }) => key === initialRouteKey,
    );
  }
  let data: { [key: string]: Scene } = {};
  for (let { key, scene } of allRoutes) {
    data[key] = scene;
  }
  const renderScene = SceneMap(data);

  const [index, setIndex] = useState(indexInitialRoute);
  return (
    <Tab
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderLabel={({ route }) => (
            <Text weight="medium" style={styles.labelStyle}>
              {route.title}
            </Text>
          )}
          scrollEnabled={isScrollEnabled}
          tabStyle={[styles.tabStyle, isScrollEnabled ? { width: 'auto' } : {}]}
          indicatorStyle={styles.indicatorStyle}
          inactiveColor={theme.color.lightgray}
          activeColor={theme.color.cyan}
          style={styles.tabBar}
        />
      )}
      navigationState={{ index, routes: allRoutes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={containerStyle}
    />
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    marginHorizontal: 6,
  },
  indicatorStyle: {
    backgroundColor: theme.color.pageColor,
  },
  tabBar: {
    backgroundColor: theme.color.white,
    borderBottomColor: theme.color.lightgray,
    borderBottomWidth: 1,
  },
  labelStyle: {
    fontSize: theme.fontSize.medium,
  },
});