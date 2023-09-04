import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppColors, normalized } from '../../../Utils/AppConstants';
import CommonDataManager from '../../../Utils/CommonManager';
import { AppStyles } from '../../../Utils/AppStyles';

const ProfilePlaceHolderComp = (props: any) => {
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor:
            CommonDataManager.getSharedInstance().generateRandomColor(
              props?.index,
            ),
        },
        props?.mainStyles,
      ]}>
      <Text style={[styles.nameTxt, props?.nameStyles]}>
        {CommonDataManager.getSharedInstance().capitalizeFirstLetterFromSentence(
          props?.name,
        )}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    height: normalized(60),
    width: normalized(60),
    borderRadius: normalized(60 / 2),
    justifyContent: 'center',
    borderWidth: normalized(1),
    borderColor: AppColors.white.white,
  },
  nameTxt: {
    color: AppColors.white.white,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: normalized(16),
    ...AppStyles.textMedium
  },
});
export default ProfilePlaceHolderComp;
