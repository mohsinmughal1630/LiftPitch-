import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {
  AppColors,
  commentsConstants,
  deviceHeight,
  normalized,
  singleVideoItemType,
} from '../../../../Utils/AppConstants';
import VideoPlayer from './VideoPlayer';
import VideoBottomSection from './VideoBottomSection';
import CommentsModal from './CommentsModal';
import VideoHeaderSection from './VideoHeaderSection';

interface Props {
  item: singleVideoItemType;
  currentVideoIndex: number;
  index: number;
}

const SingleVideoComponent = (props: Props) => {
  const [commentsList, setCommentsList] = useState(commentsConstants.reverse());
  const [showCommentsModal, setShowComments] = useState(false);
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
          onOptionClick={(val: string) => {
            if (val == 'comment') {
              setShowComments(true);
            }
          }}
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
    </View>
  );
};

export default SingleVideoComponent;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.black.black,
    height: deviceHeight - normalized(80),
  },
  innerContainer: {
    flex: 1,
  },
});
