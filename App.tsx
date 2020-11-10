/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';


import { AppContainer } from '@src/AppContainer';
import { NavigationActions, withNavigation } from 'react-navigation';

interface HeaderProps {
  onPress: () => void
}

const Header = (props: HeaderProps) => {
  return <Button title="Test" onPress={props.onPress} />
}

const App = () => {
  const appContainerRef = useRef(null);

  const onHeaderPress = () => {
    appContainerRef.current.navigator.dispatch(
      NavigationActions.navigate({ routeName: "Home" })
    );
  }

  return (
    <Fragment>
      <Header onPress={onHeaderPress} />
      <AppContainer ref={appContainerRef} />
    </Fragment>
  );
}

export default App;
