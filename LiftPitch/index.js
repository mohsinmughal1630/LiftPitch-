/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/Redux/store/AppStore';

import { MenuProvider } from "react-native-popup-menu";
const AppRedux = () => (
  <Provider store={configureStore}>
    <MenuProvider>
    <App />
    </MenuProvider>

  </Provider>
);
AppRegistry.registerComponent(appName, () => AppRedux);
