import React from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  normalized,
} from '../../../../Utils/AppConstants';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppStyles} from '../../../../Utils/AppStyles';
import Video from 'react-native-video';
import {Routes} from '../../../../Utils/Routes';

const UploadMediaPreviewScreen = (props: ScreenProps) => {
  const mediaType = props.route?.params?.mediaType;
  const mediaPath = props.route?.params?.mediaPath;
  console.log('mediaPath: ', mediaPath);
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <View style={styles.headerRow}>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <View style={styles.backIconBox}>
            <Image
              source={AppImages.Auth.backIcon}
              resizeMode="contain"
              // style={styles.backIcon}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Media Preview Screen</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            let splitPath = mediaPath.split('.');
            if (splitPath[splitPath?.length - 1] == 'mp4') {
              if (props.route?.params?.selectedPitch) {
                props?.navigation.navigate(Routes.addVideoTab.sharePitch, {
                  mediaType: 'video',
                  mediaPath: mediaPath,
                  selectedPitch: props.route?.params?.selectedPitch,
                });
              } else {
                props?.navigation.navigate(Routes.addVideoTab.pitchListScreen, {
                  mediaType: 'video',
                  mediaPath: mediaPath,
                });
              }
            } else {
              if (props.route?.params?.selectedPitch) {
                props?.navigation.navigate(Routes.addVideoTab.sharePitch, {
                  mediaType: 'photo',
                  mediaPath: mediaPath,
                  selectedPitch: props.route?.params?.selectedPitch,
                });
              } else {
                props?.navigation.navigate(Routes.addVideoTab.pitchListScreen, {
                  mediaType: 'photo',
                  mediaPath: mediaPath,
                });
              }
            }
          }}>
          <View style={styles.backIconBox}>
            <Text
              style={[
                styles.title,
                {
                  color: AppColors.primaryGreen,
                  fontSize: normalized(13),
                },
              ]}>
              Continue
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* Header End here */}
      <View style={styles.subContainer}>
        {mediaType == 'video' ? (
          <Video
            source={{uri: mediaPath}}
            controls={true}
            ignoreSilentSwitch="ignore"
            fullscreen={true}
            resizeMode="contain"
            style={styles.videoStyles}
          />
        ) : (
          <Image
            source={{
              uri: `file://${mediaPath}`,
            }}
            onError={e => console.log('err ', e)}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        )}
      </View>
    </View>
  );
};

export default UploadMediaPreviewScreen;

const styles = StyleSheet.create({
  headerRow: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalized(10),
    justifyContent: 'space-between',
  },
  backIconBox: {
    height: 50,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    height: '50%',
    width: '50%',
  },
  title: {
    color: AppColors.black.black,
    fontSize: normalized(16),
    ...AppStyles.textSemiBold,
  },
  subContainer: {
    flex: 1,
    backgroundColor: AppColors.black.black,
  },
  videoStyles: {
    width: '100%',
    height: '100%',
  },
});
