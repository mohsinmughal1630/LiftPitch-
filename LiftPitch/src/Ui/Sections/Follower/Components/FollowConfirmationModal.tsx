import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  AppColors,
  AppImages,
  hv,
  isSmallDevice,
  normalized,
} from '../../../../Utils/AppConstants';
import CommonDataManager from '../../../../Utils/CommonManager';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import ProfilePlaceHolderComp from '../../../Components/ProfileView/ProfilePlaceHolderComp';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';

const FollowConfirmationModal = (props: any) => {
  return (
    <Modal transparent animationType="slide" onRequestClose={props?.onClose}>
      <View style={styles.outerContainer}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={AppColors.black.black}
        />
        <TouchableWithoutFeedback onPress={props?.onClose}>
          <View style={styles.transparentBg} />
        </TouchableWithoutFeedback>
        <View style={styles.mainContainer}>
          <View style={styles.headerRow}>
            {props?.data?.profile?.length > 0 ? (
              <AppImageViewer
                source={{ uri: props?.data?.profile }}
                placeHolder={AppImages.bottomBar.Profile}
                style={styles.img}
              />
            ) : (
              <ProfilePlaceHolderComp
                index={1}
                name={props?.data?.userName ? props?.data?.userName : 'Testing'}
                mainStyles={styles.img}
                nameStyles={{
                  fontSize: normalized(16),
                  ...AppStyles.textMedium
                }}
              />
            )}
            <Text style={styles.headingText}>
              {props?.type == 'add'
                ? CommonDataManager.getSharedInstance().capitalizeFirstLetter(
                  props?.data?.userName,
                )
                : 'Remove follower?'}
            </Text>
            <Text style={styles.desTxt}>
              {props?.type == 'add'
                ? `Are you sure you want to add ${CommonDataManager.getSharedInstance().capitalizeFirstLetter(
                  props?.data?.userName,
                )} to your following list`
                : `We won't tell ${CommonDataManager.getSharedInstance().capitalizeFirstLetter(
                  props?.data?.userName,
                )} that they were removed from your followers`}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={() => {
                props?.onClose();
              }}
              style={styles.cancelBtn}>
              <Text style={styles.cancelBtnTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props?.atRightBtnPress();
              }}
              style={styles.yesBtn}>
              <Text style={styles.yesBtnTxt}>
                {props?.type == 'add' ? 'Yes' : 'Remove'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FollowConfirmationModal;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  transparentBg: {
    backgroundColor: AppColors.black.shadow,
    ...StyleSheet.absoluteFillObject,
  },
  mainContainer: {
    height: isSmallDevice ? '35%' : '30%',
    backgroundColor: AppColors.white.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: hv(5),
  },
  headerRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: normalized(16),
    ...AppStyles.textRegular,
    color: AppColors.black.black,
  },
  crossView: {
    height: normalized(40),
    width: normalized(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: normalized(5),
    position: 'absolute',
    right: 0,
  },
  crossImg: {
    height: normalized(14),
    width: normalized(14),
  },
  bottomContainer: {
    marginHorizontal: AppHorizontalMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: isSmallDevice ? hv(50) : hv(30),
  },
  singlePicker: {
    borderRadius: 15,
    width: '45%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalized(20),
    borderWidth: 3,
    borderColor: AppColors.grey.midGray,
    borderStyle: 'dashed',
  },
  pickerImg: {
    width: normalized(30),
    height: normalized(30),
  },
  pickerText: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    marginTop: hv(10),
    textAlign: 'center',
  },
  img: {
    marginVertical: normalized(10),
    height: normalized(50),
    width: normalized(50),
    borderRadius: normalized(50 / 2),
  },
  desTxt: {
    width: normalized(250),
    color: AppColors.black.black,
    fontSize: normalized(13),
    marginTop: hv(5),
    textAlign: 'center',
    ...AppStyles.textRegular
  },
  cancelBtn: {
    height: normalized(45),
    borderRadius: normalized(5),
    width: normalized(150),
    backgroundColor: AppColors.grey.simple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnTxt: {
    color: AppColors.black.black,
    fontSize: normalized(14),
    ...AppStyles.textMedium
  },
  yesBtn: {
    height: normalized(45),
    borderRadius: normalized(5),
    width: normalized(150),
    backgroundColor: AppColors.red.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesBtnTxt: {
    color: AppColors.white.white,
    fontSize: normalized(14),
    ...AppStyles.textMedium
  },
});
