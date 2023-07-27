import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import {
  AppColors,
  normalized,
  ScreenSize,
  AppImages,
  hv,
  isSmallDevice,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';

interface Props {
  onClose: () => void;
  index: number;
}

const BindBraceletModal = (props: Props) => {
  return (
    <Modal transparent onRequestClose={props.onClose} animationType="slide">
      <View style={styles.mainContainer}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={AppColors.dark.darkLevel7}
        />
        <TouchableWithoutFeedback onPress={props.onClose} disabled={true}>
          <View style={styles.transparentContainer} />
        </TouchableWithoutFeedback>
        <View style={styles.subContainer}>
          <TouchableWithoutFeedback onPress={props.onClose}>
            <View style={styles.crossView}>
              <Image
                source={AppImages.Cards.CrossIcon}
                resizeMode="contain"
                style={styles.crossImg}
              />
            </View>
          </TouchableWithoutFeedback>
          {props.index == 0 ? (
            <View>
              <Text style={styles.rowTitle}>
                Tap bracelet to the back{`\n`}of your phone
              </Text>
              <Image
                source={AppImages.Home.BindBraceletBanner}
                style={styles.braceletBanner}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
              }}>
              <View style={styles.tickContainer}>
                <Image
                  source={AppImages.Cards.SingleDarkTick}
                  resizeMode="contain"
                  style={styles.tickImg}
                />
              </View>

              <View
                style={{
                  paddingTop: hv(80),
                }}>
                <Text style={styles.rowTitle}>Your bracelet is bound</Text>
                <Text
                  style={[
                    styles.rowTitle,
                    {
                      color: AppColors.primaryGreen,
                      fontSize: normalized(18),
                      ...AppStyles[
                        Platform.OS == 'android' ? 'textBold' : 'textMedium'
                      ],
                    },
                    Platform.OS == 'ios' && {
                      fontWeight: '700',
                    },
                  ]}>
                  Successfully
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BindBraceletModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 0,
  },
  subContainer: {
    backgroundColor: AppColors.white.white,
    height: ScreenSize.height * (isSmallDevice ? 0.6 : 0.5),
    width: '90%',
    borderRadius: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalized(10),
    paddingVertical: hv(10),
  },
  rowTitle: {
    ...AppStyles.textSemiBold,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
    alignSelf: 'center',
    textAlign: 'center',
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
  braceletBanner: {
    height: hv(200),
    width: '90%',
    alignSelf: 'center',
    marginTop: hv(isSmallDevice ? 50 : 30),
  },
  tickContainer: {
    backgroundColor: AppColors.primaryGreen,
    height: normalized(120),
    width: normalized(120),
    borderRadius: normalized(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickImg: {
    height: normalized(60),
    width: normalized(60),
    tintColor: AppColors.white.white,
  },
});
