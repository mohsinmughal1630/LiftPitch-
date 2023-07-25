import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ViewStyle,
  TouchableWithoutFeedback,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  AppColors,
  AppFonts,
  AppImages,
  ScreenSize,
  formFieldsHeight,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../../../../Redux/store/AppStore';

interface Props {
  index: number;
  onPress: (val: number) => void;
  item: any;
  containerStyle?: ViewStyle;
  onEnterpriseClick: (val: number) => void;
}

const SingleUpgradeView = (props: Props) => {
  const {packagePlan} = useSelector((state: AppRootStore) => state.AppReducer);

  const [currentIndex, setCurrentIndex] = useState(0);

  const frequency = currentIndex == 0 ? 'monthly' : 'yearly';

  const isActive =
    frequency == packagePlan?.subscription_type &&
    packagePlan?.id == props.item.id;
  const colorsList = [
    isActive ? AppColors.green.primaryLight : AppColors.primaryGreen,
    AppColors.primaryGreen,
  ];
  const isExistingPackageExpired =
    isActive && packagePlan?.isExpired ? true : false;
  console.log('isActive: ', isActive);
  console.log('isExistingPackageExpired: ', packagePlan?.isExpired);
  const isEnterprise = props.item.id == 4;
  const isFree = props.item.id == 1;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.outerContainer}>
        <View style={[styles.mainContainer, props.containerStyle]}>
          <Pressable disabled style={styles.basicBtnStyle}>
            <Text style={styles.basicBtnTxt}>{props.item.type}</Text>
          </Pressable>
          <ToggleBar
            currentIndex={currentIndex}
            onChangeIndex={(val: number) => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setCurrentIndex(val);
            }}
            disabled={isFree}
          />
          <View style={styles.circularView}>
            <Image
              source={props.item.image}
              resizeMode="contain"
              style={styles.circularImageStyle}
            />
          </View>
          <View style={styles.titleDesStyle}>
            {isEnterprise ? (
              <Text
                style={[
                  styles.titleStyle,
                  {
                    ...AppStyles.textSemiBold,
                    fontSize: normalized(20),
                  },
                ]}>
                Custom Pricing
              </Text>
            ) : isFree ? (
              <Text style={styles.titleStyle}>FREE</Text>
            ) : isActive ? (
              <Text style={styles.titleStyle}>{props.item.title}</Text>
            ) : (
              <View style={styles.txtFlexDecoration}>
                <Text style={styles.dollarStyle}>$</Text>
                <Text style={styles.titleStyle}>
                  {
                    props.item[
                      currentIndex == 0 ? 'monthly_price' : 'yearly_price'
                    ]
                  }
                </Text>
                <Text style={styles.monthTextStyle}>{`/ ${
                  currentIndex == 0 ? 'month' : 'year'
                }`}</Text>
              </View>
            )}
            {/* <Text style={styles.descriptionStyle}>{props.item.description}</Text> */}
            {props.item.features.map((element: any, i: number) => {
              return (
                <View key={i} style={styles.featureRow}>
                  <View style={AppStyles.horiCommon}>
                    <View
                      style={{
                        backgroundColor: element.value
                          ? AppColors.white.white
                          : AppColors.dark.darkLevel1,
                        height: 6,
                        width: 6,
                        borderRadius: 3,
                        marginRight: 10,
                      }}
                    />
                    <Text
                      style={[
                        styles.descriptionStyle,
                        {
                          color: element.value
                            ? AppColors.white.white
                            : AppColors.dark.darkLevel1,
                        },
                      ]}>
                      {element.name}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.descriptionStyle,
                      {
                        color: element.value
                          ? AppColors.white.white
                          : AppColors.dark.darkLevel1,
                      },
                    ]}>
                    {element.value === true
                      ? 'Yes'
                      : element.value === false
                      ? 'No'
                      : element.value}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.dividerLine} />

          {isExistingPackageExpired && (
            <Text style={styles.expiredTxt}>This subscription is expired</Text>
          )}

          {!isExistingPackageExpired && isActive ? (
            <View
              style={{
                marginTop: 15,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.subscribedTxt}>
                {packagePlan?.id == 1 ? 'Active' : 'Subscribed'}
              </Text>
              <Image
                source={AppImages.Cards.TickIcon}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  marginLeft: 6,
                }}
              />
            </View>
          ) : (
            <Pressable
              disabled={(isFree || isActive) && !isExistingPackageExpired}
              onPress={() => {
                if (isEnterprise) {
                  props.onEnterpriseClick(currentIndex);
                } else {
                  props.onPress(currentIndex);
                }
              }}>
              <LinearGradient
                colors={colorsList}
                style={[
                  styles.gradientBtnStyle,
                  !isActive && props.item.id == 1 && {opacity: 0.4},
                ]}>
                <Text style={styles.gradientBtnTxtStyle}>
                  {isExistingPackageExpired
                    ? 'Buy Again'
                    : isEnterprise
                    ? 'Contact Us'
                    : 'Buy Now'}
                </Text>
              </LinearGradient>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
export default SingleUpgradeView;
const singleItemWidth = ScreenSize.width;
const barWidth = singleItemWidth / 1.4;

const styles = StyleSheet.create({
  outerContainer: {
    width: singleItemWidth,
    paddingHorizontal: normalized(25),
    // paddingTop: 15,
    paddingBottom: hv(40) + 15,
  },
  mainContainer: {
    backgroundColor: AppColors.dark.darkLevel4,
    borderWidth: 1,
    borderColor: AppColors.dark.darkLevel3,
    borderRadius: normalized(20),
    paddingVertical: normalized(20),
    marginTop: normalized(15),
    ...AppStyles.shadowCommon,
  },
  titleDesStyle: {
    marginTop: normalized(15),
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  dividerLine: {
    height: normalized(1),
    backgroundColor: AppColors.dark.darkLevel3,
    marginHorizontal: normalized(15),
    marginTop: normalized(15),
  },
  txtFlexDecoration: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: normalized(5),
  },
  dollarStyle: {
    fontSize: normalized(18),
    ...AppStyles.textRegular,
    color: '#FFFFFF',
    marginRight: normalized(2),
    marginBottom: 3,
  },
  monthTextStyle: {
    fontSize: normalized(14),
    ...AppStyles.textRegular,
    color: '#FFFFFF',
    marginLeft: normalized(2),
  },
  basicBtnStyle: {
    height: normalized(45),
    width: normalized(150),
    backgroundColor: '#23665f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalized(60),
    alignSelf: 'center',
  },
  basicBtnTxt: {
    color: AppColors.white.white,
    ...AppStyles.textSemiBold,
    fontSize: normalized(18),
  },
  circularView: {
    height: normalized(100),
    width: normalized(100),
    borderRadius: normalized(60),
    backgroundColor: AppColors.primaryGreen,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalized(20),
  },
  circularImageStyle: {
    height: normalized(30),
    width: normalized(30),
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: normalized(25),
    ...AppStyles.textBold,
    color: AppColors.white.white,
    marginBottom: 5,
  },
  descriptionStyle: {
    fontSize: normalized(13),
    ...AppStyles.textRegular,
  },
  gradientBtnStyle: {
    height: hv(53),
    width: normalized(230),
    borderRadius: normalized(58),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalized(20),
  },
  gradientBtnTxtStyle: {
    ...AppStyles.textMedium,
    fontSize: normalized(16),
    color: AppColors.white.white,
  },
  toggleButtonContainer: {
    marginTop: hv(20),
    height: formFieldsHeight,
    width: barWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: AppColors.black.darkDeep,
    borderColor: AppColors.dark.darkLevel3,
    borderWidth: 1,
  },
  singleToggleBtn: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  singleToggleBtnTxt: {
    ...AppStyles.textMedium,
    fontSize: normalized(16),
    color: AppColors.white.white,
  },
  toggleGradientBar: {
    position: 'absolute',
    width: barWidth / 2,
    // borderRadius: 15,
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  },
  featureRow: {
    ...AppStyles.horiCommon,
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: 5,
  },
  expiredTxt: {
    color: AppColors.red.warning,
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: AppFonts.Regular,
  },
  subscribedTxt: {
    color: AppColors.primaryGreen,
    fontSize: normalized(18),
    fontFamily: AppFonts.Medium,
  },
});

interface Props2 {
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  disabled?: boolean;
}

const ToggleBar = (props: Props2) => {
  const bgOffset = useSharedValue(barWidth / 2);
  useEffect(() => {
    changeTab();
  }, [props.currentIndex]);

  const changeTab = () => {
    bgOffset.value = withTiming(props.currentIndex == 0 ? 0 : barWidth / 2);
  };
  const tabStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: bgOffset.value,
        },
      ],
    };
  });
  return (
    <View
      style={[styles.toggleButtonContainer, props.disabled && {opacity: 0.4}]}>
      {['Monthly', 'Yearly'].map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => props.onChangeIndex(index)}
          disabled={props.disabled}>
          <View style={styles.singleToggleBtn}>
            <Text
              style={[
                styles.singleToggleBtnTxt,
                props.disabled && {color: AppColors.dark.darkLevel1},
              ]}>
              {item}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
      {/* {!props.disabled && ( */}
      <Animated.View style={[styles.toggleGradientBar, tabStyles]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.7, y: 0}}
          colors={[AppColors.green.primaryLight, AppColors.primaryGreen]}
          style={{flex: 1}}></LinearGradient>
      </Animated.View>
      {/* )} */}
    </View>
  );
};
