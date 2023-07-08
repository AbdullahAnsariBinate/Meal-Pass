import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { CoreUI, SearchBox, SearchResults } from '../../components';
import { useServices } from '../../services';

interface SearchProps {
    componentId: string
}

const Search = (props: SearchProps) => {
    const { Components } = useServices();

    const childerens = [
        <React.Suspense fallback={<Text>Loading</Text>}>
            <SearchBox />
        </React.Suspense>,
        <React.Suspense fallback={<Text>Loading</Text>}>
            <Components._Features heading={"Recommended"} type="favourites" headerAction={[{ title: "All Restaurants" }]} />
        </React.Suspense>,
        <React.Suspense fallback={<Text>Loading</Text>}>
            <SearchResults type={'features'} />
        </React.Suspense>
    ]

    return (
        <React.Suspense fallback={<Text>Loading</Text>}>
            <CoreUI.FlowContaner isTabScreen index={1} componentId={props.componentId} flex bg-darkWhite style={styles.container}>
                <FlashList
                    data={childerens}
                    renderItem={({ item }) => {
                        return item;
                    }}
                    estimatedItemSize={300}
                />
            </CoreUI.FlowContaner>
        </React.Suspense>
    )
};

export default Search;

const styles = StyleSheet.create({
    container: {},
    contentContainerStyle: {
        paddingBottom: 10
    }
});
