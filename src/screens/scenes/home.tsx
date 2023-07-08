import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { CoreUI, HomeCards } from '../../components';
import { MenuButton } from '../../components/buttons';
import { useServices } from '../../services';
import { useStores } from '../../stores';

interface HomeProps {
  componentId: string
}

const Home = (props: HomeProps) => {
  const { user } = useStores();
  const { Components } = useServices();

  const childerens = user.type === "USER" ? [
    <React.Suspense fallback={<Text>Loading</Text>}>
      <Components._Explore />
    </React.Suspense>,
    <React.Suspense fallback={<Text>Loading</Text>}>
      <Components._Features heading={"Features"} type="features" />
    </React.Suspense>,
    <React.Suspense fallback={<Text>Loading</Text>}>
      <Components._Features heading={"Favorites"} type="favourites" headerAction={[{ title: "All Restaurants" }]} />
    </React.Suspense>,
    <React.Suspense fallback={<Text>Loading</Text>}>
      <Components._Recommended mode='recommended' />
    </React.Suspense>
  ] : [
    <React.Suspense fallback={<Text>Loading</Text>}>
      <HomeCards type={'orders'} />
    </React.Suspense>,
    <React.Suspense fallback={<Text>Loading</Text>}>
      <HomeCards type={'history'} />
    </React.Suspense>
  ]




  return (
    <React.Suspense fallback={<Text>Loading</Text>}>
      <CoreUI.FlowContaner bottomTabShouldHide={user.type === "RIDER"} isTabScreen={user.type === "USER"} index={0} leftButtons={[{ name: "HopMenu", component: () => MenuButton }]} disableScroll componentId={props.componentId} flex bg-darkWhite style={styles.container}>
        <FlashList
          contentContainerStyle={styles.contentContainerStyle}
          data={childerens}
          renderItem={({ item }) => {
            return item;
          }}
          estimatedItemSize={300}
        />
      </CoreUI.FlowContaner>
    </React.Suspense >
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
  contentContainerStyle: {
    paddingBottom: 10
  }
});
