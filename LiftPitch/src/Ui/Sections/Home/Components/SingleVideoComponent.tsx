import React, {useState} from 'react';

import {Platform, StyleSheet, View} from 'react-native';
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
} from '../../../../Network/Services/VideoListingServices';
import {AppStrings, CommentActionType} from '../../../../Utils/Strings';
import {
  setIsAlertShow,
  setIsLoader,
} from '../../../../Redux/reducers/AppReducer';
import moment from 'moment';

interface Props {
  navigation: any;
  item: singleVideoItemType;
  currentVideoIndex: number;
  index: number;
}

const SingleVideoComponent = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [showCommentsModal, setShowComments] = useState(false);
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
    await getCommentListingAgainstVideo('0MIZNeas', (response: any) => {
      if (response != 'error!') {
        setIsLoading(false);
        setCommentsList(response);
      } else {
        setIsLoading(false);
      }
    });
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
      '0MIZNeas',
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
    await addNUpdateCommentReq(obj, actionType, '0MIZNeas', (response: any) => {
      if (response != 'error!') {
        dispatch(setIsLoader(false));
        setCommentsList(response);
      } else {
        dispatch(setIsLoader(false));
        dispatch(setIsAlertShow({value: true, message: response}));
      }
    });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <VideoPlayer
          url={props.item.videoUrl}
          currentVideoIndex={props.currentVideoIndex}
          index={props.index}
        />
        <VideoBottomSection
          navigation={props?.navigation}
          item={props.item}
          onOptionClick={(val: string) => {
            if (val == 'comment') {
              getCommentList();
              setShowComments(true);
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
    </View>
  );
};

export default SingleVideoComponent;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.black.black,
    height:
      Platform.OS == 'android'
        ? calculateWindowHeight() - normalized(80)
        : deviceHeight - normalized(80),
  },
  innerContainer: {
    flex: 1,
  },
});
