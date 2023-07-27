import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changePasswordRequest} from '../../../../Network/Services/UserServices';
import {setAlertObj, setLoader} from '../../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import {
  AppColors,
  AppImages,
  hv,
  isSmallDevice,
  normalized,
  ScreenProps,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import {Routes} from '../../../../Utils/Routes';
import {AppStrings} from '../../../../Utils/Strings';
import RoundButton from '../../../Components/Button/RoundButton';
import RoundInput from '../../../Components/CustomInput/RoundInput';
import AppHeader from '../../../Components/Header/AppHeader';

const AddNewPassword = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [showError, setShowError] = useState(false);
  const submitClicked = async () => {
    setShowError(true);
    let body = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    if (
      CommonDataManager.getSharedInstance().checkEmptyObj(
        body,
        (errorObj: any) => setError(errorObj),
      )
    ) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.fieldsEmptyError,
        }),
      );
      return;
    }
    if (
      !CommonDataManager.getSharedInstance().isPasswordValid(currentPassword)
    ) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordLengthError,
        }),
      );
      setError({
        ...error,
        currentPassword: true,
      });
      return;
    }
    if (!CommonDataManager.getSharedInstance().isPasswordValid(newPassword)) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordLengthError,
        }),
      );
      setError({
        ...error,
        newPassword: true,
      });
      return;
    }
    if (
      !CommonDataManager.getSharedInstance().isPasswordValid(confirmPassword)
    ) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordLengthError,
        }),
      );
      setError({
        ...error,
        confirmPassword: true,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordNotMatchError,
        }),
      );
      setError({
        ...error,
        confirmPassword: true,
      });
      return;
    }
    let apiBody = {
      current_password: currentPassword,
      password: newPassword,
      confirm_password: confirmPassword,
    };
    dispatch(setLoader(true));
    let response = await changePasswordRequest(isNetConnected, apiBody).finally(
      () => dispatch(setLoader(false)),
    );
    if (response.success) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: response?.message,
        }),
      );
      props.navigation.pop(2);
    } else {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: response?.message,
        }),
      );
    }
  };

  return (
    <View style={AppStyles.MainStyle}>
      {/* Header */}
      <AppHeader
        title="Change Password"
        isBack={true}
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      {/* Main Container Dark navy */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}
        keyboardVerticalOffset={Platform.OS == 'android' ? 40 : 10}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          // bounces={false}
          style={{flex: 1}}>
          <View style={styles.mainContainer}>
            <View style={styles.cardContainer}>
              <RoundInput
                title={'Current Password'}
                inputContainerStyle={styles.inputStyle}
                containerStyle={{marginTop: normalized(20)}}
                placeholder={'**********'}
                placeholderTextColor={AppColors.dark.darkLevel3}
                isPassword={true}
                value={currentPassword}
                onChangeText={text => {
                  setCurrentPassword(text);
                  // if (showError) {
                  setError({
                    ...error,
                    currentPassword:
                      CommonDataManager.getSharedInstance().isPasswordValid(
                        text,
                      ) || text == ''
                        ? false
                        : true,
                  });
                  // }
                }}
                isError={error.currentPassword}
              />
              <Pressable
                onPress={() =>
                  props.navigation.push(
                    Routes.Settings.settingsForgetPassScreen,
                  )
                }>
                <View style={styles.forgetContainer}>
                  <Text style={styles.forgetPassword}>Forget Password</Text>
                </View>
              </Pressable>

              <RoundInput
                title={'New Password'}
                inputContainerStyle={styles.inputStyle}
                containerStyle={{marginTop: normalized(10)}}
                placeholderTextColor={AppColors.dark.darkLevel3}
                placeholder={'**********'}
                isPassword={true}
                value={newPassword}
                onChangeText={text => {
                  setNewPassword(text);
                  // if (showError) {
                  setError({
                    ...error,
                    newPassword:
                      CommonDataManager.getSharedInstance().isPasswordValid(
                        text,
                      ) || text == ''
                        ? confirmPassword !== '' && confirmPassword !== text
                          ? true
                          : false
                        : true,
                    confirmPassword:
                      confirmPassword !== '' && confirmPassword !== text
                        ? true
                        : false,
                  });
                  // }
                }}
                isError={error.newPassword}
              />
              <RoundInput
                title={'Confirm Password'}
                inputContainerStyle={styles.inputStyle}
                containerStyle={{marginTop: normalized(20)}}
                placeholderTextColor={AppColors.dark.darkLevel3}
                placeholder={'**********'}
                isPassword={true}
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                  // if (showError) {
                  setError({
                    ...error,
                    confirmPassword:
                      (CommonDataManager.getSharedInstance().isPasswordValid(
                        text,
                      ) &&
                        text == newPassword) ||
                      text == ''
                        ? false
                        : true,
                    newPassword:
                      newPassword !== '' && newPassword !== text ? true : false,
                  });
                  // }
                }}
                isError={error.confirmPassword}
              />
            </View>
            {/* Save Btn */}
            <RoundButton
              title="Save"
              onPress={submitClicked}
              containerStyle={styles.buttonContainer}
              titleStyle={styles.btnTitleStyle}
              isDisabled={
                !CommonDataManager.getSharedInstance().isPasswordValid(
                  currentPassword,
                ) ||
                !CommonDataManager.getSharedInstance().isPasswordValid(
                  newPassword,
                ) ||
                !CommonDataManager.getSharedInstance().isPasswordValid(
                  confirmPassword,
                ) ||
                newPassword !== confirmPassword
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default AddNewPassword;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.dark.darkLevel5,
    flex: 1,
    paddingTop: normalized(40),
    width: '100%',
  },
  multiView: {},
  cardContainer: {
    backgroundColor: AppColors.dark.darkLevel4,
    paddingTop: normalized(15),
    paddingBottom: normalized(40),
    marginHorizontal: normalized(15),
    borderWidth: 1,
    borderColor: AppColors.dark.darkLevel3,
    paddingHorizontal: normalized(20),
    borderRadius: normalized(20),
  },
  inputStyle: {
    width: normalized(305),
  },
  forgetContainer: {
    paddingVertical: hv(5),
    alignSelf: 'flex-end',
  },
  forgetPassword: {
    color: AppColors.primaryGreen,
    ...AppStyles.textMedium,
    fontSize: normalized(14),
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '55%',
    marginTop: normalized(35),
    height: hv(50),
    marginBottom: hv(isSmallDevice ? 80 : 70),
  },
  btnTitleStyle: {
    ...AppStyles.textSemiBold,
    fontSize: normalized(16),
  },
});
