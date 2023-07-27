import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  AppColors,
  hv,
  ScreenProps,
  normalized,
  ScreenSize,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import RoundInput from '../../../Components/CustomInput/RoundInput';
import RoundButton from '../../../Components/Button/RoundButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import CommonDataManager from '../../../../Utils/CommonManager';
import AppHeader from '../../../Components/Header/AppHeader';
import {setAlertObj, setLoader} from '../../../../Redux/reducers/AppReducer';
import {applyEnterprisePackageRequest} from '../../../../Network/Services/PurchaseServices';
import {AppStrings} from '../../../../Utils/Strings';
import CardBindSuccessModal from '../../Functions/Components/CardBindSuccessModal';

const EnterpriseContactForm = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected, userData, teamId} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const isMonthly = props.route.params?.isMonthly;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [description, setDescription] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const saveClicked = async () => {
    setShowSuccessPopup(true);
    return;
    Keyboard.dismiss();
    const body = {
      name: CommonDataManager.getSharedInstance().truncateString(name),
      email,
      description,
    };
    dispatch(setLoader(true));
    const res = await applyEnterprisePackageRequest(
      isNetConnected,
      body,
    ).finally(() => dispatch(setLoader(false)));
    if (res.success) {
      setShowSuccessPopup(true);
    } else {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: res?.message,
        }),
      );
    }
  };

  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="Enterprise Contact Form"
        isBack
        onBack={() => props.navigation.goBack()}
        titleStyles={{
          maxWidth: '75%',
        }}
      />
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'android' ? 40 : 0}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.subContainer}>
            <RoundInput
              title="Enterprise name"
              value={name}
              onChangeText={setName}
              containerStyle={{
                ...styles.inputStyle,
                marginTop: hv(25),
              }}
              placeholder="Enterprise name"
              maxLength={25}
            />
            <RoundInput
              title="Email"
              placeholder="example@empl"
              value={email}
              onChangeText={e => {
                setEmail(e);
                setError({
                  ...error,
                  email:
                    CommonDataManager.getSharedInstance().isEmailValid(e) ||
                    e == ''
                      ? false
                      : true,
                });
              }}
              containerStyle={{
                ...styles.inputStyle,
                marginTop: hv(25),
              }}
              keyboardType="email-address"
              isError={error.email}
              maxLength={50}
            />
            <RoundInput
              title="Description"
              inputContainerStyle={styles.descriptionStyle}
              containerStyle={{
                width: '80%',
                marginTop: 10,
              }}
              placeholder={'Add description'}
              multiline
              value={description}
              onChangeText={setDescription}
            />
            <RoundButton
              title="Save"
              onPress={saveClicked}
              containerStyle={{
                marginTop: hv(20),
                width: '60%',
                marginBottom: 50,
              }}
              isDisabled={!name || !email || error.email || !description}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {showSuccessPopup && (
        <CardBindSuccessModal
          content={`Contact Form for Enterprise has been submitted. `}
          onClose={() => {
            setShowSuccessPopup(false);
            props.navigation.goBack();
          }}
          contentStyle={{maxWidth: '70%'}}
        />
      )}
    </View>
  );
};

export default EnterpriseContactForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hv(20),
    width: ScreenSize.width,
  },
  profileView: {
    height: hv(120),
    width: hv(120),
    borderRadius: hv(125),
    borderColor: AppColors.dark.darkLevel1,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.dark.darkLevel3,
    overflow: 'hidden',
    marginVertical: hv(15),
  },
  profileImg: {
    height: normalized(28),
    width: normalized(28),
  },
  inputStyle: {
    width: '80%',
    marginTop: hv(10),
  },
  heading: {
    color: AppColors.white.white,
    fontSize: normalized(14),
    ...AppStyles.textRegular,
    marginLeft: normalized(5),
  },
  descriptionStyle: {
    height: hv(130),
    paddingVertical: hv(5),
    borderRadius: 20,
    flex: 1,
  },
});
