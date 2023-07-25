import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAlertObj,
  setDrawerIndex,
  setFetchUpdatedUser,
  setLoader,
  setMoveToParams,
  setMoveToScreen,
  setTab,
  toggleDrawer,
} from '../../../../Redux/reducers/AppReducer';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  AppColors,
  AppImages,
  drawerMenuList,
  hv,
  normalized,
  ScreenSize,
} from '../../../../Utils/AppConstants';
import DrawerTopbar from '../Components/DrawerTopbar';
import {AppStyles} from '../../../../Utils/AppStyles';
import SingleDrawerMenu from '../Components/SingleDrawerMenu';
import FooterButton from '../Components/FooterButton';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import {Routes} from '../../../../Utils/Routes';
import CommonDataManager from '../../../../Utils/CommonManager';
import {AppStrings} from '../../../../Utils/Strings';
import ConfirmationModal from '../../../Components/Model/ConfirmationModal';
import {unlinkNfcRequest} from '../../../../Network/Services/GeneralServices';
import SingleSwitchDrawerItem from '../Components/SingleSwitchDrawerItem';
import ToggleTeamComp from '../Components/ToggleTeamComp';

interface Props {
  navigation: any;
}
const {width} = ScreenSize;
const DrawerContent = (props: Props) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const {drawerIndex, isNetConnected, userData, teamId, secretId} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );

  const drawerOffset = useSharedValue(-width);
  useEffect(() => {
    moveDrawer();
  }, []);

  const moveDrawer = (closeBar: boolean = false) => {
    if (closeBar) {
      drawerOffset.value = withTiming(-width, {
        duration: 400,
      });
      setTimeout(() => {
        dispatch(toggleDrawer(false));
      }, 400);
    } else {
      drawerOffset.value = withTiming(0, {
        duration: 400,
      });
    }
  };

  const drawerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: drawerOffset.value,
        },
      ],
    };
  });

  const unlinkBraceletClicked = async () => {
    setShowPopup(false);
    try {
      dispatch(setLoader(true));
      let response = await unlinkNfcRequest(isNetConnected, teamId);
      if (response.success) {
        console.log('Nfc unlinked successfully');
        moveDrawer(true);
        dispatch(setFetchUpdatedUser(new Date().toISOString()));
      } else {
        dispatch(
          setAlertObj({
            title: AppStrings.Network.errorTitle,
            message: response?.message,
          }),
        );
      }
    } catch (e) {
      console.log('Error logging out');
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <View style={styles.main}>
      <TouchableWithoutFeedback onPress={() => moveDrawer(true)}>
        <View style={styles.absolute} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.drawer, drawerStyle]}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={AppColors.dark.darkLevel5}
        />
        <SafeAreaView />
        <DrawerTopbar
          userData={userData}
          onBack={() => moveDrawer(true)}
          onNotificationClick={() => {
            moveDrawer(true);
            props.navigation.push(Routes.Settings.notificationsListingScreen);
          }}
        />
        <View style={styles.menuSection}>
          <View style={{flex: 1}}>
            {drawerMenuList.map((item, index) => {
              return index == 3 &&
                !CommonDataManager.getSharedInstance().userHasActiveNfc(
                  userData,
                  teamId,
                ) ? null : (
                <SingleDrawerMenu
                  key={index}
                  selected={index == drawerIndex}
                  title={item.title}
                  image={item.image}
                  onPress={() => {
                    if (index == 3) {
                      setShowPopup(true);
                      return;
                    }
                    moveDrawer(true);
                    dispatch(setDrawerIndex(index));
                    index == 0
                      ? dispatch(setTab(0))
                      : index == 1
                      ? dispatch(setTab(7))
                      : dispatch(setTab(6));
                  }}
                  containerStyle={{
                    marginTop: index == 0 ? 0 : hv(10),
                  }}
                />
              );
            })}
          </View>
          {CommonDataManager.getSharedInstance().showTeamToggle(userData) && (
            <ToggleTeamComp />
          )}
          {/* <SingleSwitchDrawerItem /> */}
        </View>

        <View style={styles.footerSection}>
          <FooterButton
            title="Help"
            image={AppImages.Drawer.HelpIcon}
            onPress={() => {
              dispatch(toggleDrawer(false));
              dispatch(
                setMoveToParams({
                  fromDrawer: true,
                }),
              );
              dispatch(setMoveToScreen(Routes.Settings.helpFaqScreen));
              dispatch(setTab(6));
            }}
          />
          <FooterButton
            title="Log out"
            image={AppImages.Drawer.LogoutIcon}
            onPress={() =>
              CommonDataManager.getSharedInstance().logoutUserRequest(
                isNetConnected,
              )
            }
            containerStyle={{
              marginTop: hv(25),
            }}
          />
        </View>
      </Animated.View>
      {showPopup && (
        <ConfirmationModal
          content={`NFC tag and associated function will be removed from your account. Are you sure you want to unlink your bracelet?`}
          onClose={() => setShowPopup(false)}
          onConfirm={unlinkBraceletClicked}
        />
      )}
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  main: {
    ...StyleSheet.absoluteFillObject,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    width: width * 0.8,
    backgroundColor: AppColors.dark.darkLevel5,
    height: '100%',
    ...AppStyles.shadowCommon,
    paddingBottom: Platform.OS == 'ios' ? normalized(20) : normalized(10),
  },
  menuSection: {
    flex: 1,
    borderColor: AppColors.dark.darkLevel3,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: hv(10),
    justifyContent: 'center',
    paddingTop: hv(70),
    marginHorizontal: normalized(15),
  },
  footerSection: {
    paddingVertical: hv(10),
    paddingTop: hv(20),
    paddingHorizontal: normalized(20),
  },
});
