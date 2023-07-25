import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from '../Ui/Sections/Auth/Screens/Login';
import {Routes} from '../Utils/Routes';
import onBoarding from '../Ui/Sections/GetStart/Screens/onBoarding';
import SignUp from '../Ui/Sections/Auth/Screens/SignUp';
import ForgetPassword from '../Ui/Sections/Auth/Screens/ForgetPassword';
import OtpScreen from '../Ui/Sections/Auth/Screens/OtpScreen';
import NewPassword from '../Ui/Sections/Auth/Screens/NewPassword';
import NewPasswordSuccessScreen from '../Ui/Sections/Auth/Screens/NewPasswordSuccessScreen';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.GetStarting.onBoarding}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={Routes.GetStarting.onBoarding}
        component={onBoarding}
      />
      <Stack.Screen name={Routes.Auth.login} component={Login} />
      <Stack.Screen name={Routes.Auth.signUp} component={SignUp} />
      <Stack.Screen
        name={Routes.Auth.forgetPassword}
        component={ForgetPassword}
      />
      <Stack.Screen name={Routes.Auth.otp} component={OtpScreen} />
      <Stack.Screen name={Routes.Auth.newPassword} component={NewPassword} />
      <Stack.Screen
        name={Routes.Auth.newPasswordSuccessScreen}
        component={NewPasswordSuccessScreen}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
