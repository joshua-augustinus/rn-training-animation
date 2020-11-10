import { PulsingView } from '@src/components/PulsingView';
import React, { useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const MasterScreen = (props: Props) => {

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            console.log("Back called");
            return true;
        });
    }, []);

    const onMenuPress = () => {
        console.log(props.navigation.state);// { key: 'Home', routeName: 'Home' }
        console.log("Menu pressed");
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    const onButtonPress = () => {
        const pushAction = StackActions.push({
            routeName: 'Stack1',
            params: {
                myUserId: 9,
            },
        });

        props.navigation.dispatch(pushAction);
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={() => onMenuPress()}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.border}>


                    <PulsingView startValue={1} scaleY={1.4} scaleX={1.1} duration={800}>
                        <View style={styles.pulseBackground} />
                    </PulsingView>
                    <View style={styles.wrapper}>
                        <Text>Blah</Text>
                    </View>
                </View>



            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    pulseBackground: {
        backgroundColor: 'blue',
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        height: 50,
        width: 200
    }
})