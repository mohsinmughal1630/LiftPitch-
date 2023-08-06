import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {AppColors, AppImages, hv, normalized} from '../../../Utils/AppConstants';
interface Props {
  value: string | undefined,
  onPress: () => void;
  onClear: () => void;
  container?: ViewStyle
  placeholderColor?: string
}
const PressableInput = (props: Props) => {
  return (
     <TouchableWithoutFeedback onPress={props.onPress} disabled={props.value ? true : false}>
       <View style={[styles.inputContainer, props.container]}>
            <Text style={{
               color: props.value ? 'black' : AppColors.grey.placeholderGrey,
               flex: 1
            }}>{props.value ? props.value : 'Company Address'}</Text>

        {props.value ? (
          <TouchableWithoutFeedback onPress={props.onClear}>
          <View style={styles.crossBox}>
            <Image
              source={AppImages.Common.CloseIcon}
              style={styles.crossImg}
            />
          </View>
        </TouchableWithoutFeedback>
        ) : null}
      </View>
     </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    height: normalized(56),
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E3E4',
    borderRadius: normalized(12),
    alignItems: 'center',
    paddingHorizontal: normalized(12)
  },
  txtInput: {
    height: normalized(55),
    color: 'black',
    paddingLeft: normalized(12),
    maxWidth: normalized(270),
  },
  errorMsg: {
    marginTop: hv(1),
    color: 'red',
    fontWeight: '500',
    fontSize: normalized(12),
    marginLeft: normalized(2),
  },
  rightIconStyle: {
    height: normalized(22),
    width: normalized(22),
    marginStart: normalized(10),
  },
  crossBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    alignSelf: "center",
    marginRight: -5,
    zIndex: 2,
    backgroundColor: AppColors.grey.placeholderGrey,
    borderRadius: 15
  },
  crossImg: {
    width: 7,
    height: 7,
    tintColor: AppColors.white.white,
  },
});
export default PressableInput;
