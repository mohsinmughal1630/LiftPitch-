import React, {useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import {TextInput} from 'react-native';
import useUserManager from '../../../../Hooks/useUserManager';
import {useDispatch} from 'react-redux';
import {setIsAlertShow} from '../../../../Redux/reducers/AppReducer';
import {AppStrings} from '../../../../Utils/Strings';
import CustomFilledBtn from '../../../Components/CustomButtom/CustomButton';

const ReportProblemScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {reportProblemFun} = useUserManager();
  const [reportReason, setReportReason] = useState<any>('');
  const [resError, setResError] = useState('');
  const reportProblem = async () => {
    if (reportReason == '') {
      setResError('Please enter a Problem');
      return;
    }
    reportProblemFun(reportReason, (result: any) => {
      if (result !== 'error!') {
        dispatch(setIsAlertShow({value: true, message: result}));
        setTimeout(() => {
          props?.navigation?.goBack();
        }, 1000);
      } else {
        dispatch(
          setIsAlertShow({
            value: true,
            message: AppStrings.Network.somethingWrong,
          }),
        );
      }
    });
  };

  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Report Problem'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(0) : hv(30)}>
        <ScrollView
          style={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          <Image source={AppImages.Auth.logo} style={styles.imgStyle} />

          <TextInput
            multiline
            style={styles.multiLineInput}
            scrollEnabled={reportReason?.length > 10 ? true : false}
            value={reportReason}
            onChangeText={value => {
              setReportReason(value);
              setResError('');
            }}
            placeholder="write a Problem...."
            placeholderTextColor={AppColors.black.lightBlack}
            textAlignVertical={'top'}
          />
          {resError?.length > 0 ? (
            <Text style={styles.errorMsg}>{resError}</Text>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomFilledBtn
        label={'Submit'}
        onPressBtn={() => {
          reportProblem();
        }}
        mainContainer={{
          width: normalized(170),
          height: normalized(45),
          marginVertical: normalized(30),
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  imgStyle: {
    marginVertical: normalized(30),
    alignSelf: 'center',
  },
  containerStyle: {
    flex: 1,
    marginHorizontal: AppHorizontalMargin,
  },
  multiLineInput: {
    height: 180,
    width: '100%',
    textAlignVertical: 'top',
    borderRadius: normalized(10),
    borderWidth: 1,
    borderColor: AppColors.black.simpleLight,
    paddingHorizontal: normalized(15),
    paddingTop: hv(20),
    ...AppStyles.textRegular,
    color: AppColors.black.black,
  },
  errorMsg: {
    marginTop: hv(1),
    color: 'red',
    ...AppStyles.textMedium,
    fontSize: normalized(12),
    marginLeft: normalized(2),
  },
});
export default ReportProblemScreen;
