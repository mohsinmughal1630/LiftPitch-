import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AppColors,
  AppFonts,
  AppImages,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../../../../Redux/store/AppStore';
interface Props {
  messageTxt: string;
  onChangeMessage: (val: string) => void;
  onSendPress: () => void;
}

const CommentInput = (props: Props) => {
  // const {isNotchDevice} = useSelector(
  //   (state: AppRootStore) => state.AppReducer,
  // );
  return (
    <View
      style={[
        styles.mainContainer,
        {
          // marginBottom: isNotchDevice && Platform.OS == 'ios' ? 25 : 5,
        },
      ]}>
      <TextInput
        placeholder="Write something"
        placeholderTextColor={AppColors.grey.dimGrey}
        value={props.messageTxt}
        onChangeText={props.onChangeMessage}
        style={[styles.input, {marginLeft: 10}]}
      />
      <TouchableWithoutFeedback
        onPress={props.onSendPress}
        disabled={props.messageTxt.trim() == ''}>
        <View
          style={[
            styles.sendImgBox,
            props.messageTxt.trim() == '' && {opacity: 0.7},
          ]}>
          <Image
            source={AppImages.Chat.SendIcon}
            resizeMode="contain"
            style={styles.sendImg}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.white.white,
    borderRadius: 22,
    ...AppStyles.shadowCommon,
    height: 55,
    paddingHorizontal: normalized(10),
    marginBottom: 10,
    marginHorizontal: normalized(20),
    ...AppStyles.horiCommon,
  },
  input: {
    color: AppColors.grey.grey,
    fontSize: normalized(14),
    flex: 1,
    height: '100%',
  },
  sendImgBox: {
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: AppColors.red.mainColor,
    ...AppStyles.centeredCommon,
    marginLeft: 10,
  },
  sendImg: {
    height: 20,
    width: 20,
    tintColor: AppColors.white.white,
  },
  voiceBox: {
    height: 45,
    width: 30,
    ...AppStyles.centeredCommon,
  },
  voiceImg: {
    height: 25,
    width: 25,
  },
  attachmentImg: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
});
