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
const FollowerScreen = (props: ScreenProps) => {
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader title={'Follower'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <ScrollView
          contentContainerStyle={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <Text style={styles.dummyTxt}>Follower Screen</Text>
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
export default FollowerScreen;
