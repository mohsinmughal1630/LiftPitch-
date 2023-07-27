import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
  ScreenProps,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import RoundButton from '../../../Components/Button/RoundButton';
import RoundInput from '../../../Components/CustomInput/RoundInput';
import AppHeader from '../../../Components/Header/AppHeader';
import CountryInput from '../../AddCard/Components/CountryInput';
import ContactUsSocialMediaList from '../Components/ContactUsSocialMediaList';
import PersonalInfo from '../Components/PersonalInfo';
import CountryPicker from 'react-native-country-picker-modal';
import {useDispatch, useSelector} from 'react-redux';
import {setAlertObj, setLoader} from '../../../../Redux/reducers/AppReducer';
import {
  createContactUsRequest,
  getSettingsContactInfoRequest,
} from '../../../../Network/Services/SettingServices';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import {AppStrings} from '../../../../Utils/Strings';
import CardBindSuccessModal from '../../Functions/Components/CardBindSuccessModal';

const ContactUs = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [subject, setSubject] = useState('');
  const [flagCode, setFlagCode] = useState('us');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState({
    email: false,
    phone: false,
  });

  const [socialList, setSocialList] = useState([]);
  const [infoArr, setInfoArr] = useState([]);

  const getInitialContactInfo = async () => {
    dispatch(setLoader(true));
    const response = await getSettingsContactInfoRequest(
      isNetConnected,
    ).finally(() => dispatch(setLoader(false)));
    if (response.success) {
      const reObj = response.data[0];
      if (reObj) {
        let tempInfoArr =
          CommonDataManager.getSharedInstance().createContactInfoArray(reObj);
        setInfoArr(tempInfoArr);
        let socialInfoArr =
          CommonDataManager.getSharedInstance().createSocialInfoSocialArray(
            reObj,
          );
        setSocialList(socialInfoArr);
      }
    } else {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: response?.message,
        }),
      );
    }
  };

  useEffect(() => {
    getInitialContactInfo();
  }, []);

  const goToMaps = (loc: any) => {
    try {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${loc.lat},${loc.lng}`;
      const label = `Contact Us Location`;
      const url: any = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      Linking.openURL(url);
    } catch (e) {
      console.log('Error while opening map ', e);
    }
  };

  const onContactBtnClicked = async () => {
    const combinedNumber = `${CommonDataManager.getSharedInstance().removePlusFromNumber(
      countryCode,
    )}${phone}`;
    const body = {
      first_name: CommonDataManager.getSharedInstance().truncateString(fName),
      last_name: CommonDataManager.getSharedInstance().truncateString(lName),
      email: email,
      phone_no: combinedNumber,
      // country_phone:
      //   CommonDataManager.getSharedInstance().removePlusFromNumber(countryCode),
      subject: CommonDataManager.getSharedInstance().truncateString(subject),
      message: message,
    };
    dispatch(setLoader(true));
    const res = await createContactUsRequest(isNetConnected, body).finally(() =>
      dispatch(setLoader(false)),
    );
    if (res.success) {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        props.navigation.goBack();
      }, 2000);
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
        title="Contact Us"
        isBack={true}
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'android' ? 40 : 0}>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Image
            source={AppImages.Settings.contactUs}
            resizeMode="contain"
            style={styles.logoStyles}
          />
          <View style={styles.personalInfoContainer}>
            {infoArr.map((item: any, index) => (
              <PersonalInfo
                key={index}
                pic={item.pic}
                txt={item.txt}
                onPress={() => {
                  if (item.id == 1) {
                    // goToMaps(item?.locObj);
                  } else if (item.id == 2) {
                    Linking.openURL(`tel:${item.txt}`);
                  } else {
                    Linking.openURL(`mailto:${item.txt}`);
                  }
                }}
              />
            ))}
          </View>
          <View style={{marginHorizontal: normalized(20)}}>
            <RoundInput
              title={'First Name'}
              inputContainerStyle={styles.inputStyle}
              titleStyle={styles.titleStyle}
              containerStyle={styles.roundInputStyle}
              placeholder={'First Name'}
              placeholderTextColor={AppColors.dark.darkLevel1}
              value={fName}
              onChangeText={setFName}
            />
            <RoundInput
              title={'Last Name'}
              inputContainerStyle={styles.inputStyle}
              titleStyle={styles.titleStyle}
              containerStyle={styles.roundInputStyle}
              placeholder={'Last Name'}
              placeholderTextColor={AppColors.dark.darkLevel1}
              value={lName}
              onChangeText={text => {
                setLName(text);
              }}
            />

            <RoundInput
              title={'Email'}
              inputContainerStyle={styles.inputStyle}
              titleStyle={styles.titleStyle}
              containerStyle={styles.roundInputStyle}
              placeholder={'Email'}
              placeholderTextColor={AppColors.dark.darkLevel1}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setError({
                  ...error,
                  email:
                    CommonDataManager.getSharedInstance().isEmailValid(text) ||
                    text == ''
                      ? false
                      : true,
                });
              }}
              maxLength={50}
              keyboardType={'email-address'}
              isError={error.email}
            />

            <RoundInput
              title={'Subject'}
              inputContainerStyle={styles.inputStyle}
              titleStyle={styles.titleStyle}
              containerStyle={styles.roundInputStyle}
              placeholder={'Your subject here..'}
              placeholderTextColor={AppColors.dark.darkLevel1}
              value={subject}
              onChangeText={setSubject}
            />

            <View style={styles.headingRow}>
              <Text style={styles.heading}>Phone</Text>
            </View>
            <CountryInput
              flagCode={flagCode}
              phoneNumber={phone}
              countryCode={countryCode}
              setPhoneNumber={e => {
                setPhone(e);
                setError({
                  ...error,
                  phone:
                    CommonDataManager.getSharedInstance().isValidNumber(
                      countryCode,
                      e,
                    ) || e == ''
                      ? false
                      : true,
                });
              }}
              containerStyle={{
                width: '100%',
                borderRadius: normalized(15),
              }}
              onFlagPress={() => setShowCountryPicker(true)}
              isError={error.phone}
            />
            <RoundInput
              title={'Message'}
              inputContainerStyle={{
                ...styles.inputStyle,
                height: normalized(150),
              }}
              titleStyle={{...styles.titleStyle, textAlignVertical: 'top'}}
              containerStyle={styles.roundInputStyle}
              placeholder={'Your message here....'}
              placeholderTextColor={AppColors.dark.darkLevel1}
              multiline={true}
              value={message}
              onChangeText={setMessage}
            />

            <RoundButton
              title="Send"
              onPress={onContactBtnClicked}
              containerStyle={styles.buttonContainer}
              titleStyle={styles.btnTitleStyle}
              isDisabled={
                fName?.trim() == '' ||
                email?.trim() == '' ||
                phone?.trim() == '' ||
                error.email ||
                error.phone ||
                message?.trim() == ''
              }
            />
            <Text style={styles.socialMediaTxt}>Our Social Media</Text>
            <FlatList
              data={socialList}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${index}`}
              style={styles.socialListStyle}
              renderItem={({item, index}) => (
                <ContactUsSocialMediaList
                  item={item}
                  index={index}
                  onPress={async (obj: any) => {
                    if (obj?.url) {
                      try {
                        await Linking.openURL(
                          CommonDataManager.getSharedInstance().validateUrl(
                            obj?.url,
                          ),
                        );
                      } catch (e) {
                        console.log('Something wrong ', e);
                      }
                    }
                  }}
                />
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {showCountryPicker && (
        <CountryPicker
          onClose={() => setShowCountryPicker(false)}
          visible={showCountryPicker}
          onSelect={(country: any) => {
            if (country.callingCode[0]) {
              setCountryCode(`+${country.callingCode[0]}`);
            }
            if (country.flag) {
              setFlagCode(
                CommonDataManager.getSharedInstance().getCountryFlagCode(
                  country.flag,
                ),
              );
            }
          }}
          withFilter={true}
          countryCode={'US'}
        />
      )}
      {showSuccessModal && (
        <CardBindSuccessModal
          content={`Your request has been sent. Our team will get back to you shortly.`}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </View>
  );
};
export default ContactUs;

const styles = StyleSheet.create({
  personalInfoContainer: {
    flexDirection: 'row',
    marginHorizontal: normalized(13),
    marginVertical: hv(30),
    alignSelf: 'center',
  },
  logoStyles: {
    marginTop: hv(50),
    alignSelf: 'center',
    left: normalized(15),
  },
  inputMainContainer: {
    marginHorizontal: normalized(20),
  },
  inputStyle: {
    width: '100%',
    ...AppStyles.textRegular,
    fontSize: normalized(16),
    borderRadius: normalized(15),
  },
  titleStyle: {
    ...AppStyles.textMedium,
    fontSize: normalized(14),
    color: AppColors.white.white,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: normalized(200),
    marginTop: normalized(20),
    height: hv(50),
  },
  btnTitleStyle: {
    ...AppStyles.textBold,
    fontSize: normalized(16),
  },
  txtStyle: {
    ...AppStyles.textMedium,
    color: AppColors.white.white,
    fontSize: normalized(14),
  },
  socialMediaTxt: {
    ...AppStyles.textMedium,
    color: AppColors.white.white,
    fontSize: normalized(16),
    marginTop: normalized(35),
    alignSelf: 'center',
  },
  socialListStyle: {
    marginTop: hv(20),
    marginBottom: hv(50),
    alignSelf: 'center',
  },
  headingRow: {
    marginLeft: normalized(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hv(10),
    marginBottom: Platform.OS == 'android' ? hv(5) : hv(8),
    width: '85%',
  },
  heading: {
    color: AppColors.white.white,
    fontSize: normalized(14),
    ...AppStyles.textRegular,
    marginLeft: normalized(5),
  },
  roundInputStyle: {
    marginTop: normalized(10),
    width: '100%',
  },
});
