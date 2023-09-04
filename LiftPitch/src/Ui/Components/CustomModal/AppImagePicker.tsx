import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import {
  AppColors,
  ScreenSize,
  hv,
  imagePickerConstants,
  isSmallDevice,
  maxImageSizeInBytes,
  normalized,
} from '../../../Utils/AppConstants';
import { AppStrings } from '../../../Utils/Strings';
import { uploadMedia } from '../../../Network/Services/GeneralServices';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { setIsAlertShow } from '../../../Redux/reducers/AppReducer';
import { AppStyles } from '../../../Utils/AppStyles';

interface Props {
  onClose: () => void;
  onImageSelect: (url: string | null) => void;
  // onMultipleImagesSelect?: (obj: any) => any;
  // selectedLimit?: number
}

const AppImagePicker = (props: Props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const pickImage = async (index: number) => {
    if (index == 1) {
      const requestResult = await request(
        Platform.OS == 'android'
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.PHOTO_LIBRARY,
      );
    }
    try {
      if (index == 0) {
        await launchImageLibrary({
          mediaType: 'photo',
          quality: 0.5,
        }).then((result: any) => {
          if (result.assets) {
            if (result.assets[0].fileSize > maxImageSizeInBytes) {
              dispatch(
                setIsAlertShow({
                  value: true,
                  message: AppStrings.Validation.maxImageSizeError,
                }),
              );
              return;
            }
            props?.onImageSelect(result?.assets[0]?.uri);
          }
        });
      } else {
        setTimeout(async () => {
          await launchCamera({
            mediaType: 'photo',
            quality: 0.5,
          }).then((result: any) => {
            if (result.assets) {
              if (result.assets[0].fileSize > maxImageSizeInBytes) {
                dispatch(
                  setIsAlertShow({
                    value: true,
                    message: AppStrings.Validation.maxImageSizeError,
                  }),
                );
                return;
              }
              props?.onImageSelect(result?.assets[0]?.uri);
            }
          });
        }, 500);
      }
    } catch (e) {
      console.log('Pick Image err ', e);
    }
  };

  return (
    <Modal transparent animationType="slide" onRequestClose={props.onClose}>
      <View style={styles.outerContainer}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={AppColors.black.black}
        />
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={styles.transparentBg} />
        </TouchableWithoutFeedback>
        <View style={styles.mainContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headingText}>Upload Image</Text>
            {/* <TouchableWithoutFeedback onPress={props.onClose}>
              <View style={styles.crossView}>
                <Image
                  source={AppImages.memberSec.cross}
                  resizeMode="contain"
                  style={styles.crossImg}
                />
              </View>
            </TouchableWithoutFeedback> */}
          </View>
          <View style={styles.pickersContainer}>
            {isLoading ? (
              <LoadingLine />
            ) : (
              imagePickerConstants.map((item, index) => (
                <TouchableOpacity
                  onPress={() => pickImage(index)}
                  key={index}
                  activeOpacity={1}
                  style={styles.singlePicker}>
                  <Image
                    source={item.image}
                    style={styles.pickerImg}
                    resizeMode="contain"
                  />
                  <Text style={styles.pickerText}>{item.text}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppImagePicker;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  transparentBg: {
    backgroundColor: AppColors.black.shadow,
    ...StyleSheet.absoluteFillObject,
  },
  mainContainer: {
    height: isSmallDevice ? '35%' : '30%',
    backgroundColor: AppColors.white.white,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: hv(5),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: normalized(40),
  },
  headingText: {
    fontSize: normalized(16),
    color: AppColors.black.black,
    ...AppStyles.textMedium
  },
  crossView: {
    height: normalized(40),
    width: normalized(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: normalized(5),
    position: 'absolute',
    right: 0,
  },
  crossImg: {
    height: normalized(14),
    width: normalized(14),
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: ScreenSize.height < 680 ? hv(200) : hv(170),
    marginTop: isSmallDevice ? hv(50) : hv(30),
    alignSelf: 'center',
  },
  singlePicker: {
    borderRadius: 15,
    width: '45%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalized(20),
    borderWidth: 3,
    borderColor: AppColors.grey.midGray,
    borderStyle: 'dashed',
  },
  pickerImg: {
    width: normalized(30),
    height: normalized(30),
  },
  pickerText: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    marginTop: hv(10),
    textAlign: 'center',
    ...AppStyles.textRegular
  },
});

const lineFullWidth = ScreenSize.width - 85;
const innerLineWidth = normalized(100);

const LoadingLine = () => {
  const offsetX = useSharedValue(0);
  useEffect(() => {
    offsetX.value = withRepeat(
      withTiming(lineFullWidth - innerLineWidth, { duration: 1000 }),
      -1,
      true,
    );
    return () => {
      offsetX.value = 0;
    };
  }, []);
  const lineStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.value,
        },
      ],
    };
  });
  return (
    <View
      style={{
        height: 100,
        width: lineFullWidth,
        justifyContent: 'center',
      }}>
      <Animated.View
        style={[
          {
            height: 7,
            backgroundColor: AppColors.primaryPurple,
            width: innerLineWidth,
            borderRadius: 20,
          },
          lineStyles,
        ]}
      />
    </View>
  );
};
