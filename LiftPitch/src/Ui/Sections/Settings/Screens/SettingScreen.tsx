import React, {useEffect, useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
  settingScreenList,
} from '../../../../Utils/AppConstants';
import {
  Image,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import ConfirmationModal from '../../../Components/CustomModal/ConfirmationModal';
import useUserManager from '../../../../Hooks/useUserManager';
import {Routes} from '../../../../Utils/Routes';
import CustomSwitch from '../../../Components/CustomSwitch/CustomSwitch';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../../../Redux/reducers/AppReducer';
import {saveUserData} from '../../../../Utils/AsyncStorage';
const SettingScreen = (props: ScreenProps) => {
  const {logoutClicked} = useUserManager();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const dispatch = useDispatch();
  const [isPushEnable, setIsPushEnable] = useState(
    selector?.userData?.isPushEnable ? selector?.userData?.isPushEnable : false,
  );
  const {deleteUser, setPushState} = useUserManager();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const moveToNext = (index: any) => {
    switch (index) {
      case 1:
        props?.navigation?.navigate(Routes.Setting.updateProfile);
        break;
      case 2:
        props?.navigation?.navigate(Routes.Setting.privacy);
        break;
      case 3:
        console.log('move to Security Screen');
        break;
      case 4:
        props?.navigation?.navigate(Routes.Setting.analytics);
        break;
      case 5:
        console.log('move to Share profile Function');
        break;
      case 6:
        console.log('move to Push notifications Screen');
        break;
      case 7:
        console.log('move to Comments Screen');
        break;
      case 8:
        props?.navigation?.navigate(Routes.Setting.reportProblem);
        break;
      case 9:
        props?.navigation?.navigate(Routes.Setting.terms);
        break;
      case 10:
        logoutClicked();
        break;
      case 11:
        setShowConfirmationModal(true);
        break;

      default:
        break;
    }
  };
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Privacy and settings'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
      />

      <SectionList
        style={{flex: 1, marginHorizontal: AppHorizontalMargin}}
        sections={settingScreenList}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}: any) => {
          return item?.line ? (
            <View
              style={{
                height: normalized(0.6),
                width: '100%',
                backgroundColor: AppColors.grey.placeholderGrey,
                marginVertical: normalized(10),
              }}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                moveToNext(item?.id);
              }}
              style={styles.mainUpperCont}>
              <View style={styles.innerCont}>
                <Image
                  source={item?.icon}
                  style={{
                    ...styles.imageStyle,
                    tintColor: item?.color
                      ? item?.color
                      : AppColors.grey.simpleGrey,
                  }}
                />
                <Text
                  style={{
                    marginStart: normalized(8),
                    fontSize: normalized(14),
                    fontWeight: '500',
                    color: item?.color ? item?.color : AppColors.black.black,
                  }}>
                  {item?.name}
                </Text>
              </View>
              {item?.atPressMoveTo ? (
                <Image source={AppImages.setting.forward} />
              ) : item?.switchBtn ? (
                <CustomSwitch
                  value={isPushEnable}
                  onToggle={val => {
                    setPushState(val, (result: any) => {
                      saveUserData({...selector?.userData, isPushEnable: val});
                      dispatch(
                        setUserData({...selector?.userData, isPushEnable: val}),
                      );
                      setIsPushEnable(val);
                    });
                  }}
                />
              ) : (
                <View />
              )}
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({section: {title}}) => {
          return (
            <View style={{backgroundColor: AppColors.white.white}}>
              <Text style={styles.header}>{title}</Text>
            </View>
          );
        }}
      />
      {showConfirmationModal && (
        <ConfirmationModal
          content={`Are you sure! \n you want to delete your Account`}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={() => {
            setShowConfirmationModal(false);
            deleteUser();
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  singleCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: AppHorizontalMargin,
  },
  simpleTxt: {
    fontSize: normalized(14),
    color: AppColors.red.lightRed,
    fontWeight: '400',
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: normalized(13),
    fontWeight: '400',
    color: AppColors.grey.simpleGrey,
    marginVertical: normalized(8),
  },
  title: {
    fontSize: 24,
  },
  mainUpperCont: {
    flexDirection: 'row',
    paddingVertical: normalized(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalized(8),
  },
  innerCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    height: normalized(16),
    width: normalized(14),
    tintColor: AppColors.grey.simpleGrey,
  },
});
export default SettingScreen;
