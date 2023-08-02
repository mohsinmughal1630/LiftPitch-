import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../Utils/Routes';
import FollowerScreen from '../Ui/Sections/Follower/Screens/FollowerScreen';
import NotificationScreen from '../Ui/Sections/Notification/Screens/NotificationScreen';
import ProfileScreen from '../Ui/Sections/Profile/Screens/ProfileScreen';
import VideoCreateScreen from '../Ui/Sections/CreateVideo/Screens/VideoCreateScreen';
import VideosHomeScreen from '../Ui/Sections/Home/Screens/VideosHomeScreen';
const Stack = createNativeStackNavigator();
export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.HomeTab.homeScreen}
        component={VideosHomeScreen}
      />
    </Stack.Navigator>
  );
};
export const FollowerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.FollowerTab.followerListing}
        component={FollowerScreen}
      />
    </Stack.Navigator>
  );
};
export const AddVideoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.addVideoTab.createVideoScreen}
        component={VideoCreateScreen}
      />
    </Stack.Navigator>
  );
};
export const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.NotificationTab.NotificationScreen}
        component={NotificationScreen}
      />
    </Stack.Navigator>
  );
};
export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.ProfileTab.ProfileScreen}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default {
  HomeStack,
  FollowerStack,
  AddVideoStack,
  NotificationStack,
  ProfileStack,
};
