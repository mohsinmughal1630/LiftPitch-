import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import {IMAGE_BASE_URL} from '../../../../Network/Urls';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import LoadingImage from '../../../Components/LoadingImage/LoadingImage';
import {WebView} from 'react-native-webview';

interface Props {
  item: any;
  index: number;
  isLast: boolean;
  isPlaying: boolean;
  setPlayedIndex: (val: number) => void;
  playedIndex: number;
}

const TutorialsSingleComponent = (props: Props) => {
  const [onLoadStart, setOnLoadStart] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);

  const makeEmbed = (str: string) => {
    if (str?.toLowerCase()?.includes('watch?v=')) {
      var NewText = str.replace('watch?v=', 'embed/');
      return NewText;
    } else {
      return str;
    }
  };
  let itemUrl = props.item?.url?.toLowerCase();
  const isFacebookUrl =
    itemUrl?.includes('fb') || itemUrl?.includes('facebook');
  const isYoutubeUrl = itemUrl?.includes('youtube');
  return (
    <View style={styles.parentContainer}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.titleText}>
          {CommonDataManager.getSharedInstance().capitalizeFirstLetter(
            props.item.title,
          )}
        </Text>
      </View>
      <View
        style={[
          styles.mainContainer,
          {
            marginBottom: props.isLast ? hv(50) : 0,
          },
        ]}>
        {props.isPlaying ? (
          !isFacebookUrl && !isYoutubeUrl ? (
            <Video
              source={{
                uri: props.item?.url,
              }}
              paused={!props.isPlaying}
              controls={false}
              style={styles.backgroundVideo}
              resizeMode="cover"
              ignoreSilentSwitch="ignore"
              onLoadStart={() => setOnLoadStart(true)}
              onLoad={() => {
                setOnLoadStart(false);
              }}
              onError={err => {
                setOnLoadStart(false);
                setIsVideoError(true);
                console.log('Video error ', err);
                props.setPlayedIndex(-1);
              }}
            />
          ) : (
            <View style={styles.backgroundVideo}>
              <WebView
                source={{
                  uri: isYoutubeUrl
                    ? makeEmbed(props.item?.url)
                    : props.item?.url,
                }}
                onLoadStart={() => setOnLoadStart(true)}
                onLoad={() => setOnLoadStart(false)}
                onError={err => {
                  setOnLoadStart(false);
                  setIsVideoError(true);
                  console.log('Video error ', err);
                  props.setPlayedIndex(-1);
                }}
                style={{
                  backgroundColor: AppColors.dark.darkLevel4,
                }}
              />
            </View>
          )
        ) : (
          <LoadingImage
            key={props.index}
            resizeMode="cover"
            uri={IMAGE_BASE_URL + props.item?.image}
            containerStyle={styles.backgroundVideo}
            imageStyle={{
              height: '100%',
              width: '100%',
            }}
          />
        )}

        {!props.isPlaying && (
          <TouchableWithoutFeedback
            disabled={isVideoError}
            onPress={() => {
              props.setPlayedIndex(
                props.playedIndex == props.index ? -1 : props.index,
              );
            }}>
            <View style={styles.absoluteBox}>
              {onLoadStart ? (
                <ActivityIndicator size="large" color={AppColors.white.white} />
              ) : isVideoError ? (
                <Image
                  source={AppImages.Tutorials.VideoError}
                  resizeMode="contain"
                  style={styles.videoError}
                />
              ) : !props.isPlaying ? (
                <Image
                  source={AppImages.Tutorials.playbutton}
                  resizeMode="contain"
                  style={styles.playBtn}
                />
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};
export default TutorialsSingleComponent;

const styles = StyleSheet.create({
  titleContainer: {
    borderBottomColor: AppColors.dark.darkLevel3,
    borderBottomWidth: 1,
    paddingBottom: hv(15),
    marginBottom: hv(15),
  },
  titleText: {
    ...AppStyles.textSemiBold,
    fontSize: normalized(16),
    color: AppColors.white.white,
    marginLeft: normalized(5),
  },
  parentContainer: {
    marginTop: normalized(15),
  },
  mainContainer: {
    backgroundColor: AppColors.dark.darkLevel4,
    height: normalized(190),
    overflow: 'hidden',
    ...AppStyles.shadowCommon,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.dark.darkLevel3,
  },
  backgroundVideo: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    ...AppStyles.shadowCommon,
    backgroundColor: AppColors.dark.darkLevel4,
  },
  absoluteBox: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  playBtn: {
    width: normalized(40),
    height: normalized(40),
  },
  videoError: {
    width: normalized(45),
    height: normalized(45),
    tintColor: AppColors.white.white,
  },
});
