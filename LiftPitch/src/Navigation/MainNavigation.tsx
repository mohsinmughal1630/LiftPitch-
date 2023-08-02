import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Routes} from '../Utils/Routes';
import Container from '../Ui/Sections/Container/Container';

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
    </MainStack.Navigator>
  );
}
