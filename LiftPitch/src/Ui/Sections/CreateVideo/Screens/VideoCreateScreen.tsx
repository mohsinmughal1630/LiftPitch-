import React, {useEffect, useRef, useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsAlertShow,
  setIsLoader,
} from '../../../../Redux/reducers/AppReducer';
import ThreadManager from '../../../../ChatModule/ThreadManger';
import {createThumbnail} from 'react-native-create-thumbnail';
import VideoCreateHeader from '../Components/VideoCreateHeader';
import {getVideoCreateObj} from '../../../../Utils/Helper';

const VideoCreateScreen = (props: ScreenProps) => {
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const dispatch = useDispatch();
  const cameraRef = useRef<any>({});
  const [isStartRecording, setIsStartRecording] = useState(false);
  const devices: any = useCameraDevices();
  const [deviceDir, setDeviceDir] = useState('back');
  const device = devices[deviceDir];
  const [flashMode, setFlashMode] = useState('off');

  useEffect(() => {
    getpermissions();
  }, []);
  const getpermissions = async () => {
    let cameraPermission: any = '';
    let microphonePermission: any = '';
    if (cameraPermission == '' || microphonePermission == '') {
      cameraPermission = await Camera.getCameraPermissionStatus();
      microphonePermission = await Camera.getMicrophonePermissionStatus();
      console.log(
        'cameraPermission------->',
        cameraPermission,
        '------',
        microphonePermission,
      );

      if (cameraPermission == 'not-determined') {
        cameraPermission = await Camera.requestCameraPermission();
      }
      if (microphonePermission == 'not-determined') {
        microphonePermission = await Camera.requestMicrophonePermission();
      }
    }
    console.log('cameraPermission------.', cameraPermission);
    console.log('microphonePermission------.', microphonePermission);
    if (
      cameraPermission != 'authorized' ||
      microphonePermission != 'authorized'
    ) {
      Linking.openSettings();
    }
  };

  //// pick Video from Gallery====>
  const mediaSelection = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'video',
      compressImageQuality: 0.5,
    }).then(images => {
      dispatch(setIsLoader(true));
      let video = false;
      video = images.mime.toLocaleLowerCase().includes('video');
      ThreadManager.instance.uploadMedia(images.path, video, (url: any) => {
        if (url != 'error') {
          let params: any = {};
          if (video && url) {
            createThumbnail({
              url: url,
              timeStamp: 10000,
            })
              .then(async response => {
                params['videoUrl'] = url;
                await uploadThumnail(response.path, params);
              })
              .catch(err => {
                dispatch(setIsLoader(false));
                console.log('printImgErr ', err);
              });
          }
        } else {
          dispatch(setIsLoader(false));
          Alert.alert('', 'Error while uploading media');
        }
      });
    });
  };
  const uploadThumnail = async (path: any, payload: any) => {
    let obj = {...payload};
    await ThreadManager.instance
      .uploadMedia(path, false, async (url: any) => {
        console.log('url------>', url);
        if (url !== 'error') {
          let userData = getVideoCreateObj(selector?.userData);
          console.log('userData------->', userData);
          let postId = ThreadManager.instance.makeid(8);
          obj['videoId'] = postId;
          obj['thumbnail'] = url;
          obj['like'] = [];
          obj['comments'] = [];
          obj['creatorData'] = userData;
          dispatch(setIsLoader(false));
          console.log('video final Obj---------->', obj);
          await ThreadManager.instance.createPost(obj, (response: any) => {
            dispatch(setIsAlertShow({value: true, message: response}));
          });
        } else {
          dispatch(setIsLoader(false));
          Alert.alert('', 'Error while uploading media');
        }
      })
      .catch(() => {
        dispatch(setIsLoader(false));
        Alert.alert('', 'Error while uploading media');
      });
  };

  /////------------------------->

  ////Capture from Camera========>
  const handleStartRecordVideo = async () => {
    try {
      cameraRef?.current?.startRecording({
        flash: flashMode,
        onRecordingFinished: (video: any) => {
          dispatch(setIsLoader(true));
          ThreadManager.instance.uploadMedia(video.path, true, (url: any) => {
            if (url != 'error') {
              let params: any = {};
              if (url) {
                createThumbnail({
                  url: url,
                  timeStamp: 10000,
                })
                  .then(async response => {
                    params['videoUrl'] = url;
                    await uploadThumnail(response.path, params);
                  })
                  .catch(err => {
                    dispatch(setIsLoader(false));
                    console.log('printImgErr ', err);
                  });
              }
            } else {
              dispatch(setIsLoader(false));
              Alert.alert('', 'Error while uploading media');
            }
          });
        },
        onRecordingError: (error: any) => {
          console.error('onRecordingError======>', error);
        },
      });
    } catch (error) {
      console.log('error in start Record Video------->');
    }
  };
  const handleStopRecordedVideo = async () => {
    try {
      await cameraRef?.current?.stopRecording();
    } catch (error) {
      console.log('error------->', error);
    }
  };
  //---------------------------->

  return (
    <View style={AppStyles.MainStyle}>
      {device != null ? (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
          <VideoCreateHeader
            cameraStatus={deviceDir}
            switchCamera={(val: any) => {
              setDeviceDir(val);
            }}
          />
          <ScrollView
            contentContainerStyle={styles.containerStyle}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.flashCont}
              onPress={() => {
                setFlashMode(flashMode == 'on' ? 'off' : 'on');
              }}>
              <>
                <Image
                  source={AppImages.createVideo.flash}
                  style={{alignSelf: 'center'}}
                />
                <Text style={styles.flashTxt}>
                  {flashMode == 'on' ? 'ON' : 'OFF'}
                </Text>
              </>
            </TouchableOpacity>

            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              video={true}
              audio={true} // <-- optional
              preset="medium"
              zoom={device.neutralZoom}
            />

            <View style={styles.bottomCont}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setIsAlertShow({value: true, message: 'Pending....'}),
                  );
                }}>
                <>
                  <Image source={AppImages.createVideo.smileIcon} />
                  <Text style={styles.simpleDesTxt}>Pitch Ideas</Text>
                </>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{}}
                onPress={() => {
                  if (!isStartRecording) {
                    handleStartRecordVideo();
                  } else {
                    handleStopRecordedVideo();
                  }
                  setIsStartRecording(!isStartRecording);
                }}>
                {isStartRecording ? (
                  <View style={styles.startRecordParentCont}>
                    <View style={styles.startRecordChildCont} />
                  </View>
                ) : (
                  <View style={styles.stopRecordCont} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  mediaSelection();
                }}>
                <>
                  <Image source={AppImages.createVideo.galleryIcon} />
                  <Text style={styles.simpleDesTxt}>Upload</Text>
                </>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.emptyCont}>
          <Text
            style={styles.permissionBtn}
            onPress={() => {
              Linking.openSettings();
            }}>
            for allow permission click
          </Text>
          <ActivityIndicator size="large" color={AppColors.red.mainColor} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    flex: 1,
  },
  dummyTxt: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.red.mainColor,
  },
  flashCont: {
    position: 'absolute',
    top: normalized(90),
    zIndex: 100,
    right: AppHorizontalMargin,
  },
  flashTxt: {
    alignSelf: 'center',
    fontSize: normalized(10),
    fontWeight: '600',
    color: AppColors.white.white,
    marginTop: normalized(3),
  },
  bottomCont: {
    height: normalized(70),
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppHorizontalMargin,
    marginVertical: AppHorizontalMargin,
  },
  simpleDesTxt: {
    fontSize: normalized(10),
    fontWeight: '400',
    color: AppColors.white.white,
  },
  startRecordParentCont: {
    height: normalized(50),
    width: normalized(50),
    borderRadius: normalized(50 / 2),
    borderWidth: normalized(5),
    borderColor: AppColors.red.lightRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startRecordChildCont: {
    backgroundColor: AppColors.red.darkRed,
    height: normalized(20),
    width: normalized(20),
    borderRadius: normalized(5),
  },
  stopRecordCont: {
    backgroundColor: AppColors.red.darkRed,
    height: normalized(50),
    width: normalized(50),
    borderRadius: normalized(50 / 2),
    borderWidth: normalized(5),
    borderColor: AppColors.red.lightRed,
  },
  permissionBtn: {
    color: AppColors.red.mainColor,
    fontSize: normalized(12),
    fontWeight: '400',
    marginVertical: normalized(10),
  },
  emptyCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default VideoCreateScreen;
