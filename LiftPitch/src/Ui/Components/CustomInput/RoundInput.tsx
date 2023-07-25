import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardTypeOptions,
  ViewStyle,
  Platform,
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
  onChangeText: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  showIconWithTitle?: boolean;
  titleStyle?: TextStyle;
  titleContainerStyle?: any;
  titleIcon?: any;
  multiline?: boolean;
  inputIcon?: any;
  disabled?: boolean;
  isError?: boolean;
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  startIconStyle?: ImageStyle;
}

const RoundInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(
    props.multiline && !isFocused
      ? false
      : props.value && props?.value?.length > 180
      ? true
      : true,
  );

  return (
    <View style={[styles.mainContainer, props.containerStyle]}>
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
          props.inputContainerStyle,
          {
            borderColor: props.isError
              ? AppColors.red.warning
              : isFocused
              ? AppColors.primaryGreen
              : props.disabled
              ? AppColors.dark.darkLevel6
              : AppColors.dark.darkLevel3,
            backgroundColor:
              props.value && !props.disabled
                ? AppColors.dark.darkLevel4
                : AppColors.dark.darkLevel6,
          },
        ]}>
        <View
          style={[
            AppStyles.horiCommon,
            {
              flex: 1,
            },
          ]}>
          {props.inputIcon && (
            <Image
              source={props.inputIcon}
              resizeMode="contain"
              style={[
                styles.inputImg,
                {
                  tintColor: props.isError
                    ? AppColors.red.warning
                    : isFocused
                    ? AppColors.primaryGreen
                    : AppColors.dark.darkLevel1,
                },
                props.startIconStyle,
              ]}
            />
          )}
          <TextInput
            placeholder={props.placeholder ? props.placeholder : ''}
            placeholderTextColor={
              props.isError
                ? AppColors.red.warning
                : props.placeholderTextColor
                ? props.placeholderTextColor
                : AppColors.dark.darkLevel1
            }
            secureTextEntry={props.isPassword && !showPassword ? true : false}
            value={props.value ? props.value : ''}
            onChangeText={e => {
              props.onChangeText(props?.isPassword ? e.trim() : e);
            }}
            style={[
              styles.input,
              {
                color: props.isError
                  ? AppColors.red.warning
                  : props.disabled
                  ? AppColors.dark.darkLevel1
                  : AppColors.white.white,
              },
              props.multiline
                ? {
                    textAlignVertical: 'top',
                    paddingTop: normalized(10),
                  }
                : null,
            ]}
            onFocus={() => {
              setIsFocused(true);
              if (props.multiline) {
                setTimeout(() => {
                  setScrollEnabled(true);
                }, 1500);
              }
            }}
            onBlur={() => {
              setIsFocused(false);
              if (props.multiline) {
                setScrollEnabled(false);
              }
            }}
            keyboardType={props.keyboardType ? props.keyboardType : 'default'}
            multiline={props.multiline ? true : false}
            maxLength={props.maxLength ? props.maxLength : 1000}
            editable={props.disabled ? false : true}
            autoCapitalize={
              props.autoCapitalize ? props.autoCapitalize : 'sentences'
            }
            scrollEnabled={scrollEnabled}
            onContentSizeChange={e => {
              if (e.nativeEvent.contentSize.height > 80 && props.multiline) {
                setTimeout(() => {
                  setScrollEnabled(true);
                }, 1500);
              } else {
                setScrollEnabled(false);
              }
            }}
          />
        </View>
        {props.isPassword && props.value !== '' && (
          <TouchableWithoutFeedback
            onPress={() => setShowPassword(!showPassword)}>
            <View style={styles.passwordView}>
              <Image
                source={
                  showPassword
                    ? AppImages.Auth.HidePassword
                    : AppImages.Auth.ShowPassword
                }
                style={styles.password}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export default RoundInput;

const styles = StyleSheet.create({
  mainContainer: {
    width: ScreenSize.width * 0.75,
  },
  headingRow: {
    marginLeft: normalized(5),
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
    tintColor: AppColors.white.white,
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
    borderWidth: 2,
    borderColor: AppColors.dark.darkLevel3,
    paddingHorizontal: normalized(20),
    marginTop: Platform.OS == 'android' ? hv(5) : hv(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: normalized(14),
    ...AppStyles.textRegular,
    height: '100%',
  },
  passwordView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    width: 30,
    marginRight: -5,
  },
  password: {
    height: 20,
    width: 20,
    tintColor: AppColors.dark.darkLevel1,
  },
  inputImg: {
    height: normalized(20),
    width: normalized(20),
    marginRight: normalized(10),
  },
});
