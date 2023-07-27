import React from 'react';
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
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker, {openCamera} from 'react-native-image-crop-picker';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
  imagePickerConstants,
  ScreenSize,
  isSmallDevice,
  maxImageSizeInBytes,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import {request, PERMISSIONS, openSettings} from 'react-native-permissions';
import {useDispatch} from 'react-redux';
import {setAlertObj} from '../../../Redux/reducers/AppReducer';
import {AppStrings} from '../../../Utils/Strings';

interface Props {
  onClose: () => void;
  onImagesSelect: (obj: any) => any;
  quality?: any; // 0.1 to 1
  cropping?: boolean;
}

const AppImagePicker = (props: Props) => {
  const dispatch = useDispatch();
  const pickImage = async (index: number) => {
    if (index == 1) {
      const requestResult = await request(
        Platform.OS == 'android'
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.PHOTO_LIBRARY,
      );
    }
    props.onClose();
    try {
      if (index == 0) {
        if (props.cropping) {
          const time = Platform.OS == 'android' ? 50 : 1000;
          setTimeout(() => {
            ImagePicker.openPicker({
              width: ScreenSize.width,
              height: ScreenSize.width,
              mediaType: 'photo',
              compressImageQuality: props.quality ? props.quality : 0.7,
              cropping: true,
            })
              .then(result => {
                props.onImagesSelect([
                  {
                    fileName: result.path.substring(
                      result.path.lastIndexOf('/') + 1,
                    ),
                    uri: result.path,
                    type: result.mime,
                  },
                ]);
              })
              .catch(e => console.log('Crop from gallery error ', e));
          }, time);
        } else {
          await launchImageLibrary({
            mediaType: 'photo',
            quality: props.quality ? props.quality : 0.7,
          }).then((result: any) => {
            if (result.assets) {
              if (result.assets[0].fileSize > maxImageSizeInBytes) {
                dispatch(
                  setAlertObj({
                    title: AppStrings.Network.errorTitle,
                    message: AppStrings.Validation.maxImageSizeError,
                  }),
                );
                return;
              }
              props.onImagesSelect(result.assets);
            }
          });
        }
      } else {
        setTimeout(async () => {
          if (props.cropping) {
            await ImagePicker.openCamera({
              width: ScreenSize.width,
              height: ScreenSize.width,
              mediaType: 'photo',
              compressImageQuality: props.quality ? props.quality : 0.7,
              cropping: true,
            })
              .then(result => {
                props.onImagesSelect([
                  {
                    fileName: result.path.substring(
                      result.path.lastIndexOf('/') + 1,
                    ),
                    uri: result.path,
                    type: result.mime,
                  },
                ]);
              })
              .catch(e => console.log('Crop from gallery error ', e));
          } else {
            await launchCamera({
              mediaType: 'photo',
              quality: props.quality ? props.quality : 0.7,
            }).then((result: any) => {
              if (result.assets) {
                if (result.assets[0].fileSize > maxImageSizeInBytes) {
                  dispatch(
                    setAlertObj({
                      title: AppStrings.Network.errorTitle,
                      message: AppStrings.Validation.maxImageSizeError,
                    }),
                  );
                  return;
                }
                props.onImagesSelect(result.assets);
              }
            });
          }
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
          backgroundColor={AppColors.transparentColor}
        />
        <TouchableWithoutFeedback onPress={props.onClose} disabled={true}>
          <View style={styles.transparentBg} />
        </TouchableWithoutFeedback>
        <View style={styles.mainContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headingText}>Upload</Text>
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
          {/* End of Top header */}
          <View style={styles.pickersContainer}>
            {imagePickerConstants.map((item, index) => (
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
            ))}
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
    backgroundColor: AppColors.transparentColor,
    ...StyleSheet.absoluteFillObject,
  },
  mainContainer: {
    height: isSmallDevice ? '45%' : '40%',
    backgroundColor: AppColors.white.white,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: hv(5),
  },
  headerRow: {
    ...AppStyles.horiCommon,
    justifyContent: 'center',
    minHeight: normalized(40),
  },
  headingText: {
    ...AppStyles.textSemiBold,
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
    position: 'absolute',
    right: 0,
  },
  crossImg: {
    height: normalized(22),
    width: normalized(22),
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: ScreenSize.height < 680 ? hv(200) : hv(170),
    marginTop: isSmallDevice ? hv(60) : hv(40),
    alignSelf: 'center',
  },
  singlePicker: {
    borderRadius: 15,
    width: '45%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalized(20),
    borderWidth: 3,
    borderColor: AppColors.grey.greyLevel1,
    borderStyle: 'dashed',
  },
  pickerImg: {
    width: normalized(30),
    height: normalized(30),
  },
  pickerText: {
    ...AppStyles.textSemiBold,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(12),
    marginTop: hv(10),
    textAlign: 'center',
  },
});
