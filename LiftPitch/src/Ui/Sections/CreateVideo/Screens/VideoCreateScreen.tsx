import React, {useEffect, useRef, useState} from 'react';
import {
  AppColors,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useCameraDevices,
  Camera,
  parsePhysicalDeviceTypes,
  useFrameProcessor,
} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsAlertShow,
  setIsLoader,
} from '../../../../Redux/reducers/AppReducer';
import ThreadManager from '../../../../ChatModule/ThreadManger';
import {createThumbnail} from 'react-native-create-thumbnail';
import CustomFilledBtn from '../../../Components/CustomButtom/CustomButton';

const VideoCreateScreen = (props: ScreenProps) => {
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const [videoPath, setVideoPath] = useState('');
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    console.log('frame------>', frame);
  }, []);
  useEffect(() => {
    getpermissions();
  }, []);
  const getpermissions = async () => {
    let cameraPermission: any = '';
    let microphonePermission: any = '';
    if (cameraPermission == '' || microphonePermission == '') {
      cameraPermission = await Camera.getCameraPermissionStatus();
      microphonePermission = await Camera.getMicrophonePermissionStatus();
      const devicess = await Camera.getAvailableCameraDevices();
      console.log('devicess------>', devicess);
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
  const devices = useCameraDevices();
  const device = devices.back;
  console.log('device------>', devices, '====', device);

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
    await ThreadManager.instance.uploadMedia(path, false, async (url: any) => {
      if (url !== 'error') {
        let userData = selector?.userData;
        if (userData?.password) {
          delete userData?.password;
        }
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
    });
  };

  /////------------------------->

  ////Capture from Camera========>
  const handleStartRecordVideo = async () => {
    try {
      cameraRef?.current?.startRecording({
        flash: 'on',
        onRecordingFinished: (video: any) => {
          console.log('video------>', video);
          setVideoPath(video?.path);
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
      <SafeAreaView />
      <CustomHeader title={'Video Create Screen'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <ScrollView
          contentContainerStyle={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          {device != null ? (
            //please design this Components
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              video={true}
              audio={true} // <-- optional
              preset="medium"
              zoom={device.neutralZoom}
            />
          ) : (
            <ActivityIndicator size="large" color={AppColors.red.mainColor} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginHorizontal: AppHorizontalMargin,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyTxt: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.red.mainColor,
  },
});
export default VideoCreateScreen;
