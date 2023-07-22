import React, {useEffect, useLayoutEffect} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../Redux/store/AppStore';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from '../Utils/Routes';
import Container from '../Ui/Sections/Container/Container';
import AuthStack from './AuthNavigation';
import SafeArea from 'react-native-safe-area';
import SplashScreen from 'react-native-splash-screen';
import {setSafeArea} from '../Redux/actions/AppLogics';
import Form from '../Ui/Sections/More/Screens/Form';
const MainStack = createStackNavigator();
interface AppStackProps {
  initialScreen: string;
}
const AppStack = () => {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.Address.SelectAddress}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <MainStack.Screen name={Routes.Container.main} component={Container} />
    </MainStack.Navigator>
  );
};
const AppContainer = () => {
  const selector = useSelector((AppState: AppRootStore) => AppState);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  useLayoutEffect(() => {
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      console.log('finded value is ', result);
      if (selector.AppReducer.safeArea.top != result.safeAreaInsets.top) {
        dispatch(
          setSafeArea({
            top: result.safeAreaInsets.top,
            bottom: result.safeAreaInsets.bottom,
          }),
        );
      }
    });
  }, [selector.AppReducer]);
  return (
    <NavigationContainer>
      {selector.AppReducer.user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default AppContainer;
