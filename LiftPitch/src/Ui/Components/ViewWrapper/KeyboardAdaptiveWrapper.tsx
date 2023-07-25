import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

interface Props {
  children: any;
}

const KeyboardAdaptiveWrapper = (props: Props) => {
  return Platform.OS == 'ios' ? (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      {props.children}
    </KeyboardAwareScrollView>
  ) : (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={40}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default KeyboardAdaptiveWrapper;
