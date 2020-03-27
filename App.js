import React from 'react';
import {StatusBar} from 'react-native';
import MyProvider from './context/Provider';
import Navigator from './navigation/Navigator';
import {enableScreens} from 'react-native-screens';

StatusBar.setBarStyle('light-content', true);
enableScreens();

const App: () => React$Node = () => {
  return (
    <MyProvider>
      <Navigator />
    </MyProvider>
  );
};

export default App;
