import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';

const VideoHeaderSection = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <View style={AppStyles.mainContainer}>
        <View style={styles.innerContainer}>
          <View style={{marginHorizontal: normalized(40)}} />
          <View style={styles.tabCont}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                props?.atSelectTab(0);
              }}>
              <Text
                style={[
                  styles.tabTxt,
                  {
                    color:
                      props?.selectedTab == 0
                        ? AppColors.white.white
                        : AppColors.grey.towerGrey,
                  },
                ]}>
                Network
              </Text>
            </TouchableOpacity>
            <View style={{marginHorizontal: normalized(8)}} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                props?.atSelectTab(1);
              }}>
              <Text
                style={[
                  styles.tabTxt,
                  {
                    color:
                      props?.selectedTab == 1
                        ? AppColors.white.white
                        : AppColors.grey.towerGrey,
                  },
                ]}>
                For Business
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              props?.atSearchBtnPress();
            }}>
            <Image source={AppImages.Common.SearchIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VideoHeaderSection;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hv(70),
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
  innerContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: AppHorizontalMargin,
  },
  tabCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabTxt: {
    color: AppColors.white.white,
    fontSize: normalized(16),
    fontWeight: '700',
  },
});
