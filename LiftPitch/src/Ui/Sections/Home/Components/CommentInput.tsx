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
  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder="Add comment... "
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
            source={AppImages.Common.Send}
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
    ...AppStyles.shadowCommon,
    height: normalized(60),
    paddingHorizontal: normalized(10),
    ...AppStyles.horiCommon,
    width: '100%',
  },
  input: {
    color: AppColors.black.black,
    fontSize: normalized(14),
    flex: 1,
    height: '100%',
  },
  sendImgBox: {
    paddingHorizontal: normalized(10),
  },
  sendImg: {
    height: 20,
    width: 20,
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
