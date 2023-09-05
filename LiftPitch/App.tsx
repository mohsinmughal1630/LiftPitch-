/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {LogBox, StatusBar, View} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store, {AppRootStore} from './src/Redux/store/AppStore';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './src/AppContainer';
import {getUserData} from './src/Utils/AsyncStorage';
import {setNetState, setUserData} from './src/Redux/reducers/AppReducer';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import CommonDataManager from './src/Utils/CommonManager';
const App = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: AppRootStore) => state);
  useEffect(() => {
    onAppStart();
    CommonDataManager.getSharedInstance().setReduxReducer(selector, dispatch);
    GoogleSignin.configure({
      webClientId:
        '959745604605-863co3a05bgf69rbjgo9q2km031g4r9t.apps.googleusercontent.com',
    });
    fetchUser();
    // requestPermission();
  }, []);

  LogBox.ignoreLogs(['ViewPropTypes will be removed']);

  const fetchUser = async () => {
    let userDataa = await getUserData();
    if (userDataa) {
      dispatch(setUserData(userDataa));
      await fetchUserAPI();
    }
  };
  const fetchUserAPI = async () => {
    // console.log('come to fetch User Data API======>');
    //fetch user API integrate here.....
  };

  const onAppStart = async () => {
    await checkInternet();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  };

  const checkInternet = async () => {
    await NetInfo.addEventListener((state: any) => {
      dispatch(setNetState(state.isConnected));
    });
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </View>
  );
};

export default App;
