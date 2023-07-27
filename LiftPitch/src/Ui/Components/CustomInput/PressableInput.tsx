import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardTypeOptions,
  TouchableOpacity,
  TextStyle,
  ImageStyle,
} from 'react-native';
import {
  AppColors,
  AppFonts,
  AppImages,
  formFieldsHeight,
  hv,
  normalized,
  ScreenSize,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';

interface Props {
  title: string;
  value?: string;
  onChangeText?: (text: string) => any;
  placeholder?: string;
  placeholderTextColor?: string;
  containerStyle?: any;
  showIconWithTitle?: boolean;
  titleStyle?: any;
  titleContainerStyle?: any;
  titleIcon?: any;
  onPress?: () => void;
  type?: string;
  list?: any;
  onItemSelect?: (obj: any) => void;
  widthPercent?: any;
  inputIcon?: any;
  showDropdown?: boolean;
  valueStyle?: TextStyle;
  startIconStyle?: ImageStyle;
  isRemovable?: boolean;
  onRemove?: () => void;
}

const PressableInput = (props: Props) => {
  const [showList, setShowList] = useState(false);
  let inputWidth = props.widthPercent
    ? props.widthPercent
    : ScreenSize.width * 0.7;
  return (
    <View
      style={[
        styles.mainContainer,
        props.containerStyle,
        {
          width: inputWidth,
        },
      ]}>
      <View style={[styles.headingRow, props.titleContainerStyle]}>
        {props.showIconWithTitle && props.titleIcon && (
          <View style={styles.titleIcon}>
            <Image
              source={props.titleIcon}
              style={styles.titleImg}
              resizeMode="contain"
            />
          </View>
        )}
        <Text style={[styles.heading, props.titleStyle]}>{props.title}</Text>
      </View>
      <View
        style={[
          styles.inputView,
          {
            borderBottomRightRadius: showList ? 0 : 30,
            borderBottomLeftRadius: showList ? 0 : 30,
            backgroundColor: props.value
              ? AppColors.dark.darkLevel4
              : AppColors.dark.darkLevel6,
            borderBottomWidth: showList ? 1 : 2,
          },
        ]}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (props.type == 'list') {
              setShowList(!showList);
            } else if (props.onPress) {
              props.onPress();
            }
          }}>
          <View style={styles.rowCommon}>
            {props.inputIcon && (
              <Image
                source={props.inputIcon}
                resizeMode="contain"
                style={[styles.inputIcon, props.startIconStyle]}
              />
            )}
            <Text
              style={[
                styles.input,
                {
                  color:
                    props.value || showList
                      ? AppColors.white.white
                      : AppColors.dark.darkLevel1,
                },
                props.valueStyle,
              ]}>
              {props.value
                ? props.value
                : props.placeholder
                ? props.placeholder
                : ''}
            </Text>
            {props.isRemovable && (
              <TouchableWithoutFeedback onPress={props.onRemove}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    marginRight: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={AppImages.Common.CrossIconFilled}
                    resizeMode="contain"
                    style={{
                      height: 15,
                      width: 15,
                      tintColor: AppColors.dark.darkLevel1,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
            {props.showDropdown && (
              <Image
                source={AppImages.Cards.DropDown}
                resizeMode="contain"
                style={{
                  height: normalized(15),
                  width: normalized(15),
                  marginHorizontal: normalized(5),
                  transform: [
                    {
                      rotateZ: `${showList ? 180 : 0}deg`,
                    },
                  ],
                }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
        {showList && props.list && (
          <View
            style={[
              styles.listContainer,
              {
                width: inputWidth,
              },
            ]}>
            {props.list.map((item: any, index: number) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  if (props.onItemSelect) {
                    setShowList(false);
                    props.onItemSelect(item);
                  }
                }}>
                <View
                  style={[
                    styles.singleItem,
                    {
                      width: inputWidth - 4,
                      borderBottomLeftRadius:
                        index == props.list?.length - 1 ? 29 : 0,
                      borderBottomRightRadius:
                        index == props.list?.length - 1 ? 29 : 0,
                      backgroundColor:
                        props.value == item.name
                          ? AppColors.dark.darkLevel3
                          : props.value
                          ? AppColors.dark.darkLevel4
                          : AppColors.dark.darkLevel6,
                      borderBottomWidth:
                        index == props.list?.length - 1 ? 0 : 1,
                      borderBottomColor: AppColors.dark.darkLevel3,
                    },
                  ]}>
                  <Text style={styles.singleItemText}>{item.name}</Text>
                  {item.name == props.value && (
                    <View style={styles.tickView}>
                      <Image
                        source={AppImages.Cards.SingleDarkTick}
                        resizeMode="contain"
                        style={styles.tickImage}
                      />
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default PressableInput;

const styles = StyleSheet.create({
  mainContainer: {
    width: ScreenSize.width * 0.7,
  },
  headingRow: {
    // marginLeft: normalized(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    backgroundColor: AppColors.dark.darkLevel3,
    justifyContent: 'center',
    alignItems: 'center',
    height: normalized(45),
    width: normalized(45),
    borderRadius: normalized(22.5),
    marginRight: normalized(5),
  },
  titleImg: {
    height: normalized(20),
    width: normalized(20),
  },
  heading: {
    color: AppColors.white.white,
    fontSize: normalized(14),
    ...AppStyles.textRegular,
    marginLeft: normalized(5),
  },
  inputView: {
    height: formFieldsHeight,
    borderRadius: 30,
    paddingHorizontal: normalized(20),
    marginTop: hv(5),
    backgroundColor: AppColors.dark.darkLevel4,
    borderColor: AppColors.dark.darkLevel3,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    color: AppColors.white.white,
    fontSize: normalized(14),
    ...AppStyles.textRegular,
  },
  rowCommon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    position: 'absolute',
    top: formFieldsHeight - 2,
    right: -2,
    left: -2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: AppColors.dark.darkLevel4,
    borderColor: AppColors.dark.darkLevel3,
    borderWidth: 2,
    borderTopWidth: 0,
  },
  singleItem: {
    height: formFieldsHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: normalized(20),
  },
  singleItemText: {
    ...AppStyles.textRegular,
    fontSize: normalized(14),
    color: AppColors.white.white,
  },
  inputIcon: {
    height: normalized(20),
    width: normalized(20),
    marginRight: normalized(10),
    tintColor: AppColors.dark.darkLevel1,
  },
  tickView: {
    height: normalized(25),
    width: normalized(25),
    borderRadius: normalized(12.5),
    backgroundColor: AppColors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickImage: {
    height: normalized(15),
    width: normalized(15),
  },
});
