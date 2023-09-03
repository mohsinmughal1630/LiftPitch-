import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import AppStatusBar from '../AppStatusBar';
import CustomFilledBtn from '../CustomButtom/CustomButton';
import { AppColors, hv, normalized } from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';
interface Props {
  message: any;
  onPress: any;
  visible: any;
  indigo?: any;
}
export default function AlertModal(props: Props) {
  return (
    <Modal animationType="fade" visible={props?.visible} transparent={true}>
      <AppStatusBar
        backgroundColor={
          props.indigo ? 'rgba(13, 13, 46,0.92)' : 'rgba(0,0,0,0.3)'
        }
        barStyle={'light-content'}
      />

      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>Alert</Text>
          <Text style={styles.label}>{props.message}</Text>
          <CustomFilledBtn
            mainContainer={{ width: normalized(150), height: normalized(40) }}
            label="Ok"
            onPressBtn={() => props?.onPress()}
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBox: {
    marginHorizontal: normalized(20),
    backgroundColor: 'white',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalized(15),
  },
  btn: {
    width: '50%',
  },
  label: {
    fontSize: normalized(14),
    ...AppStyles.textRegular,
    color: AppColors.black.black,
    marginBottom: hv(20),
    textAlign: 'center',
  },
  title: {
    fontSize: normalized(18),
    ...AppStyles.textMedium,
    color: AppColors.red.mainColor,
    marginBottom: hv(20),
  },
});
