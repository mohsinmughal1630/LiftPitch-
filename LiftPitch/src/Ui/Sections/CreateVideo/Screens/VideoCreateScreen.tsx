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
  TouchableWithoutFeedback,
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
import Permissions, {
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import ConfirmationModal from '../../../Components/CustomModal/ConfirmationModal';
import VideoRecorderBtn from '../Components/VideoRecorderBtn';
import VideoTimerPickerPopup from '../Components/VideoTimerPickerPopup';
import {Routes} from '../../../../Utils/Routes';
import VideoSpeedPickerPopup from '../Components/VideoSpeedPickerPopup';
import CustomFilledBtn from '../../../Components/CustomButtom/CustomButton';

const VideoCreateScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const cameraRef = useRef<any>({});
  const devices: any = useCameraDevices();
  const [deviceDir, setDeviceDir] = useState('back');
  const device = devices[deviceDir];
  const [flashMode, setFlashMode] = useState('off');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [showTimerPopup, setShowTimerPopup] = useState(false);
  const [timerValue, setTimerValue] = useState<number>(0);

  const [showSpeedPopup, setShowSpeedPopup] = useState(false);
  const [speedValue, setSpeedValue] = useState<number>(1);

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
      mediaType: 'video',
      compressImageQuality: 0.5,
    })
      .then(images => {
        let video = false;
        video = images.mime.toLocaleLowerCase().includes('video');
        if (video) {
          props.navigation.push(Routes.addVideoTab.uploadMediaPreviewScreen, {
            mediaType: 'video',
            mediaPath: images?.path,
          });
        }
      })
      .catch(e => console.log('Err ', e));
  };

  /////------------------------->

  ////Capture from Camera========>
  const handleStartRecordVideo = async () => {
    try {
      cameraRef?.current?.startRecording({
        flash: flashMode,
        onRecordingFinished: (video: any) => {
          props.navigation.push(Routes.addVideoTab.uploadMediaPreviewScreen, {
            mediaType: 'video',
            mediaPath: video?.path,
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
            onClose={() => {
              props.navigation.goBack();
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
            <TouchableOpacity
              style={[styles.flashCont, {top: normalized(150)}]}
              onPress={() => {
                setShowTimerPopup(true);
              }}>
              <>
                <Image
                  source={AppImages.createVideo.TimerIcon}
                  style={[
                    {alignSelf: 'center'},
                    timerValue !== 0 && {tintColor: AppColors.red.darkRed},
                  ]}
                />
                <Text
                  style={[
                    styles.flashTxt,
                    timerValue !== 0 && {color: AppColors.red.darkRed},
                  ]}>
                  {timerValue == 0 ? 'OFF' : `${timerValue} S`}
                </Text>
              </>
            </TouchableOpacity>

            {showTimerPopup && (
              <VideoTimerPickerPopup
                currentTimer={timerValue}
                onSelectTimer={setTimerValue}
                onClose={() => setShowTimerPopup(false)}
              />
            )}

            <TouchableOpacity
              style={[styles.flashCont, {top: normalized(210)}]}
              onPress={() => {
                setShowSpeedPopup(true);
              }}>
              <>
                <Image
                  source={AppImages.createVideo.SpeedIcon}
                  style={[
                    {alignSelf: 'center'},
                    speedValue !== 1 && {tintColor: AppColors.red.darkRed},
                  ]}
                />
                <Text
                  style={[
                    styles.flashTxt,
                    speedValue !== 1 && {color: AppColors.red.darkRed},
                  ]}>
                  {speedValue == 1 ? 'OFF' : `${speedValue} X`}
                </Text>
              </>
            </TouchableOpacity>

            {showSpeedPopup && (
              <VideoSpeedPickerPopup
                currentSpeed={speedValue}
                onSelectSpeed={setSpeedValue}
                onClose={() => setShowSpeedPopup(false)}
              />
            )}

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
            {/* <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'black' }]} /> */}

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
              <VideoRecorderBtn
                onImageClick={() => {
                  // console.log('Image should be taked from this')
                }}
                onVideRecordingStart={handleStartRecordVideo}
                onVideoRecordingEnd={handleStopRecordedVideo}
              />
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
