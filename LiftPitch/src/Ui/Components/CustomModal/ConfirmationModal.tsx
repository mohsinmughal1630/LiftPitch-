import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Modal,
  ViewStyle,
  StatusBar,
} from 'react-native';
import {
  AppColors,
  AppFonts,
  AppImages,
  hv,
  isSmallDevice,
  normalized,
  ScreenSize,
} from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';

interface Props {
  content: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmColor?: string;
  type?: boolean;
  btnContainerStyle?: ViewStyle;
}

const ConfirmationModal = (props: Props) => {
  return (
    <Modal animationType="slide" transparent onRequestClose={props.onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={AppColors.transparentColor}
        />
        <TouchableWithoutFeedback onPress={props.onClose} disabled={true}>
          <View style={styles.transparentContainer} />
        </TouchableWithoutFeedback>
        <View style={styles.subContainer}>
          <TouchableWithoutFeedback onPress={props.onClose}>
            <View style={styles.crossView}>
              <Image
                source={AppImages.Common.CrossFilled}
                resizeMode="contain"
                style={styles.crossImg}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text
            style={[
              styles.rowLabel,
              {
                fontSize: normalized(16),
              },
            ]}>
            {props.content}
          </Text>
          <View style={[styles.rowContainer, props.btnContainerStyle]}>
            <TouchableWithoutFeedback onPress={props.onClose}>
              <View style={styles.btnContainer}>
                <Text style={styles.btnText}>Cancel</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={props.onConfirm}>
              <View
                style={[
                  styles.btnContainer,
                  {
                    backgroundColor: props.confirmColor
                      ? props.confirmColor
                      : AppColors.primaryPurple,
                  },
                ]}>
                <Text style={styles.btnText}>Yes</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ConfirmationModal;

const styles = StyleSheet.create({
  rowTitle: {
    ...AppStyles.textBold,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(18),
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: '60%',
  },
  rowLabel: {
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(18),
    ...AppStyles.textMedium,
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: '80%',
    marginTop: hv(10),
    marginBottom: normalized(40),
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
    tintColor: 'red'
  },
  transparentContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 0,
  },
  subContainer: {
    backgroundColor: AppColors.white.white,
    width: ScreenSize.width * 0.9,
    borderRadius: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    marginTop: hv(30),
    marginBottom: hv(30),
  },
  btnContainer: {
    backgroundColor: AppColors.primaryPurple,
    justifyContent: 'center',
    alignItems: 'center',
    height: isSmallDevice ? hv(60) : hv(50),
    width: '47%',
    borderRadius: 35,
  },
  btnText: {
    ...AppStyles.textMedium,
    fontSize: normalized(14),
    color: AppColors.white.white,
  },
});
