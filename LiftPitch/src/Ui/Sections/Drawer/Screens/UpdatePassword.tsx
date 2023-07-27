import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {
  AppColors,
  AppImages,
  normalized,
  ScreenProps,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import {Routes} from '../../../../Utils/Routes';
import AppHeader from '../../../Components/Header/AppHeader';

const UpdatePassword = (props: ScreenProps) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: AppColors.white.white,
        flex: 1,
      }}>
      {/* Header */}
      <AppHeader
        title="Password"
        isBack={true}
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      {/* Main Container Dark navy */}
      <View style={styles.mainContainer}>
        <Pressable
          onPress={() => {
            props.navigation.navigate(Routes.Settings.addNewPassword);
          }}
          style={styles.cardContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.changePassTxt}>Change Password</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </Text>
            </View>
          </View>
          <View style={styles.arrowView}>
            <Image
              style={styles.imageStyle}
              source={AppImages.ChangePassword.rightArrow}
              resizeMode="contain"
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
export default UpdatePassword;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.dark.darkLevel5,
    flex: 1,
    paddingTop: normalized(40),
    width: '100%',
  },
  cardContainer: {
    backgroundColor: AppColors.dark.darkLevel4,
    paddingTop: normalized(20),
    paddingBottom: normalized(23),
    marginHorizontal: normalized(15),
    borderWidth: 1,
    borderColor: AppColors.dark.darkLevel3,
    paddingHorizontal: normalized(20),
    paddingRight: normalized(12),
    borderRadius: normalized(20),
    ...AppStyles.horiCommon,
    justifyContent: 'space-between',
  },
  changePassTxt: {
    ...AppStyles.textMedium,
    color: AppColors.white.white,
    fontSize: normalized(14),
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: normalized(12),
  },
  descriptionText: {
    ...AppStyles.textRegular,
    color: AppColors.dark.darkLevel1,
    flex: 1,
    fontSize: normalized(12),
  },
  arrowView: {
    width: normalized(25),
    height: normalized(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {},
});
