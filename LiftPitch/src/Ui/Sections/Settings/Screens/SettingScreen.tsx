import React, {useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import ConfirmationModal from '../../../Components/CustomModal/ConfirmationModal';
import {useDispatch, useSelector} from 'react-redux';
import useUserManager from '../../../../Hooks/useUserManager';
const SettingScreen = (props: ScreenProps) => {
  const {deleteUser} = useUserManager();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Privacy and settings'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={styles.singleCell}
        onPress={() => {
          setShowConfirmationModal(true);
        }}>
        <Text style={styles.simpleTxt}>Delete Account</Text>
        <Image source={AppImages.Common.LeftArrowIcon} />
      </TouchableOpacity>
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
});
export default SettingScreen;
