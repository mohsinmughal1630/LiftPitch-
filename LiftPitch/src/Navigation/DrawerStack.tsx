import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../Redux/store/AppStore';
import Container from '../Ui/Sections/Container/Container';
import {ScreenProps} from '../Utils/AppConstants';
import {Routes} from '../Utils/Routes';
import DrawerContent from '../Ui/Sections/Drawer/Screens/DrawerContent';
const Stack = createNativeStackNavigator();
const DrawerStack = (props: ScreenProps) => {
  const {drawerValue} = useSelector((state: AppRootStore) => state.AppReducer);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Stack.Navigator
        initialRouteName={Routes.Container.main}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Routes.Container.main} component={Container} />
      </Stack.Navigator>
      {drawerValue && <DrawerContent navigation={props.navigation} />}
    </View>
  );
};

export default DrawerStack;
