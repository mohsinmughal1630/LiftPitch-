import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {
  AppColors,
  AppImages,
  hv,
  isSmallDevice,
  normalized,
  ScreenSize,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import RoundButton from '../Button/RoundButton';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  confirmColor?: string;
  label1: string;
  label2: string;
}

const ReplaceConfirmationModal = (props: Props) => {
  const {isNotchDevice} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
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
                source={AppImages.Cards.CrossIcon}
                resizeMode="contain"
                style={styles.crossImg}
              />
            </View>
          </TouchableWithoutFeedback>
          <Image
            source={AppImages.Cards.ExclamationIcon}
            style={styles.imgStyle}
          />
          <Text style={styles.label}>{props.label1}</Text>
          <Text style={styles.label}>{props.label2}</Text>
          <RoundButton
            title="Replace"
            containerStyle={{
              ...styles.replaceBtn,
            }}
            btnStyle={{
              height: isSmallDevice ? hv(65) : hv(50),
              // isNotchDevice || Platform.OS == 'android' ? hv(45) : hv(65),
            }}
            onPress={props.onConfirm}
          />
        </View>
      </View>
    </Modal>
  );
};
export default ReplaceConfirmationModal;

const styles = StyleSheet.create({
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
  imgStyle: {
    width: normalized(90),
    height: normalized(90),
    alignSelf: 'center',
  },
  label: {
    ...AppStyles.textSemiBold,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
    textAlign: 'center',
    maxWidth: '70%',
    alignSelf: 'center',
    marginTop: hv(15),
  },
  replaceBtn: {
    alignSelf: 'center',
    marginVertical: hv(40),
    width: '60%',
  },
});
