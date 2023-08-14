import React, {useEffect} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Routes} from '../Utils/Routes';
import Container from '../Ui/Sections/Container/Container';
import ProfileScreen from '../Ui/Sections/Profile/Screens/ProfileScreen';
import ChatScreen from '../Ui/Sections/Chat/Screens/ChatScreen';
const MainStack = createStackNavigator();

interface AppStackProps {
  initialScreen: string;
}

export default function MainNavigation() {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.Container.Container}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <MainStack.Screen
        name={Routes.Container.Container}
        component={Container}
      />
      <MainStack.Screen
        name={Routes.ProfileTab.ProfileScreen}
        component={ProfileScreen}
      />
      <MainStack.Screen name={Routes.Chat.chatScreen} component={ChatScreen} />
    </MainStack.Navigator>
  );
}
