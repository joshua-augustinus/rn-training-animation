import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { SideMenu } from './components/SideMenu';
import { ActivityScreen } from './screens/ActivityScreen';
import { MasterScreen } from './screens/MasterScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { getNestedRouteName } from './utils/StringUtil';

const config = {
    contentComponent: SideMenu
}



const createCustomStackNavigator = (prefix: string) => {
    let stackItems = {};
    const nestedRouteName = getNestedRouteName(prefix);
    stackItems[nestedRouteName] = { screen: MasterScreen };
    return createStackNavigator(stackItems);
}

const RootStack = createDrawerNavigator({
    Home: {
        screen: createCustomStackNavigator("Home")
    },
    SecondScreen: {
        screen: createCustomStackNavigator("SecondScreen")
    },
    ThirdScreen: {
        screen: createCustomStackNavigator("ThirdScreen")
    },
    Activity: {
        screen: ActivityScreen
    }
}, config);
const AppContainer = createAppContainer(RootStack);

// Now AppContainer is the main component for React to render
export { AppContainer };