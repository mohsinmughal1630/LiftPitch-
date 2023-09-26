import {
  Image,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
  videoHeaderOptions,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';

interface Props {
  selectedTab: number;
  onTabSelect: (val: number) => void;
  searchTxt: string;
  onSearchChange: (val: string) => void;
  atSearchBtnPress: () => void;
}

const VideoHeaderSection = (props: Props) => {
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowSearch(!showSearch);
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <SafeAreaView />
      <View style={styles.rowContainer}>
        <View style={AppStyles.horiCommon}>
          {showSearch ? (
            <View
              style={{
                height: hv(55),
                backgroundColor: AppColors.white.white,
                borderRadius: 30,
                width: '85%',
                zIndex: 1,
                marginTop: 10,
                marginLeft: -40,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: normalized(15),
              }}>
              <TextInput
                placeholder={'Search here..'}
                value={props.searchTxt}
                onChangeText={props.onSearchChange}
                style={{
                  color: 'black',
                  fontSize: normalized(14),
                  flex: 1,
                  ...AppStyles.textRegular,
                }}
                returnKeyType="search"
                onSubmitEditing={toggleSearch}
              />
              {props.searchTxt ? (
                <TouchableWithoutFeedback
                  onPress={() => props.onSearchChange('')}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={AppImages.Common.CrossFilled}
                      resizeMode="contain"
                      style={{
                        height: '55%',
                        width: '55%',
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
            </View>
          ) : (
            videoHeaderOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  props?.onTabSelect(index);
                }}>
                <View style={styles.singleBtn}>
                  <Text
                    style={[
                      styles.tabTxt,
                      {
                        color:
                          props?.selectedTab == index
                            ? AppColors.white.white
                            : AppColors.grey.towerGrey,
                      },
                    ]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          // onPress={toggleSearch}
          onPress={() => {
            if (props?.atSearchBtnPress) {
              props?.atSearchBtnPress();
            }
          }}
          style={styles.searchBox}>
          <Image
            source={AppImages.Common.SearchIcon}
            style={styles.searchImg}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoHeaderSection;

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  singleBtn: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tabTxt: {
    color: AppColors.white.white,
    fontSize: normalized(16),
    ...AppStyles.textSemiBold,
  },
  searchBox: {
    height: 35,
    width: 35,
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },
  searchImg: {
    height: '55%',
    width: '55%',
  },
});
