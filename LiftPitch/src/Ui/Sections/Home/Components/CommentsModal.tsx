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
  onNewComment: (val: any) => void;
}

const CommentsModal = (props: Props) => {
  const [isReply, setIsReply] = useState<any>(null);
  const [commentTxt, setCommentTxt] = useState('');
  return (
    <Modal onRequestClose={props.onClose} transparent animationType="slide">
      <View style={styles.outerMainContainer}>
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View />
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
            {props?.commentsList?.length > 0 ? (
              <FlatList
                // inverted
                keyExtractor={(item, index) => `${index}`}
                showsVerticalScrollIndicator={false}
                data={props?.commentsList}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <View style={styles.singleCommentContainer} key={index}>
                        <View style={styles.profileImgBox}>
                          {item?.createProfile ? (
                            <LoadingImage
                              source={{uri: item?.createProfile}}
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
                              {item?.creatorName}
                            </Text>
                          </View>
                          <Text style={styles.msgTxt}>{item?.message}</Text>
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
                          <TouchableOpacity
                            style={{padding: normalized(5)}}
                            onPress={() => {
                              setIsReply({
                                creatorName: item?.creatorName,
                                commentId: item?.commentId,
                                message: item?.message,
                              });
                            }}>
                            <Image source={AppImages?.Videos?.Share} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      {item?.reply?.length > 0
                        ? item?.reply.map((el: any, childIndex: any) => {
                            return (
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  marginVertical: 5,
                                  marginStart: normalized(50),
                                  marginEnd: normalized(20),
                                }}
                                key={childIndex}>
                                <View style={styles.profileImgBox}>
                                  {el?.createProfile ? (
                                    <LoadingImage
                                      source={{uri: el?.createProfile}}
                                      viewStyle={{
                                        ...styles.profileImgBox,
                                        backgroundColor:
                                          AppColors.white.bgWhite,
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
                                        {
                                          color: AppColors.grey.towerGrey,
                                          marginTop: 0,
                                        },
                                      ]}>
                                      {el?.creatorName}
                                    </Text>
                                  </View>
                                  <Text style={styles.msgTxt}>
                                    {el?.message}
                                  </Text>
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
                                </View>
                              </View>
                            );
                          })
                        : null}
                    </>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: normalized(14),
                    color: AppColors.black.black,
                    fontWeight: '400',
                  }}>
                  No Comment Found!
                </Text>
              </View>
            )}

            <CommentInput
              isReply={isReply}
              messageTxt={commentTxt}
              onChangeMessage={setCommentTxt}
              onSendPress={() => {
                if (isReply) {
                  props?.onNewComment({message: commentTxt, isReply: isReply});
                } else {
                  props?.onNewComment({message: commentTxt, isReply: null});
                }
                setIsReply(null);
                setCommentTxt('');
              }}
              atCancelReply={() => {
                setIsReply(null);
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
    minHeight: normalized(230),
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
