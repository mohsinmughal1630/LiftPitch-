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
import UpgradePackageModal from '../Ui/Components/Model/UpgradePackageModal';
import {navigationRef} from './RootNavigation';
import useSubscriptionManager from '../Hooks/useSubscriptionManager';
import moment from 'moment';

const MainStack = createStackNavigator();
interface AppStackProps {
  initialScreen: string;
}
const AppStack = () => {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.DrawerStack.main}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <MainStack.Screen
        name={Routes.DrawerStack.main}
        component={DrawerStack}
      />
      <MainStack.Screen
        name={Routes.Function.chooseCardScreen}
        component={ChooseCardScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardNameScreen}
        component={CardNameScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardBackgroundScreen}
        component={CardBackgroundScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardThemeColorScreen}
        component={CardThemeColorScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardProfileUploadScreen}
        component={CardProfileUploadScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardContactNumberScreen}
        component={CardContactNumberScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardSocialMediaScreen}
        component={CardSocialMediaScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardPersonalBioScreen}
        component={CardPersonalBioScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardPreviewScreen}
        component={CardPreviewScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardCompanyDetailsScreen}
        component={CardCompanyDetailsScreen}
      />
      <MainStack.Screen
        name={Routes.Function.cardCompanyLogoScreen}
        component={CardCompanyLogoScreen}
      />
      <MainStack.Screen
        name={Routes.Function.editCardScreen}
        component={EditCardScreen}
      />
      <MainStack.Screen
        name={Routes.Settings.faqScreen}
        component={FAQScreen}
      />
      <MainStack.Screen
        name={Routes.Settings.termAndCondition}
        component={TermsNCondition}
      />
      <MainStack.Screen
        name={Routes.Settings.privacyPolicy}
        component={PrivacynPolicy}
      />
      <MainStack.Screen
        name={Routes.Settings.exchangePolicyScreen}
        component={ExchangePolicyScreen}
      />
      <MainStack.Screen
        name={Routes.Settings.aboutatSetting}
        component={SettingAboutUs}
      />
      <MainStack.Screen
        name={Routes.Settings.contactUs}
        component={ContactUs}
      />
      <MainStack.Screen
        name={Routes.Settings.notificationsListingScreen}
        component={NotificationListingScreen}
      />
    </MainStack.Navigator>
  );
};
const AppContainer = () => {
  const selector = useSelector((AppState: AppRootStore) => AppState);
  const {
    safeArea,
    userData,
    fetchUpdatedUser,
    isNetConnected,
    linkingUrl,
    isTagScanning,
    showUpgradeModal,
    teamId,
    packagePlan,
    currentTab,
  } = selector.AppReducer;
  const dispatch = useDispatch();
  const linkingUrlRef = useRef('');

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    getUserDetails();
    onNewUrl();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        dispatch(setFetchUpdatedUser(new Date().toISOString()));
      }

      appState.current = nextAppState;
    });
    return () => {
      if (subscription?.remove) subscription?.remove();
    };
  }, []);

  const getUserDetails = async () => {
    try {
      let userDetails =
        await CommonDataManager.getSharedInstance().getUserData();
      if (userDetails) {
        await CommonDataManager.getSharedInstance().getTeamSecretData();
        dispatch(setUserData(userDetails));
        if (!userDetails?.is_profile) {
          dispatch(setTab(7));
        }
      }
      if (linkingUrlRef.current) {
        if (userDetails) {
          dispatch(setTab(2));
          dispatch(setLinkingUrl(linkingUrlRef.current));
        } else {
          dispatch(setMoveToScreen(Routes.Auth.login));
          dispatch(setLinkingUrl(''));
          linkingUrlRef.current = '';
        }
      }
    } catch (e) {
      console.log('Error getting user ', e);
    } finally {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  };

  const onNewUrl = async () => {
    let flag = false;
    if (Platform.OS == 'android') {
      const link = await Linking.getInitialURL();
      if (link) {
        linkingUrlRef.current = link;
        flag = true;
      }
    }
    Linking.addEventListener('url', async e => {
      console.log('Listener Url (listener) ===> ', e?.url);

      const userAsyncObj =
        await CommonDataManager.getSharedInstance().getUserData();

      // Checking if the url is for team node scanning
      let cardType = CommonDataManager.getSharedInstance()
        .extractCardType(e?.url, 'cardType')
        .toLowerCase();
      let cardId = CommonDataManager.getSharedInstance().extractCardType(
        e?.url,
        'cardId',
      );
      if (
        cardType == TeamNodeUrlTypes.node ||
        cardType == TeamNodeUrlTypes.team
      ) {
        await CommonDataManager.getSharedInstance().getScannedTeamResult(
          isNetConnected,
          cardType,
          cardId,
          userAsyncObj ? true : false,
        );
        return;
      }

      const urlType = CommonDataManager.getSharedInstance().getLinkUrlType(
        e?.url,
      );
      if (e?.url && urlType == ReceivedLinkType.nfc) {
        if (isTagScanning) {
          console.log('Background tag scanning ended.');
          return;
        }
        linkingUrlRef.current = e.url;
        await getUserDetails();
        flag = false;
      } else if (urlType == ReceivedLinkType.newMember) {
        const paramsObj =
          CommonDataManager.getSharedInstance().extractParamsFromUrl(e?.url);
        console.log(
          'New user should be created',
          paramsObj,
          ' - userData - ',
          userAsyncObj?.email,
        );
        if (
          paramsObj?.email?.toLowerCase() == userAsyncObj?.email?.toLowerCase()
        ) {
          console.log('Already Registed ');
          dispatch(setFetchUpdatedUser(new Date().toISOString()));
        } else {
          // new session
          dispatch(setTeamSignupData(paramsObj));
          await CommonDataManager.getSharedInstance().logoutUser();
          dispatch(setMoveToScreen(Routes.Auth.signUp));
        }
      } else if (urlType == ReceivedLinkType.alreadyMember) {
        const paramsObj =
          CommonDataManager.getSharedInstance().extractParamsFromUrl(e?.url);
        console.log(
          'already member - new session -  paramsObj -> ',
          paramsObj?.email,
        );
        if (
          paramsObj?.email?.toLowerCase() !== userAsyncObj?.email?.toLowerCase()
        ) {
          await CommonDataManager.getSharedInstance().logoutUser();
          await registerTeamForExsitingUser(paramsObj);
          dispatch(setTeamSignupData(paramsObj));
          dispatch(setMoveToScreen(Routes.Auth.login));
        } else {
          console.log(
            'already member - existing session -  paramsObj -> ',
            paramsObj,
          );
          await registerTeamForExsitingUser(paramsObj);
          dispatch(setFetchUpdatedUser(new Date().toISOString()));
        }
      } else if (
        CommonDataManager.getSharedInstance().isValidUrl(e?.url) &&
        userAsyncObj
      ) {
        await CommonDataManager.getSharedInstance().handleScannedCardRequest(
          isNetConnected,
          e?.url,
          currentTab,
        );
      }
    });
    if (flag) {
      getUserDetails();
    }
  };

  const registerTeamForExsitingUser = async (apiBody: any) => {
    const res = await signupTeamExistingUserRequest(
      isNetConnected,
      apiBody,
    ).catch(e => console.log('Error registering existing user ', e));
    // console.log('this is the response => ', JSON.stringify(res));
  };

  useLayoutEffect(() => {
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
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
      CommonDataManager.getSharedInstance().getUpdatedUser(
        isNetConnected,
        teamId,
      );
    }
  }, [fetchUpdatedUser, userData]);

  const {checkExpiryForSubscription} = useSubscriptionManager();

  const isExpiryCalling = useRef<any>(false);

  const checkPackageExpiry = async () => {
    if (isExpiryCalling.current == true) {
      console.log('Already calling expiry Func');
      return;
    }
    isExpiryCalling.current = true;
    await checkExpiryForSubscription().finally(
      () => (isExpiryCalling.current = false),
    );
  };

  useEffect(() => {
    if (packagePlan && packagePlan?.transaction_id) {
      checkPackageExpiry();
    }
  }, [packagePlan]);

  // console.log('packagePlan => ', packagePlan);

  return (
    <NavigationContainer
      theme={{colors: {background: AppColors.dark.darkLevel5}}}
      ref={navigationRef}>
      {userData ? <AppStack /> : <AuthStack />}
      {showUpgradeModal && <UpgradePackageModal />}
    </NavigationContainer>
  );
};
export default AppContainer;
