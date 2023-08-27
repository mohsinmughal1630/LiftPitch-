import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AppColors, hv, normalized } from '../../../Utils/AppConstants';
import { AppStrings } from '../../../Utils/Strings';
const Bar = ({ obj, onPress, index, tab }: any) => {
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
          <Image
            style={{
              height: normalized(55),
              width: normalized(55),
            }}
            source={obj.icon}
            resizeMode="contain"
          />
        ) : (
          <View>
            <Image
              style={[styles.selectedTab, {
                tintColor: tab == index ? AppColors.primaryPurple : AppColors.black.light
              }]}
              source={tab == index ? obj.selectedIcon : obj.icon}
              resizeMode="contain"
            />
          </View>
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
