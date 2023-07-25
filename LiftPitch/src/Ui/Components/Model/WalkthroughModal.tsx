import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import WebView from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {getTutorialsListRequest} from '../../../Network/Services/SettingServices';
import {IMAGE_BASE_URL} from '../../../Network/Urls';
import {setAlertObj, setLoader} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import {AppStrings} from '../../../Utils/Strings';
import LoadingImage from '../LoadingImage/LoadingImage';

interface Props {
  onClose: () => void;
}

const WalkthroughModal = (props: Props) => {
  const dispatch = useDispatch();
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [videoObj, setVideoObj] = useState<any>();
  const [onLoadStart, setOnLoadStart] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const makeEmbed = (str: string) => {
    if (str?.toLowerCase()?.includes('watch?v=')) {
      var NewText = str.replace('watch?v=', 'embed/');
      return NewText;
    } else {
      return str;
    }
  };

  useEffect(() => {
    fetchTutorialsList();
  }, []);

  const fetchTutorialsList = async () => {
    dispatch(setLoader(true));
    const res = await getTutorialsListRequest(isNetConnected).finally(() => {
      dispatch(setLoader(false));
      setIsApiCalled(true);
    });
    if (res.success) {
      if (res.data?.length > 0) {
        setVideoObj(res.data[0]);
      } else {
        props.onClose();
      }
    } else {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: res?.message,
        }),
      );
    }
  };

  let itemUrl = videoObj?.url?.toLowerCase();
  const isFacebookUrl =
    itemUrl?.includes('fb') || itemUrl?.includes('facebook');
  const isYoutubeUrl = itemUrl?.includes('youtube');

  const headerName = videoObj?.title ? videoObj.title : 'Walkthrough';
  const [showThumbnail, setShowThumbnail] = useState(true);

  return isApiCalled ? (
    <Modal animationType="slide" transparent onRequestClose={props.onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: AppColors.transparentColor,
        }}>
        <StatusBar backgroundColor={AppColors.transparentColor} />
        <View style={styles.subContainer}>
          <View style={styles.headerSection}>
            <View
              style={{
                width: normalized(40),
              }}
            />
            <Text numberOfLines={1} style={styles.titleText}>
              {headerName}
            </Text>
            <TouchableWithoutFeedback onPress={props.onClose}>
              <View style={styles.crossView}>
                <Image
                  source={AppImages.Cards.CrossIcon}
                  resizeMode="contain"
                  style={styles.crossImg}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {videoObj ? (
            <View style={styles.mainContainer}>
              {isPlaying || !showThumbnail ? (
                !isFacebookUrl && !isYoutubeUrl ? (
                  <Video
                    source={{
                      uri: videoObj?.url,
                    }}
                    paused={!isPlaying}
                    controls={true}
                    style={styles.backgroundVideo}
                    resizeMode="cover"
                    ignoreSilentSwitch="ignore"
                    onLoadStart={() => {
                      setOnLoadStart(true);
                    }}
                    onLoad={() => {
                      setOnLoadStart(false);
                    }}
                    onError={err => {
                      setOnLoadStart(false);
                      setIsVideoError(true);
                      setIsPlaying(false);
                    }}
                    fullscreen={true}
                  />
                ) : (
                  <View style={styles.backgroundVideo}>
                    <WebView
                      source={{
                        uri: isYoutubeUrl
                          ? makeEmbed(videoObj?.url)
                          : videoObj?.url,
                      }}
                      onLoadStart={() => setOnLoadStart(true)}
                      onLoad={() => setOnLoadStart(false)}
                      onError={err => {
                        setOnLoadStart(false);
                        setIsVideoError(true);
                        console.log('Video error ', err);
                        setIsPlaying(false);
                      }}
                      startInLoadingState={true}
                      style={{
                        backgroundColor: AppColors.dark.darkLevel4,
                      }}
                    />
                  </View>
                )
              ) : (
                <LoadingImage
                  resizeMode="cover"
                  uri={IMAGE_BASE_URL + videoObj?.image}
                  containerStyle={styles.backgroundVideo}
                  imageStyle={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              )}
              {showThumbnail || onLoadStart || isVideoError ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setIsPlaying(!isPlaying);
                    setShowThumbnail(false);
                  }}>
                  <View style={styles.absoluteBox}>
                    {onLoadStart ? (
                      <ActivityIndicator
                        size="large"
                        color={AppColors.white.white}
                      />
                    ) : isVideoError ? (
                      <Image
                        source={AppImages.Tutorials.VideoError}
                        resizeMode="contain"
                        style={styles.videoError}
                      />
                    ) : !isPlaying ? (
                      <Image
                        source={AppImages.Tutorials.playbutton}
                        resizeMode="contain"
                        style={styles.playBtn}
                      />
                    ) : null}
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
            </View>
          ) : (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>No video found.</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  ) : null;
};

export default WalkthroughModal;

const styles = StyleSheet.create({
  subContainer: {
    paddingVertical: hv(20),
  },
  mainContainer: {
    backgroundColor: AppColors.dark.darkLevel4,
    height: normalized(280),
    overflow: 'hidden',
    ...AppStyles.shadowCommon,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.dark.darkLevel3,
  },
  headerSection: {
    height: 60,
    backgroundColor: AppColors.white.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...AppStyles.shadowCommon,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.dark.darkLevel3,
    borderBottomWidth: 0,
  },
  backgroundVideo: {
    height: '100%',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    ...AppStyles.shadowCommon,
    backgroundColor: AppColors.dark.darkLevel4,
    alignSelf: 'center',
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
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...AppStyles.textRegular,
    fontSize: normalized(16),
    color: AppColors.dark.darkLevel1,
  },
  crossView: {
    height: normalized(40),
    width: normalized(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: normalized(5),
  },
  crossImg: {
    height: normalized(22),
    width: normalized(22),
  },
  titleText: {
    ...AppStyles.textSemiBold,
    color: AppColors.black.black,
    fontSize: normalized(18),
    maxWidth: '70%',
  },
});
