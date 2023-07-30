import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AppImages, hv, normalized} from '../../../Utils/AppConstants';
const SimpleInput = React.forwardRef((props: any, ref: any) => {
  const [secureEntry, setSecureEntry] = useState(props?.secureEntry);
  return (
    <View>
      <View style={{...styles.inputContainer, ...props.container}}>
        {props?.rightIcon ? (
          <Pressable>
            <Image
              source={props.rightIcon}
              resizeMode="contain"
              style={styles.rightIconStyle}
            />
          </Pressable>
        ) : null}

        <TextInput
          ref={ref}
          keyboardType={
            props?.keyboardType ? props?.keyboardType : 'email-address'
          }
          placeholderTextColor={props.placeHolderColor}
          placeholder={props?.placeHold}
          style={{...styles.txtInput, ...props.textInputStyle}}
          secureTextEntry={secureEntry}
          onChangeText={(txt: any) => {
            if (props?.setValue) {
              props?.setValue(txt);
            }
          }}
          value={props?.value}
          autoCapitalize="none"
          blurOnSubmit={props?.blurOnSubmit}
          returnKeyType={props?.returnKeyType}
          onSubmitEditing={props?.onSubmitEditing}
          scrollEnabled={props?.isScrollable}
        />

        {props?.showLastIcon ? (
          <Pressable
            style={{padding: 5}}
            onPress={() => {
              setSecureEntry(!secureEntry);
            }}>
            <Image
              source={
                secureEntry ? AppImages.Auth.closeEye : AppImages.Auth.eye
              }
              style={{
                width: normalized(20),
                height: normalized(20),
              }}
              resizeMode="contain"
            />
          </Pressable>
        ) : null}
      </View>
      {props?.errorMsg?.length > 0 ? (
        <Text style={{...styles.errorMsg, ...props.errorStyle}}>
          {props?.errorMsg}
        </Text>
      ) : null}
    </View>
  );
});
const styles = StyleSheet.create({
  inputContainer: {
    height: normalized(56),
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#E2E3E4',
    borderRadius: normalized(12),
    alignItems: 'center',
  },
  txtInput: {
    height: normalized(55),
    color: 'black',
    paddingLeft: normalized(12),
    maxWidth: normalized(270),
  },
  errorMsg: {
    marginTop: hv(1),
    color: 'red',
    fontWeight: '500',
    fontSize: normalized(12),
    marginLeft: normalized(2),
  },
  rightIconStyle: {
    height: normalized(22),
    width: normalized(22),
    marginStart: normalized(10),
  },
});
export default SimpleInput;
