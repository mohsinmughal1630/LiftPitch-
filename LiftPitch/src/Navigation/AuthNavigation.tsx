import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Routes} from '../Utils/Routes';
import LoginScreen from '../Ui/Sections/Auth/Screens/Login';
import SignUp from '../Ui/Sections/Auth/Screens/SignUp';
import ProfileScreen from '../Ui/Sections/Profile/Screens/ProfileScreen';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Auth.login}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen name={Routes.Auth.login} component={LoginScreen} />
      <Stack.Screen name={Routes.Auth.signUp} component={SignUp} />
    </Stack.Navigator>
  );
};
export default AuthStack;
