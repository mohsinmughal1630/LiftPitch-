import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Ui/Sections/Home/Screens/HomeScreen';
import {Routes} from '../Utils/Routes';
import ContactScreen from '../Ui/Sections/Contact/Screens/ContactScreen';
import FunctionScreen from '../Ui/Sections/Functions/Screens/FunctionScreen';
import ShopScreen from '../Ui/Sections/Shop/Screens/ShopScreen';
import CardsListingScreen from '../Ui/Sections/Functions/Screens/CardsListingScreen';
import BindBraceletScreen from '../Ui/Sections/Home/Screens/BindBraceletScreen';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  setDrawerIndex,
  setMoveToBindScreen,
  setMoveToParams,
  setMoveToScreen,
} from '../Redux/reducers/AppReducer';
import {AppRootStore} from '../Redux/store/AppStore';
import EmergencyHomeScreen from '../Ui/Sections/EmergencyCards/Screens/EmergencyHomeScreen';
import CreateEmergencyContactScreen from '../Ui/Sections/EmergencyCards/Screens/CreateEmergencyContactScreen';
import CustomUrlsHomeScreen from '../Ui/Sections/CustomUrls/Screens/CustomUrlsHomeScreen';
import AddCustomUrlScreen from '../Ui/Sections/CustomUrls/Screens/AddCustomUrlScreen';
import ScanScreen from '../Ui/Sections/Scan/Screens/ScanScreen';
import DynamicLinks from '../Ui/Sections/DynamicLinks/Screen/DynamicLinks';
import DetailDynamics from '../Ui/Sections/DynamicLinks/Screen/DetailDynamics';
import AddNewLink from '../Ui/Sections/DynamicLinks/Screen/AddNewLink';
import NewEmergContactScreen from '../Ui/Sections/EmergencyCards/Screens/NewEmergContactScreen';
import NewCustomUrlScreen from '../Ui/Sections/CustomUrls/Screens/NewCustomUrlScreen';
import SettingsHomeScreen from '../Ui/Sections/Settings/Screens/SettingsHomeScreen';
import HelpFaqScreen from '../Ui/Sections/Settings/Screens/HelpFaqScreen';
import UpgradeAccount from '../Ui/Sections/Drawer/Screens/UpgradeAccount';
import UpdatePassword from '../Ui/Sections/Drawer/Screens/UpdatePassword';
import ProfileUpdateScreen from '../Ui/Sections/Profile/Screens/ProfileUpdateScreen';
import ProfilePreviewScreen from '../Ui/Sections/Profile/Screens/ProfilePreviewScreen';
import AddNewPassword from '../Ui/Sections/Drawer/Screens/AddNewPassword';
import AboutUs from '../Ui/Sections/Drawer/Screens/AboutUs';
import Tutorials from '../Ui/Sections/Drawer/Screens/Tutorials';
import SettingsForgetPassScreen from '../Ui/Sections/Drawer/Screens/SettingsForgetPassScreen';
import SettingsOtpScreen from '../Ui/Sections/Drawer/Screens/SettingsOtpScreen';
import SettingsNewPassScreen from '../Ui/Sections/Drawer/Screens/SettingsNewPassScreen';
import SettingsPassSuccessScreen from '../Ui/Sections/Drawer/Screens/SettingsPassSuccessScreen';
import IntellectualPropertyScreen from '../Ui/Sections/Settings/Screens/IntellectualPropertyScreen';
import CreateUploadFilesScreen from '../Ui/Sections/UploadFiles/Screens/CreateUploadFilesScreen';
import UploadFilesHomeScreen from '../Ui/Sections/UploadFiles/Screens/UploadFilesHomeScreen';
import NewUploadFilesScreen from '../Ui/Sections/UploadFiles/Screens/NewUploadFilesScreen';
import NewPaymentScreen from '../Ui/Sections/Payment/Screens/NewPaymentScreen';
import PaymentHomeScreen from '../Ui/Sections/Payment/Screens/PaymentHomeScreen';
import CreatePaymentScreen from '../Ui/Sections/Payment/Screens/CreatePaymentScreen';
import TeamNodesListingScreen from '../Ui/Sections/Teams/Screens/TeamNodesListingScreen';
import EnterpriseContactForm from '../Ui/Sections/Drawer/Screens/EnterpriseContactForm';
const Stack = createNativeStackNavigator();
export const HomeStack = () => {
  const dispatch = useDispatch();
  const {moveToBindScreen}: any = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(setDrawerIndex(0));
    }
  }, [isFocused]);
  const initialScreenName = moveToBindScreen
    ? Routes.Home.bindBraceletScreen
    : Routes.Home.homeScreen;
  setTimeout(() => dispatch(setMoveToBindScreen(false)));
  return (
    <Stack.Navigator
      initialRouteName={initialScreenName}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Home.bindBraceletScreen}
        component={BindBraceletScreen}
      />
      <Stack.Screen name={Routes.Home.homeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
};
export const ContactStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Contact.contactScreen}
        component={ContactScreen}
      />
    </Stack.Navigator>
  );
};
export const FunctionStack = () => {
  const dispatch = useDispatch();
  const {moveToScreen, moveToParams, isComingFromTeam} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const initialScreen =
    moveToScreen && (!moveToParams || isComingFromTeam)
      ? moveToScreen
      : Routes.Function.functionScreen;
  if (!moveToParams || isComingFromTeam) {
    setTimeout(() => {
      dispatch(setMoveToScreen(null));
    }, 2000);
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialScreen}>
      <Stack.Screen
        name={Routes.Function.functionScreen}
        component={FunctionScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name={Routes.Function.cardsListingScreen}
        component={CardsListingScreen}
      />
      <Stack.Screen
        name={Routes.Function.emergencyHomeScreen}
        component={EmergencyHomeScreen}
      />
      <Stack.Screen
        name={Routes.Function.createEmergencyContactScreen}
        component={CreateEmergencyContactScreen}
      />
      <Stack.Screen
        name={Routes.Function.newEmergContactScreen}
        component={NewEmergContactScreen}
      />
      <Stack.Screen
        name={Routes.Function.customUrlsHomeScreen}
        component={CustomUrlsHomeScreen}
      />
      <Stack.Screen
        name={Routes.Function.addCustomUrlScreen}
        component={AddCustomUrlScreen}
      />
      <Stack.Screen
        name={Routes.Function.newCustomUrlScreen}
        component={NewCustomUrlScreen}
      />
      <Stack.Screen
        name={Routes.Function.createPaymentScreen}
        component={CreatePaymentScreen}
      />
      <Stack.Screen
        name={Routes.Function.paymentHomeScreen}
        component={PaymentHomeScreen}
      />
      <Stack.Screen
        name={Routes.Function.newPaymentScreen}
        component={NewPaymentScreen}
      />
      <Stack.Screen
        name={Routes.Function.createUploadFilesScreen}
        component={CreateUploadFilesScreen}
      />
      <Stack.Screen
        name={Routes.Function.uploadFilesHomeScreen}
        component={UploadFilesHomeScreen}
      />
      <Stack.Screen
        name={Routes.Function.newUploadFilesScreen}
        component={NewUploadFilesScreen}
      />
      <Stack.Screen
        name={Routes.Teams.teamNodes}
        component={TeamNodesListingScreen}
        initialParams={moveToParams}
      />
    </Stack.Navigator>
  );
};
export const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.Shop.shopScreen} component={ShopScreen} />
    </Stack.Navigator>
  );
};
export const ScanStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.Scan.scanScreen} component={ScanScreen} />
    </Stack.Navigator>
  );
};
export const SettingsStack = () => {
  const dispatch = useDispatch();
  const {moveToScreen, moveToParams} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const initialScreen =
    moveToScreen && !moveToParams
      ? moveToScreen
      : Routes.Settings.settingsHomeScreen;
  if (!moveToParams) {
    setTimeout(() => {
      dispatch(setMoveToScreen(null));
    }, 2000);
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialScreen}>
      <Stack.Screen
        name={Routes.Settings.settingsHomeScreen}
        component={SettingsHomeScreen}
      />
      <Stack.Screen
        name={Routes.Settings.helpFaqScreen}
        component={HelpFaqScreen}
      />
      <Stack.Screen
        name={Routes.Settings.upgradeAccount}
        component={UpgradeAccount}
        initialParams={moveToParams}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={Routes.Settings.changePassword}
        component={UpdatePassword}
      />
      <Stack.Screen
        name={Routes.Settings.addNewPassword}
        component={AddNewPassword}
      />
      <Stack.Screen
        name={Routes.Settings.settingsForgetPassScreen}
        component={SettingsForgetPassScreen}
      />
      <Stack.Screen
        name={Routes.Settings.settingsOtpScreen}
        component={SettingsOtpScreen}
      />
      <Stack.Screen
        name={Routes.Settings.settingsNewPassScreen}
        component={SettingsNewPassScreen}
      />
      <Stack.Screen
        name={Routes.Settings.settingsPassSuccessScreen}
        component={SettingsPassSuccessScreen}
      />
      <Stack.Screen name={Routes.Settings.aboutUs} component={AboutUs} />
      <Stack.Screen name={Routes.Settings.tutorials} component={Tutorials} />
      <Stack.Screen
        name={Routes.Settings.IntellectualPropertyScreen}
        component={IntellectualPropertyScreen}
      />
      <Stack.Screen
        name={Routes.Settings.enterpriseContactForm}
        component={EnterpriseContactForm}
      />
    </Stack.Navigator>
  );
};
export const DynamicLinkStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.DynamicStack.dynamicScreen}
        component={DynamicLinks}
      />
      <Stack.Screen
        name={Routes.DynamicStack.dynamicDetail}
        component={DetailDynamics}
      />
      <Stack.Screen
        name={Routes.DynamicStack.addNewLink}
        component={AddNewLink}
      />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const {userData}: any = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const initialScreen = !userData?.is_profile
    ? Routes.Profile.profileUpdateScreen
    : Routes.Profile.profilePreviewScreen;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialScreen}>
      <Stack.Screen
        name={Routes.Profile.profilePreviewScreen}
        component={ProfilePreviewScreen}
      />
      <Stack.Screen
        name={Routes.Profile.profileUpdateScreen}
        component={ProfileUpdateScreen}
      />
    </Stack.Navigator>
  );
};

export default {
  HomeStack,
  ContactStack,
  FunctionStack,
  ShopStack,
  ScanStack,
  DynamicLinkStack,
  SettingsStack,
  ProfileStack,
};
