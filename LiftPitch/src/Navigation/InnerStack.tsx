import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Ui/Sections/Home/Screens/homeScreen';
import {Routes} from '../Utils/Routes';
import More from '../Ui/Sections/More/Screens/More';
import ProfileDetail from '../Ui/Sections/More/Screens/ProfileDetail';
import EditProfile from '../Ui/Sections/More/Screens/EditProfile';
const Stack = createNativeStackNavigator();
export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.Home.homeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
};
export const GroceryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
    </Stack.Navigator>
  );
};
export const OrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
    </Stack.Navigator>
  );
};
export const OffersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
    </Stack.Navigator>
  );
};
export const MoreStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.More.more}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.More.more} component={More} />
      <Stack.Screen
        name={Routes.More.ProfileDetail}
        component={ProfileDetail}
      />
      <Stack.Screen name={Routes.More.EditProfile} component={EditProfile} />
    </Stack.Navigator>
  );
};
export default {HomeStack, GroceryStack, OffersStack, OrdersStack, MoreStack};
