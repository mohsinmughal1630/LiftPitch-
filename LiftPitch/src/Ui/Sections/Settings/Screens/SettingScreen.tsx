import React, {useState} from 'react';
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
const SettingScreen = (props: ScreenProps) => {
  const {logoutClicked} = useUserManager();
  const {deleteUser} = useUserManager();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const moveToNext = (index: any) => {
    switch (index) {
      case 1:
        console.log('move to profile manage Screen');
        break;
      case 2:
        console.log('move to Privacy Screen');
        break;
      case 3:
        console.log('move to Security Screen');
        break;
      case 4:
        console.log('move to Analytics Screen');
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
        console.log('move to Report Screen');
        break;
      case 9:
        console.log('move to Terms & Conditions Screen');
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
      {/* <TouchableOpacity
        activeOpacity={1}
        style={styles.singleCell}
        onPress={() => {
          setShowConfirmationModal(true);
        }}>
        <Text style={styles.simpleTxt}>Delete Account</Text>
        <Image source={AppImages.Common.LeftArrowIcon} />
      </TouchableOpacity> */}
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
              style={{
                flexDirection: 'row',
                padding: normalized(10),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={item?.icon}
                  style={{
                    resizeMode: 'contain',
                    height: normalized(16),
                    width: normalized(14),
                    tintColor: AppColors.grey.simpleGrey,
                  }}
                />
                <Text
                  style={{
                    marginStart: normalized(8),
                    fontSize: normalized(13),
                    fontWeight: '400',
                    color: item?.color ? item?.color : AppColors.black.black,
                  }}>
                  {item?.name}
                </Text>
              </View>
              {item?.atPressMoveTo ? (
                <Image source={AppImages.setting.forward} />
              ) : (
                <View />
              )}
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({section: {title}}) => {
          return (
            <View>
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
});
export default SettingScreen;
