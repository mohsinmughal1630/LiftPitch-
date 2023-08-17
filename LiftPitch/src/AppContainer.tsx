import {
  createNavigationContainerRef,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AlertModal from './Ui/Components/CustomModal/AlertModal';
import {
  setIsAlertShow,
  setIsLoader,
  setIsShowNoti,
  setUpdateFBToken,
} from './Redux/reducers/AppReducer';
import AppLoader from './Ui/Components/AppLoader';
import MainNavigation from './Navigation/MainNavigation';
import AuthStack from './Navigation/AuthNavigation';
import {AppColors} from '../src/Utils/AppConstants';
import {notifications} from 'react-native-firebase-push-notifications';
import ThreadManager from './ChatModule/ThreadManger';
import {getUserData} from './Utils/AsyncStorage';
import {setUpChat} from './Utils/Helper';
import LocalNotification from './Ui/Components/LocalNotification';
import {Routes} from './Utils/Routes';
export const navigationRef = createNavigationContainerRef();
export const navRef = React.createRef();

function AppContainer() {
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (isFocused && selector?.userData) {
      ThreadManager.instance.setupRedux(selector, dispatch);
      setChat();
      return () => {
        ThreadManager.instance.removeThreadObserver();
      };
    }
  }, [selector?.userData]);

  /// for Push Notification------------->

  useEffect(() => {
    if (selector?.updateToken) {
      setChat();
      dispatch(setUpdateFBToken(false));
    }
  }, [selector?.updateToken]);
  const setChat = async () => {
    const user = await getUserData();
    if (user?.userId) {
      await setUpChat(async (result: any) => {
        await registerDevice();
        setTimeout(async () => {
          ThreadManager.instance.setAppLoaded();
        }, 3000);
      });
    }
  };

  const registerDevice = async () => {
    if (Platform.OS == 'ios') {
      await getPermissionsForNotification();
    } else {
      getToken();
    }
  };
  const setupChatThread = async () => {
    dispatch(setIsLoader(true));
    ThreadManager.instance.setupRedux(selector, dispatch);
    await setUpChat((result: any) => {
      dispatch(setIsLoader(false));
    });
  };
  const getToken = async () => {
    const token = await notifications.getToken();
    if (token) {
      const user = await getUserData();
      console.log('FCM token------->', token);
      await ThreadManager.instance.updateUserToken(
        token,
        user?.userId.toString(),
      );
      onNotificationListener();
      onNotificationOpenedListener();
      getInitialNotification();
    }
  };
  const getPermissionsForNotification = async () => {
    const isPermission = await hasPermission();
    if (isPermission == false) {
      await requestPermission();
    } else {
      getToken();
    }
  };

  const requestPermission = async () => {
    return await notifications.requestPermission();
  };

  const hasPermission = async () => {
    return await notifications.hasPermission();
  };

  const setBadge = async (number: any) => {
    //only works on iOS and some Android Devices
    return await notifications.setBadge(number);
  };

  const getBadge = async () => {
    //only works on iOS and some Android Devices
    return await notifications.getBadge();
  };

  const getInitialNotification = async () => {
    const notification = await notifications
      .getInitialNotification()
      .then(async (remoteMessage: any) => {
        if (remoteMessage) {
          ThreadManager.instance.setPushObj(remoteMessage.notification);
          setTimeout(() => {
            openDetail();
          }, 3000);
        }
      });
    return notification;
  };
  const openDetail = () => {
    let type = ThreadManager?.instance?.pushObj?._data?.type;
    if (Platform.OS == 'android') {
      setBadge(0);
    }
    if (type == 2) {
      navigation?.navigate(Routes.Chat.chatScreen, {
        thread: ThreadManager.instance.pushObj._data,
      });
    }
  };
  const onNotificationOpenedListener = (isAppOpen = false) => {
    //this gets triggered when the application is in the background
    notifications.onNotificationOpened((notification: any) => {
      ThreadManager.instance.setPushObj(notification);
      if (isAppOpen || ThreadManager.instance.isAppLoaded) {
        openDetail();
      } else {
        setTimeout(() => {
          openDetail();
        }, 3000);
      }
    });
  };
  const onNotificationListener = async () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the forground/runnning
    //for android make sure you manifest is setup - else this wont work
    //Android will not have any info set on the notification properties (title, subtitle, etc..), but _data will still contain information

    notifications.onNotification(async (notification: any) => {
      ThreadManager.instance.setPushObj(notification);
      dispatch(setIsShowNoti(true));
      if (
        notification?._body ==
        `${notification?._title} accept your connection request`
      ) {
        setupChatThread();
      }
    });
  };

  ////--------------------------------->

  return (
    <View style={styles.mainContainer}>
      <View style={styles.childContainer}>
        {selector?.isAlertShow?.value ? (
          <AlertModal
            visible={selector?.isAlertShow?.value}
            onPress={() => {
              dispatch(setIsAlertShow({value: false, message: ''}));
            }}
            message={selector?.isAlertShow?.message}
            // indigo
          />
        ) : null}
        {selector?.isLoaderStart ? (
          <AppLoader visisble={selector?.isLoaderStart} />
        ) : null}
        {selector.showNoti ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              // bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              elevation: 5,
            }}>
            <SafeAreaView />
            <LocalNotification
              openView={() => {
                openDetail();
                dispatch(setIsShowNoti(false));
              }}
              closeView={() => {
                dispatch(setIsShowNoti(false));
              }}
            />
          </View>
        ) : null}
        {selector?.userData ? <MainNavigation /> : <AuthStack />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white.white,
  },
  childContainer: {
    flex: 1,
    zIndex: 0,
  },
});
export default AppContainer;
