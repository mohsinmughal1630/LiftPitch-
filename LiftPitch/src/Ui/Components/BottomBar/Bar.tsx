import React from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {AppColors, hv, normalized} from '../../../Utils/AppConstants';
import {AppStrings} from '../../../Utils/Strings';
const Bar = ({obj, onPress, index, tab}: any) => {
  return (
    <TouchableWithoutFeedback
      style={{}}
      key={obj.title}
      onPress={() => onPress()}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          bottom: hv(5),
        }}>
        {obj?.title == AppStrings.bottomBar.createVideo ? (
          <View
            style={{
              height: normalized(40),
              width: normalized(40),
              borderRadius: normalized(40 / 2),
              backgroundColor: AppColors.red.mainColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 39,
                height: 25,
              }}
              source={obj.icon}
              resizeMode="contain"
            />
          </View>
        ) : tab == index ? (
          <View>
            <Image
              style={styles.selectedTab}
              source={obj.icon}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Image
            style={styles.unSelectedtAb}
            resizeMode="contain"
            source={obj.icon}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  selectedTab: {
    tintColor: AppColors.red.mainColor,
    width: 39,
    height: 25,
  },
  unSelectedtAb: {
    tintColor: AppColors.black.light,
    width: 39,
    height: 25,
  },
});
export default Bar;
