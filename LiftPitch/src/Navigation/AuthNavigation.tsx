import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from '../Ui/Sections/Auth/Screens/Login';
import {Routes} from '../Utils/Routes';
import SignUp from '../Ui/Sections/Auth/Screens/SignUp';
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
      <Stack.Screen name={Routes.Auth.login} component={Login} />
    </Stack.Navigator>
  );
};
export default AuthStack;
