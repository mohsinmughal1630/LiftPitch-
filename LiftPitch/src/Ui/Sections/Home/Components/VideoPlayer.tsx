import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Video from 'react-native-video';
import { AppColors, AppImages } from '../../../../Utils/AppConstants';
import { AppStyles } from '../../../../Utils/AppStyles';

interface Props {
  url: string;
  index: number;
  currentVideoIndex: number;
  thumbnail: any;
}

const VideoPlayer = (props: Props) => {
  const shouldCurrentVideoPlay = props.currentVideoIndex == props.index;
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(!shouldCurrentVideoPlay);
  const [isError, setIsError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(shouldCurrentVideoPlay);

  useEffect(() => {
    setIsPlaying(shouldCurrentVideoPlay ? true : false);
    setIsPaused(shouldCurrentVideoPlay ? false : true);
  }, [shouldCurrentVideoPlay]);

  const videoPressed = () => {
    if (isError) {
      console.log('Something wrong with the video.');
    } else if (isPaused) {
      setIsPaused(false);
      setIsPlaying(true);
    } else if (isPlaying) {
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={videoPressed}>
        <View style={styles.absoluteBox}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color="white" />
          ) : !isPlaying ? (
            <Image
              source={isPaused ? AppImages.Videos.Play : AppImages.Videos.Error}
              resizeMode="contain"
              style={styles.middleIcon}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>

      <Video
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        source={{ uri: props.url }}
        minLoadRetryCount={3}
        controls={false}
        ignoreSilentSwitch="ignore"
        paused={isPaused}
        repeat
        poster={props?.thumbnail}
        posterResizeMode='cover'
        pictureInPicture={false}
        onError={(e: any) => {
          setIsLoading(false);
          setIsError(true);
          console.log(
            e?.error?.localizedFailureReason
              ? e.error.localizedFailureReason
              : 'Some problem while playing the video',
          );
        }}
        fullscreen={true}
        resizeMode="cover"
        style={styles.videoStyles}
      />
      {isLoading ? (
        <ActivityIndicator size={'large'} color={AppColors.blue.lightBlue} />
      ) : null}
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  absoluteBox: {
    ...AppStyles.absoluteCommon,
    ...AppStyles.centeredCommon,
    zIndex: 1,
  },
  videoStyles: {
    width: '100%',
    height: '100%',
  },
  middleIcon: {
    height: 50,
    width: 50,
  },
});
