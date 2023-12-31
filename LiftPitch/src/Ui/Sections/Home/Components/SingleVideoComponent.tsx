import React, {useEffect, useState} from 'react';

import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {
  AppColors,
  calculateWindowHeight,
  commentsConstants,
  deviceHeight,
  normalized,
  singleVideoItemType,
} from '../../../../Utils/AppConstants';
import VideoPlayer from './VideoPlayer';
import VideoBottomSection from './VideoBottomSection';
import CommentsModal from './CommentsModal';
import ThreadManager from '../../../../ChatModule/ThreadManger';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNUpdateCommentReq,
  getCommentListingAgainstVideo,
  likeNDisListReq,
} from '../../../../Network/Services/VideoListingServices';
import {AppStrings, CommentActionType} from '../../../../Utils/Strings';
import {
  setIsAlertShow,
  setIsLoader,
} from '../../../../Redux/reducers/AppReducer';
import moment from 'moment';
import ReportReasonModal from './ReportReasonModal';
import ImageViewCompo from './ImageViewCompo';
import CommonDataManager from '../../../../Utils/CommonManager';

interface Props {
  navigation: any;
  item: any;
  currentVideoIndex: number;
  index: number;
  mainStyle?: any;
}

const SingleVideoComponent = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reportingReasonModal, setReportingReasonModal] = useState<any>({
    value: false,
    data: null,
  });
  const [showCommentsModal, setShowComments] = useState(false);

  useEffect(() => {
    if (props?.item?.like?.length > 0) {
      setLikeCount(props?.item?.like?.length);
      const indexToUpdate = props?.item?.like.findIndex(
        (item: any) => item == selector?.userData?.userId,
      );
      if (indexToUpdate !== -1) {
        setIsLike(true);
      }
    }
  }, []);

  const getCommentList = async () => {
    if (!selector.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    setIsLoading(true);
    await getCommentListingAgainstVideo(
      props?.item?.videoId,
      (response: any) => {
        if (response != 'error!') {
          setIsLoading(false);
          setCommentsList(response);
        } else {
          setIsLoading(false);
        }
      },
    );
  };
  const addNupdateComment = async (obj: any, actionType: any) => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    dispatch(setIsLoader(true));
    let currentDate = moment
      .utc(new Date())
      .format(ThreadManager.instance.dateFormater.fullDate);
    let newObj: any = {
      ...obj,
      createdAt: currentDate,
      commentId: ThreadManager.instance.makeid(4),
      creatorId: selector?.userData?.userId,
      creatorName: selector?.userData?.userName
        ? selector?.userData?.userName
        : selector?.userData?.companyName,
      createProfile: selector?.userData?.companyLogo
        ? selector?.userData?.companyLogo
        : '',
    };
    await addNUpdateCommentReq(
      newObj,
      actionType,
      props?.item?.videoId,
      (response: any) => {
        if (response != 'error!') {
          dispatch(setIsLoader(false));
          setCommentsList(response);
        } else {
          dispatch(setIsLoader(false));
          dispatch(setIsAlertShow({value: true, message: response}));
        }
      },
    );
  };
  const deleteNReportReq = async (obj: any, actionType: any) => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    // dispatch(setIsLoader(true));
    await addNUpdateCommentReq(
      obj,
      actionType,
      props?.item?.videoId,
      (response: any) => {
        if (typeof response != 'string') {
          dispatch(setIsLoader(false));
          setCommentsList(response);
        } else {
          dispatch(setIsLoader(false));
          dispatch(setIsAlertShow({value: true, message: response}));
        }
      },
    );
  };
  const likeDisLikeFun = async (action?: any) => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    await likeNDisListReq(
      selector?.userData?.userId,
      action?.length > 0 ? action : isLike ? 'remove' : 'add',
      props?.item?.videoId,
      (response: any) => {
        if (response != 'error!') {
          setIsLike(!isLike);
          setLikeCount(response?.length);
        } else {
          dispatch(setIsLoader(false));
          dispatch(setIsAlertShow({value: true, message: response}));
        }
      },
    );
  };

  return (
    <View style={[styles.mainContainer, props?.mainStyle]}>
      <View style={styles.innerContainer}>
        {props?.item?.videoUrl ? (
          <VideoPlayer
            thumbnail={props?.item?.thumbnail}
            url={props?.item?.videoUrl}
            currentVideoIndex={props.currentVideoIndex}
            index={props?.index}
          />
        ) : (
          <ImageViewCompo url={props?.item?.photoUrl} index={props?.index} />
        )}

        <VideoBottomSection
          index={props?.index}
          likeCount={likeCount}
          isLike={isLike}
          atLikePress={() => {
            likeDisLikeFun();
          }}
          navigation={props?.navigation}
          item={props.item}
          onOptionClick={async (val: string) => {
            if (val == 'comment') {
              getCommentList();
              setShowComments(true);
            } else if (val == 'share') {
              if (props?.item?.videoUrl) {
                await CommonDataManager.getSharedInstance().shareVideo(
                  props?.item?.videoUrl,
                );
              } else {
                await CommonDataManager.getSharedInstance().shareImage(
                  props?.item?.photoUrl,
                );
              }
            }
          }}
        />
      </View>
      {showCommentsModal && (
        <CommentsModal
          isLoador={isLoading}
          onClose={() => {
            setShowComments(false);
          }}
          commentsList={commentsList}
          delNReportAction={async (obj: any) => {
            if (obj?.actionType == CommentActionType.deleteComment) {
              await deleteNReportReq(obj, obj?.actionType);
            } else if (obj?.actionType == CommentActionType.reportComment) {
              setShowComments(false);
              setTimeout(() => {
                setReportingReasonModal({value: true, data: obj});
              }, 500);
            }
          }}
          onNewComment={val => {
            if (val?.isReply?.commentId) {
              addNupdateComment(
                {
                  message: val?.message,
                  PCommentId: val?.isReply?.commentId,
                },
                CommentActionType.reply,
              );
            } else {
              addNupdateComment(
                {
                  message: val?.message,
                  isDeleted: false,
                },
                CommentActionType.addComment,
              );
            }
          }}
        />
      )}
      {reportingReasonModal?.value ? (
        <ReportReasonModal
          value={reportingReasonModal?.value}
          onClose={() => {
            setReportingReasonModal({value: false, data: null});
          }}
          atSubmit={async (val: any) => {
            let newObj: any = {
              ...reportingReasonModal?.data,
              reason: val,
            };
            setReportingReasonModal({value: false, data: null});

            await deleteNReportReq(newObj, CommentActionType.reportComment);
          }}
        />
      ) : null}
    </View>
  );
};

export default SingleVideoComponent;

const diff = Dimensions.get('screen').height - Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.black.black,
    height:
      Platform.OS == 'android'
        ? Dimensions.get('screen').height - diff - normalized(80)
        : deviceHeight - normalized(80),
  },
  innerContainer: {
    flex: 1,
  },
});
