import { getNestedRouteName } from '@src/utils/StringUtil';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { StackActions, NavigationActions } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';



const SideMenu = (props) => {
    const onItemPress = ({ route, focused }) => {
        if (route.key !== "Activity") {
            const routeName = getNestedRouteName(route.key);
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: routeName })]
            })
            props.navigation.navigate(route);
            props.navigation.dispatch(resetAction);
        } else {
            props.navigation.navigate(route);

        }
    }

    return (

        <ScrollView>
            <SafeAreaView
                style={styles.container}
                forceInset={{ top: 'always', horizontal: 'never' }}
            >
                <DrawerItems {...props} onItemPress={onItemPress} />
            </SafeAreaView>
        </ScrollView>
    )

};

export { SideMenu }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});