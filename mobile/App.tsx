import React from 'react';
// @ts-ignore
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
// @ts-ignore
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

const App = () => (
  <Provider store={store}>
    <StatusBar style="dark" />
    <AppNavigator />
    <Toast />
  </Provider>
);

export default App;
