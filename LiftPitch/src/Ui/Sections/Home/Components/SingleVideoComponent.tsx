import React, { useState } from 'react';

import { Platform, StyleSheet, View } from 'react-native';
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
// import VideoHeaderSection from './VideoHeaderSection';
import CommonDataManager from '../../../../Utils/CommonManager';
import ProgressModal from '../../../Components/CustomModal/ProgressModal';

interface Props {
  item: singleVideoItemType;
  currentVideoIndex: number;
  index: number;
}

const SingleVideoComponent = (props: Props) => {
  const [commentsList, setCommentsList] = useState(commentsConstants.reverse());
  const [showCommentsModal, setShowComments] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false)
  const [shareProgressValues, setShareProgressValues] = useState<{
    totalValue: number,
    currentValue: number
  }>({
    totalValue: 0,
    currentValue: 0
  })
  const optionClicked = (val: string) => {
    if (val == 'comment') {
      setShowComments(true);
    } else if (val == 'share') {
      CommonDataManager.getSharedInstance().shareVideo(props.item.videoUrl,
        progressObj => {
          console.log("progressObj: ", progressObj);
          setShareProgressValues({ currentValue: progressObj.bytesWritten, totalValue: progressObj.contentLength })
          setShowProgressBar(true);
        }
      )
    }
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <VideoPlayer
          url={props.item.videoUrl}
          currentVideoIndex={props.currentVideoIndex}
          index={props.index}
        />
        <VideoBottomSection
          item={props.item}
          onOptionClick={optionClicked}
        />
      </View>
      {showCommentsModal && (
        <CommentsModal
          onClose={() => {
            setShowComments(false);
          }}
          commentsList={commentsList}
          onNewComment={val => {
            commentsList.unshift({
              id: Math.random(),
              name: 'Salman Khan',
              image: null,
              date: new Date().setHours(0),
              message: val,
            });
          }}
        />
      )}
      {
        showProgressBar && shareProgressValues.currentValue !== 0 && shareProgressValues.totalValue !== 0 &&
        <ProgressModal
          onClose={() => setShowProgressBar(false)}
          progressValues={shareProgressValues} />
      }
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
