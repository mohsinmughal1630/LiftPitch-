import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AppColors, hv, normalized } from '../../../../Utils/AppConstants';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import CustomFilledBtn from '../../../Components/CustomButtom/CustomButton';

const ReportReasonModal = (props: any) => {
  const [reportTxt, setReportTxt] = useState('');
  return (
    <Modal
      transparent
      animationType="slide"
      onRequestClose={props?.onClose}
      visible={props?.value}>
      <TouchableWithoutFeedback onPress={() => props?.onClose()}>
        <View style={styles.mainContainer}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
            <View
              style={{
                height: normalized(300),
                width: normalized(330),
                backgroundColor: AppColors.white.white,
                borderRadius: normalized(10),
                padding: normalized(10),
                marginHorizontal: AppHorizontalMargin,
              }}>
              <Text
                style={{
                  fontSize: normalized(15),
                  ...AppStyles.textMedium,
                  color: AppColors.black.black,
                  textAlign: 'center',
                }}>
                Reporting Reason
              </Text>
              <View style={{ paddingHorizontal: AppHorizontalMargin }}>
                <TextInput
                  multiline
                  style={{
                    height: 150,
                    textAlignVertical: 'top',
                    borderRadius: normalized(5),
                    borderWidth: 1,
                    borderColor: AppColors.grey.grey,
                    paddingHorizontal: normalized(15),
                    paddingTop: hv(20),
                    marginVertical: normalized(15),
                    ...AppStyles.textRegular
                  }}
                  scrollEnabled={reportTxt?.length > 10 ? true : false}
                  value={reportTxt}
                  onChangeText={value => {
                    setReportTxt(value);
                  }}
                  placeholder="Please type reporting reason....."
                  placeholderTextColor={AppColors.black.lightBlack}
                  textAlignVertical={'top'}
                />
              </View>
              <CustomFilledBtn
                label={'Submit'}
                onPressBtn={() => {
                  props?.atSubmit(reportTxt);
                }}
                mainContainer={{
                  width: normalized(170),
                  height: normalized(45),
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default ReportReasonModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
