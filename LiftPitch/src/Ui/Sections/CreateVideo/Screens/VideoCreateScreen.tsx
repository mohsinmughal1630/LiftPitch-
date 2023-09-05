import React, { useEffect, useRef, useState } from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import VideoCreateHeader from '../Components/VideoCreateHeader';
import Permissions, {
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import ConfirmationModal from '../../../Components/CustomModal/ConfirmationModal';
import VideoRecorderBtn from '../Components/VideoRecorderBtn';
import VideoTimerPickerPopup from '../Components/VideoTimerPickerPopup';
import { Routes } from '../../../../Utils/Routes';
import VideoSpeedPickerPopup from '../Components/VideoSpeedPickerPopup';
import RecordingTypeToggle from '../Components/RecordingTypeToggle';
import CountDownTimer from '../Components/CountDownTimer';
import { useDispatch } from 'react-redux';
import { setTab } from '../../../../Redux/reducers/AppReducer';

const VideoCreateScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const cameraRef = useRef<any>({});
  const devices: any = useCameraDevices();
  const [deviceDir, setDeviceDir] = useState('back');
  const device = devices[deviceDir];
  const [flashMode, setFlashMode] = useState('off');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedPitchObj, setSelectedPitchObj] = useState(null);
  const [showTimerPopup, setShowTimerPopup] = useState(false);
  const [timerValue, setTimerValue] = useState<number>(0);

  const [showSpeedPopup, setShowSpeedPopup] = useState(false);
  const [speedValue, setSpeedValue] = useState<number>(1);
  const [recordingTypeIndex, setRecordingTypeIndex] = useState(0);
  const [isVideoRecording, setIsVideoRecording] = useState(false);

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const Result = await Permissions.requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]);
    const cameraResult = Result[PERMISSIONS.ANDROID.CAMERA];
    const audioResult = Result[PERMISSIONS.ANDROID.RECORD_AUDIO];
    if (cameraResult == RESULTS.BLOCKED || audioResult == RESULTS.BLOCKED) {
      setShowConfirmationModal(true);
    }
  };

  //// pick Video from Gallery====>
  const mediaSelection = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: recordingTypeIndex == 0 ? 'photo' : 'video',
      compressImageQuality: 0.5,
      durationLimit: 30,
    })
      .then(images => {
        props.navigation.push(Routes.addVideoTab.uploadMediaPreviewScreen, {
          mediaPath: images?.path,
          selectedPitch: selectedPitchObj,
        });
      })
      .catch(e => console.log('Err ', e));
  };

  ////Capture from Camera========>
  const handleStartRecordVideo = async () => {
    try {
      setIsVideoRecording(true);
      cameraRef?.current?.startRecording({
        flash: flashMode,
        onRecordingFinished: async (video: any) => {
          props.navigation.push(Routes.addVideoTab.uploadMediaPreviewScreen, {
            mediaPath: video?.path,
            selectedPitch: selectedPitchObj,
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
    } finally {
      setIsVideoRecording(false);
    }
  };

  const onImageClick = async () => {
    try {
      const photo = await cameraRef.current.takePhoto({
        flash: flashMode,
      });
      if (photo?.path) {
        props.navigation.push(Routes.addVideoTab.uploadMediaPreviewScreen, {
          mediaPath: photo?.path,
          selectedPitch: selectedPitchObj,
        });
      }
    } catch (e) {
      console.log('Image click error ', e);
    }
  };
  const [startInterval, setStartInterval] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    var timerInterval: any;
    if (startInterval) {
      timerInterval = setInterval(() => {
        if (countdown > 0) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setCountdown(countdown - 1);
        } else {
          if (recordingTypeIndex == 0) {
            onImageClick();
          } else {
            handleStartRecordVideo();
          }
          clearInterval(timerInterval);
          setStartInterval(false);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [countdown, startInterval]);

  return (
    <View style={AppStyles.MainStyle}>
      {/* {device != null ? ( */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <VideoCreateHeader
          cameraStatus={deviceDir}
          switchCamera={(val: any) => {
            setFlashMode('off');
            setDeviceDir(val);
          }}
          onClose={() => {
            dispatch(setTab(0));
            props.navigation.goBack();
          }}
          isVideoRecording={isVideoRecording}
        />
        <ScrollView
          contentContainerStyle={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          {countdown > 0 && <CountDownTimer counterValue={countdown} />}
          {!isVideoRecording && (
            <TouchableOpacity
              style={styles.flashCont}
              disabled={deviceDir !== 'back'}
              onPress={() => {
                setFlashMode(flashMode == 'on' ? 'off' : 'on');
              }}>
              <>
                <Image
                  source={
                    AppImages.createVideo[
                    flashMode == 'on' ? 'flashOn' : 'flash'
                    ]
                  }
                  style={{
                    alignSelf: 'center',
                    height: 20,
                    width: 20,
                    tintColor:
                      flashMode == 'on' ? AppColors.red.darkRed : 'white',
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={[
                    styles.flashTxt,
                    {
                      color:
                        flashMode == 'on'
                          ? AppColors.red.darkRed
                          : AppColors.white.white,
                    },
                  ]}>
                  {flashMode == 'on' ? 'ON' : 'OFF'}
                </Text>
              </>
            </TouchableOpacity>
          )}
          {!isVideoRecording && (
            <TouchableOpacity
              style={[styles.flashCont, { top: normalized(150) }]}
              onPress={() => {
                setShowTimerPopup(true);
              }}>
              <>
                <Image
                  source={AppImages.createVideo.TimerIcon}
                  style={[
                    { alignSelf: 'center' },
                    timerValue !== 0 && { tintColor: AppColors.red.darkRed },
                  ]}
                />
                <Text
                  style={[
                    styles.flashTxt,
                    timerValue !== 0 && { color: AppColors.red.darkRed },
                  ]}>
                  {timerValue == 0 ? 'OFF' : `${timerValue} S`}
                </Text>
              </>
            </TouchableOpacity>
          )}

          {showTimerPopup && (
            <VideoTimerPickerPopup
              currentTimer={timerValue}
              onSelectTimer={setTimerValue}
              onClose={() => setShowTimerPopup(false)}
            />
          )}

          {/* {recordingTypeIndex == 1 && !isVideoRecording && (
            <TouchableOpacity
              style={[styles.flashCont, { top: normalized(210) }]}
              onPress={() => {
                setShowSpeedPopup(true);
              }}>
              <>
                <Image
                  source={AppImages.createVideo.SpeedIcon}
                  style={[
                    { alignSelf: 'center' },
                    speedValue !== 1 && { tintColor: AppColors.red.darkRed },
                  ]}
                />
                <Text
                  style={[
                    styles.flashTxt,
                    speedValue !== 1 && { color: AppColors.red.darkRed },
                  ]}>
                  {speedValue == 1 ? 'OFF' : `${speedValue} X`}
                </Text>
              </>
            </TouchableOpacity>
          )} */}

          {showSpeedPopup && (
            <VideoSpeedPickerPopup
              currentSpeed={speedValue}
              onSelectSpeed={setSpeedValue}
              onClose={() => setShowSpeedPopup(false)}
            />
          )}

          {device && (
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              photo={recordingTypeIndex == 0}
              video={recordingTypeIndex == 1}
              audio={recordingTypeIndex == 1}
              preset="medium"
              zoom={device?.neutralZoom}
            />
          )}

          <View style={styles.bottomCont}>
            <TouchableOpacity
              onPress={() => {
                props?.navigation?.navigate(
                  Routes.addVideoTab.pitchListScreen,
                  {
                    atBack: (val: any) => {
                      setSelectedPitchObj(val);
                    },
                    from: Routes.addVideoTab.createVideoScreen,
                  },
                );
              }}>
              <View style={styles.singleBottomEndBox}>
                <Image
                  source={
                    selectedPitchObj
                      ? AppImages.createVideo.doneIcon
                      : AppImages.createVideo.smileIcon
                  }
                  style={{ height: normalized(30), width: normalized(30) }}
                />
                <Text style={styles.simpleDesTxt}>Pitch Ideas</Text>
              </View>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <RecordingTypeToggle
                recordingType={recordingTypeIndex}
                onRecordingTypeChage={setRecordingTypeIndex}
                disabled={isVideoRecording}
              />
              <VideoRecorderBtn
                isImage={recordingTypeIndex == 0}
                onImageClick={() => {
                  if (timerValue > 0) {
                    setCountdown(timerValue);
                    setStartInterval(true);
                  } else {
                    onImageClick();
                  }
                }}
                onVideRecordingStart={() => {
                  if (timerValue > 0) {
                    setCountdown(timerValue);
                    setStartInterval(true);
                  } else {
                    handleStartRecordVideo();
                  }
                }}
                onVideoRecordingEnd={handleStopRecordedVideo}
                isVideoRecording={isVideoRecording}
              />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                mediaSelection();
              }}>
              <View style={styles.singleBottomEndBox}>
                <Image source={AppImages.createVideo.galleryIcon} />
                <Text style={styles.simpleDesTxt}>Upload</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {showConfirmationModal && (
        <ConfirmationModal
          content={
            'You need to enable camera and voice permissions first. Do you want to enable them from settings now?'
          }
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={() => {
            setShowConfirmationModal(false);
            openSettings().catch(e => console.log('some problem ', e));
          }}
        />
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
    ...AppStyles.textMedium,
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
    ...AppStyles.textMedium,
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
    alignItems: 'flex-end',
    paddingHorizontal: AppHorizontalMargin,
    marginVertical: AppHorizontalMargin,
  },
  singleBottomEndBox: {
    alignItems: 'center',
    width: normalized(60),
  },
  simpleDesTxt: {
    fontSize: normalized(10),
    ...AppStyles.textRegular,
    color: AppColors.white.white,
  },
  permissionBtn: {
    color: AppColors.red.mainColor,
    fontSize: normalized(12),
    ...AppStyles.textRegular,
    marginVertical: normalized(10),
  },
  emptyCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default VideoCreateScreen;
