import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../Redux/store/AppStore';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from '../Utils/Routes';
import AuthStack from './AuthNavigation';
import SafeArea from 'react-native-safe-area';
import SplashScreen from 'react-native-splash-screen';
import {
  setFetchUpdatedUser,
  setIsNotchDevice,
  setLinkingUrl,
  setMoveToScreen,
  setSafeArea,
  setTab,
  setTeamSignupData,
  setUserData,
} from '../Redux/reducers/AppReducer';
import DrawerStack from './DrawerStack';
import ChooseCardScreen from '../Ui/Sections/AddCard/Screens/ChooseCardScreen';
import CardNameScreen from '../Ui/Sections/AddCard/Screens/CardNameScreen';
import CardBackgroundScreen from '../Ui/Sections/AddCard/Screens/CardBackgroundScreen';
import CardThemeColorScreen from '../Ui/Sections/AddCard/Screens/CardThemeColorScreen';
import CardProfileUploadScreen from '../Ui/Sections/AddCard/Screens/CardProfileUploadScreen';
import CardContactNumberScreen from '../Ui/Sections/AddCard/Screens/CardContactNumberScreen';
import CardSocialMediaScreen from '../Ui/Sections/AddCard/Screens/CardSocialMediaScreen';
import CardPersonalBioScreen from '../Ui/Sections/AddCard/Screens/CardPersonalBioScreen';
import CardPreviewScreen from '../Ui/Sections/AddCard/Screens/CardPreviewScreen';
import CardCompanyDetailsScreen from '../Ui/Sections/AddCard/Screens/CardCompanyDetailsScreen';
import CardCompanyLogoScreen from '../Ui/Sections/AddCard/Screens/CardCompanyLogoScreen';
import EditCardScreen from '../Ui/Sections/AddCard/Screens/EditCardScreen';
import CommonDataManager from '../Utils/CommonManager';
import {AppColors} from '../Utils/AppConstants';
import FAQScreen from '../Ui/Sections/Settings/Screens/FAQScreen';
import TermsNCondition from '../Ui/Sections/Settings/Screens/TermsNCondition';
import PrivacynPolicy from '../Ui/Sections/Settings/Screens/PrivacynPolicy';
import SettingAboutUs from '../Ui/Sections/Settings/Screens/SettingAboutUs';
import ContactUs from '../Ui/Sections/Drawer/Screens/ContactUs';
import NotificationListingScreen from '../Ui/Sections/Settings/Screens/NotificationListingScreen';
import ExchangePolicyScreen from '../Ui/Sections/Settings/Screens/ExchangePolicyScreen';
import {Linking, Platform, AppState} from 'react-native';
import {ReceivedLinkType, TeamNodeUrlTypes} from '../Utils/Strings';
import {signupTeamExistingUserRequest} from '../Network/Services/UserServices';

const MainStack = createStackNavigator();
interface AppStackProps {
  initialScreen: string;
}
const AppStack = () => {
  return (
    <MainStack.Navigator
      initialRouteName=""
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}></MainStack.Navigator>
  );
};
const AppContainer = () => {
  const selector = useSelector((AppState: AppRootStore) => AppState);
  const {safeArea, userData, fetchUpdatedUser, isNetConnected} =
    selector.AppReducer;
  const dispatch = useDispatch();
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {};

  useLayoutEffect(() => {
    SafeArea.getSafeAreaInsetsForRootView().then((result: any) => {
      if (safeArea.top != result.safeAreaInsets.top) {
        dispatch(
          setSafeArea({
            top: result.safeAreaInsets.top,
            bottom: result.safeAreaInsets.bottom,
          }),
        );
        if (result.safeAreaInsets.top > 30) {
          dispatch(setIsNotchDevice(true));
        }
      }
    });
  }, [selector.AppReducer]);

  useEffect(() => {
    if (userData && fetchUpdatedUser) {
      CommonDataManager.getSharedInstance().getUpdatedUser(isNetConnected);
    }
  }, [fetchUpdatedUser, userData]);

  return (
    <NavigationContainer
      theme={{colors: {background: AppColors.dark.darkLevel5}}}>
      {userData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default AppContainer;
