import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import moment from 'moment';
import CommentInput from './CommentInput';
import LoadingImage from '../../../Components/LoadingImage';
import {
  AppColors,
  AppImages,
  ScreenSize,
  normalized,
} from '../../../../Utils/AppConstants';

interface Props {
  onClose: () => void;
  commentsList: Array<any>;
  onNewComment: (val: string) => void;
}

const CommentsModal = (props: Props) => {
  const [commentTxt, setCommentTxt] = useState('');
  return (
    <Modal onRequestClose={props.onClose} transparent animationType="slide">
      <View style={styles.outerMainContainer}>
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View
          // style={styles.bgContainer}
          />
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <View style={styles.mainContainer}>
            <View style={styles.headerRow}>
              <View style={styles.endView} />
              <Text
                style={
                  styles.title
                }>{`${props.commentsList.length} Comments`}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{padding: normalized(10)}}
                onPress={() => {
                  props?.onClose();
                }}>
                <Image source={AppImages.Common.CloseIcon} />
              </TouchableOpacity>
            </View>

            <FlatList
              inverted
              keyExtractor={(item, index) => `${index}`}
              showsVerticalScrollIndicator={false}
              data={props.commentsList}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.singleCommentContainer} key={index}>
                    <View style={styles.profileImgBox}>
                      {item.image ? (
                        <LoadingImage
                          source={{uri: item.image}}
                          viewStyle={{
                            ...styles.profileImgBox,
                            backgroundColor: AppColors.white.bgWhite,
                          }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image
                          source={AppImages.bottomBar.Profile}
                          resizeMode="contain"
                          style={styles.placeholderImg}
                        />
                      )}
                    </View>
                    <View style={styles.contentBox}>
                      <View
                        style={[
                          AppStyles.horiCommon,
                          {justifyContent: 'space-between'},
                        ]}>
                        <Text
                          style={[
                            styles.description,
                            {color: AppColors.grey.towerGrey, marginTop: 0},
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                      <Text style={styles.msgTxt}>{item.message}</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity
                        style={{
                          padding: normalized(5),
                        }}>
                        <Image
                          source={AppImages.Common.menuIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={{padding: normalized(5)}}>
                        <Image source={AppImages.Videos.Share} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
            <CommentInput
              messageTxt={commentTxt}
              onChangeMessage={setCommentTxt}
              onSendPress={() => {
                props.onNewComment(commentTxt);
                setCommentTxt('');
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  outerMainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bgContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.transparentColor,
  },
  mainContainer: {
    minHeight: 400,
    maxHeight: ScreenSize.height * 0.9,
    backgroundColor: AppColors.white.white,
    zIndex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  headerRow: {
    ...AppStyles.horiCommon,
    justifyContent: 'space-between',
    paddingVertical: normalized(10),
    paddingHorizontal: AppHorizontalMargin,
  },
  title: {
    fontSize: normalized(13),
    color: AppColors.black.black,
    fontWeight: '600',
  },
  endView: {
    height: 35,
    width: 35,
  },
  crossImg: {
    height: 15,
    width: 15,
    tintColor: AppColors.grey.dimGrey,
  },
  commentsMainContainer: {
    flex: 1,
  },
  singleCommentContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    // alignItems: 'center',
    marginHorizontal: normalized(15),
  },
  profileImgBox: {
    backgroundColor: AppColors.red.mainColor,
    height: normalized(30),
    width: normalized(30),
    borderRadius: normalized(30 / 2),
    ...AppStyles.centeredCommon,
  },
  placeholderImg: {
    height: '60%',
    width: '60%',
    tintColor: AppColors.white.white,
  },
  contentBox: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
  },
  description: {
    color: AppColors.grey.grey,
    fontSize: normalized(12),
    fontWeight: '600',
  },
  msgTxt: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    fontWeight: '400',
  },
});
