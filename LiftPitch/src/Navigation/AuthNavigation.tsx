import React, {useEffect, useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from '../Ui/Sections/Auth/Screens/Login';
import {Routes} from '../Utils/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from '../Ui/Sections/Auth/Screens/SignUp';
import OtpScreen from '../Ui/Sections/Auth/Screens/OtpScreen';
import ForgetPass from '../Ui/Sections/Auth/Screens/ForgetPass';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Auth.Login}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen name={Routes.Auth.Login} component={Login} />
      <Stack.Screen name={Routes.Auth.SignUp} component={SignUp} />
      <Stack.Screen name={Routes.Auth.Otp} component={OtpScreen} />
      <Stack.Screen name={Routes.Auth.ForgetPass} component={ForgetPass} />
    </Stack.Navigator>
  );
};
export default AuthStack;
