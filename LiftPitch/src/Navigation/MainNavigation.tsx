import React, { useEffect } from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { Routes } from '../Utils/Routes';
import Container from '../Ui/Sections/Container/Container';
import ProfileScreen from '../Ui/Sections/Profile/Screens/ProfileScreen';
import ChatScreen from '../Ui/Sections/Chat/Screens/ChatScreen';
import NotificationScreen from '../Ui/Sections/Notification/Screens/NotificationScreen';
import PitchIdeasListScreen from '../Ui/Sections/CreateVideo/Screens/PitchIdeasListScreen';
import PitchIdeaStepScreen from '../Ui/Sections/CreateVideo/Screens/PitchIdeaStepScreen';
import VideoCreateScreen from '../Ui/Sections/CreateVideo/Screens/VideoCreateScreen';
const MainStack = createStackNavigator();

interface AppStackProps {
  initialScreen: string;
}

export default function MainNavigation() {
  return (
    <MainStack.Navigator
      // initialRouteName={Routes.Container.Container}
      initialRouteName={Routes.addVideoTab.createVideoScreen}
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
      <MainStack.Screen
        name={Routes.Chat.messageListing}
        component={NotificationScreen}
      />
      <MainStack.Screen name={Routes.Chat.chatScreen} component={ChatScreen} />
      <MainStack.Screen
        name={Routes.addVideoTab.createVideoScreen}
        component={VideoCreateScreen}
      />
      <MainStack.Screen
        name={Routes.addVideoTab.pitchListScreen}
        component={PitchIdeasListScreen}
      />
      <MainStack.Screen
        name={Routes.addVideoTab.pitchIdeaScreen}
        component={PitchIdeaStepScreen}
      />
    </MainStack.Navigator>
  );
}
