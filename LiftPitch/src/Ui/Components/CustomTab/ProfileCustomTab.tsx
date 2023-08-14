import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppColors, normalized} from '../../../Utils/AppConstants';
const ProfileCustomTab = (props: any) => {
  return (
    <View style={[styles.mainContainer, props?.mainStyle]}>
      {props?.list.map((el: any) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              props?.atSelectTab(el);
            }}
            style={{
              backgroundColor:
                props?.selectTab == el?.txt
                  ? AppColors.red.mainColor
                  : AppColors.white.white,
              borderColor: AppColors.grey.gray,
              borderWidth: 1,
              width: normalized(90),
              height: normalized(35),
              borderRadius: normalized(5),
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: normalized(5),
            }}>
            <Text
              style={{
                color:
                  props?.selectTab == el?.txt
                    ? AppColors.white.white
                    : AppColors.red.mainColor,
                fontSize: normalized(13),
                fontWeight: '500',
              }}>
              {el?.txt}
            </Text>
          </TouchableOpacity>
        );
      })}
      {/*         
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props?.atSelectTab(0);
        }}>
        <Text
          style={props?.selectTab == 0 ? styles.tabTxtSelected : styles.tabTxt}>
          {props?.tabTxt1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props?.atSelectTab(1);
        }}>
        <Text
          style={props?.selectTab == 1 ? styles.tabTxtSelected : styles.tabTxt}>
          {props?.tabTxt2}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props?.atSelectTab(1);
        }}>
        <Text
          style={props?.selectTab == 1 ? styles.tabTxtSelected : styles.tabTxt}>
          {props?.tabTxt2}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabTxt: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.black.black,
    alignSelf: 'center',
    textAlign: 'center',
  },
  tabTxtSelected: {
    fontSize: normalized(16),
    fontWeight: '700',
    color: AppColors.black.black,
    alignSelf: 'center',
    textAlign: 'center',
  },
  simpleLine: {
    height: normalized(15),
    width: normalized(2),
    backgroundColor: AppColors.grey.towerGrey,
    marginHorizontal: normalized(20),
  },
});

export default ProfileCustomTab;
