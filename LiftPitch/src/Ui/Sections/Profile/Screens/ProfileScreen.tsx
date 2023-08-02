import React from 'react';
import {
  AppColors,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {
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
import {useDispatch} from 'react-redux';
import {setUserData} from '../../../../Redux/reducers/AppReducer';
const ProfileScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader title={'Profile Screen'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <ScrollView
          contentContainerStyle={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <Text
              style={styles.dummyTxt}
              onPress={() => {
                dispatch(setUserData(null));
              }}>
              Logout from here
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    marginHorizontal: AppHorizontalMargin,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyTxt: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.red.mainColor,
  },
});
export default ProfileScreen;
