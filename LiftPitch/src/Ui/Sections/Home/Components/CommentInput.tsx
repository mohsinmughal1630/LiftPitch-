import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AppColors,
  AppFonts,
  AppImages,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import ProfilePlaceHolderComp from '../../../Components/ProfileView/ProfilePlaceHolderComp';
import {useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface Props {
  messageTxt: string;
  onChangeMessage: (val: string) => void;
  onSendPress: () => void;
}

const CommentInput = (props: any) => {
  //////// for Tag User in your Comment code--------->

  // const dispatch = useDispatch();
  // const [usersList, setUserList] = useState([]);
  // const [selected, setSelected] = useState<any>([]);
  // const index = useRef(false);
  // const insets = useSafeAreaInsets();
  // var focusPosition = useRef(0);
  // console.log('focusPostions=====>', focusPosition.current);
  // var simpleTextRef = useRef('');

  // const getUsers = (str: any) => {
  //   console.log('call API for get filtered Users------>');
  // };
  // const setHashTag = (item: any) => {
  //   let str = simpleTextRef.current;
  //   setSelected([...selected, item]);
  //   setUserList([]);
  //   let startIndex = -1;
  //   let endIndex = focusPosition.current - 1;
  //   for (let i = focusPosition.current - 1; i >= 0; i--) {
  //     if (str.charAt(i) == '@') {
  //       startIndex = i;
  //       break;
  //     }
  //   }
  //   let value = '';
  //   for (let i = 0; i < str.length; i++) {
  //     if (i < endIndex && i >= startIndex) {
  //     } else if (i == endIndex) {
  //       let obj = props?.tagList;
  //       obj[`${item?.id}`] = item;
  //       props?.setTagList(obj);
  //       value += `$Id@${item.username.replaceAll(' ', '*&')}$Id@`;
  //     } else {
  //       value += str[i];
  //     }
  //   }
  //   setValProps(value);
  // };
  // const checkUserExist = (txt: any) => {
  //   let found = false;
  //   for (key in props?.tagList) {
  //     let obj = props?.tagList[key];
  //     if (txt == obj?.username) {
  //       found = true;
  //       break;
  //     }
  //   }
  //   return found;
  // };
  // const setValue = () => {
  //   let spaceCount = [];
  //   var completeStr = '';
  //   for (let i = 0; i < props?.value.length; i++) {
  //     if (props?.value.charAt(i) == ' ') {
  //       spaceCount.push(props?.value.charAt(i));
  //     }
  //   }
  //   let textWidgets = [];
  //   let values = props.value.split(' ');
  //   for (let i = 0; i < values.length; i++) {
  //     let isHyper = false;
  //     let findedText = '';
  //     let fTxt = values[i];
  //     if (
  //       fTxt.includes('$Id@') &&
  //       checkUserExist(fTxt.replaceAll('$Id@', '').replaceAll('*&', ' '))
  //     ) {
  //       isHyper = true;
  //       findedText += fTxt.replaceAll('$Id@', '').replaceAll('*&', ' ');
  //     } else {
  //       isHyper = false;
  //       findedText = fTxt;
  //     }
  //     if (spaceCount[i]) {
  //       findedText += spaceCount[i];
  //     }
  //     completeStr += findedText;
  //     textWidgets.push(
  //       <Text
  //         style={{
  //           fontSize: isHyper ? 15 : 14,
  //           fontWeight: isHyper ? '500' : '400',
  //           color: 'black',
  //           backgroundColor: !isHyper ? 'transparent' : AppColors.grey.dimGrey,
  //         }}>
  //         {findedText}
  //       </Text>,
  //     );
  //   }
  //   simpleTextRef.current = completeStr;
  //   return textWidgets;
  // };
  // const setValProps = (newTxt: any) => {
  //   if (newTxt == ' ') {
  //     props.setValue(newTxt);
  //   } else {
  //     let finalStr = '';
  //     let original = createArrayWithEmpty(props.value.replaceAll('*&', ' '));
  //     let strValue = createArrayWithEmpty(newTxt);
  //     let previousMultiName = '';
  //     let currentMultiName = '';
  //     for (let i = 0; i < strValue.length; i++) {
  //       if (i < original.length) {
  //         if (
  //           original[i] == strValue[i] ||
  //           original[i] == strValue[i] + '$Id@'
  //         ) {
  //           console.log('top block', original[i]);
  //           if (currentMultiName != '') {
  //             previousMultiName += original[i];
  //             currentMultiName += original[i];
  //             if (
  //               checkUserExist(currentMultiName.replaceAll('$Id@', '')) &&
  //               original[i].endsWith('$Id@')
  //             ) {
  //               finalStr += previousMultiName.replaceAll(' ', '*&');
  //               previousMultiName = '';
  //               currentMultiName = '';
  //             }
  //           } else {
  //             finalStr += original[i];
  //           }
  //         } else if (
  //           original[i] == '$Id@' + strValue[i] + '$Id@' &&
  //           checkUserExist(strValue[i])
  //         ) {
  //           finalStr += original[i];
  //         } else if (
  //           original[i].includes('$Id@' + strValue[i]) &&
  //           !original[i].endsWith('$Id@')
  //         ) {
  //           previousMultiName += original[i];
  //           currentMultiName += strValue[i];
  //         } else {
  //           if (currentMultiName != '') {
  //             previousMultiName += original[i];
  //             currentMultiName += strValue[i];
  //             if (previousMultiName.replaceAll('$Id@', '') > currentMultiName) {
  //               finalStr += ' ';
  //             } else {
  //               finalStr += currentMultiName;
  //             }
  //             currentMultiName = '';
  //             previousMultiName = '';
  //           } else {
  //             if (original.length < strValue.length) {
  //               original.splice(i, 0, strValue[i]);
  //               finalStr += strValue[i];
  //             } else if (original.length > strValue.length) {
  //               if (
  //                 original[i] == '' &&
  //                 i != original.length - 1 &&
  //                 original[i + 1] == ' '
  //               ) {
  //                 original.splice(i, 2);
  //                 if (
  //                   original[i] == '$Id@' + strValue[i] + '$Id@' &&
  //                   checkUserExist(strValue[i])
  //                 ) {
  //                   finalStr += original[i];
  //                 } else if (original[i].includes('$Id@' + strValue[i])) {
  //                   previousMultiName += original[i];
  //                   currentMultiName += strValue[i];
  //                 } else {
  //                   finalStr += strValue[i];
  //                 }
  //               } else if (original[i] == '') {
  //                 original.splice(i, 1);
  //               } else {
  //                 original.splice(i, 1);
  //                 finalStr += strValue[i];
  //               }
  //             } else {
  //               if (original[i].includes('$Id@')) {
  //                 console.log('found');
  //                 finalStr += '';
  //               } else {
  //                 finalStr += strValue[i];
  //               }
  //             }
  //           }
  //         }
  //       } else {
  //         finalStr += strValue[i];
  //       }
  //     }
  //     props.setValue(finalStr);
  //   }
  // };
  // //  CREATE STR WITH EMPTY
  // const createArrayWithEmpty = (str: any) => {
  //   let character = '';
  //   let fullArray = [];
  //   for (let i = 0; i < str.length; i++) {
  //     if (str[i] == ' ') {
  //       fullArray.push(character);
  //       fullArray.push(' ');
  //       character = '';
  //     } else {
  //       character += str[i];
  //     }
  //   }
  //   if (character != '') {
  //     fullArray.push(character);
  //     character = '';
  //   }
  //   return fullArray;
  // };
  // const checkField = (text: any) => {
  //   setValProps(text);
  //   if (text.length !== 0 && text.length > 3) {
  //     let findedCharac = '';
  //     let searchCharacter = '';
  //     let isHashFound = false;
  //     for (let i = focusPosition.current - 1; i >= 0; i--) {
  //       if (text[i] == ' ') {
  //         findedCharac = '';
  //         isHashFound = false;
  //         break;
  //       } else if (text[i] == '@') {
  //         isHashFound = true;
  //         break;
  //       } else {
  //         findedCharac += text.charAt(i);
  //       }
  //     }
  //     if (findedCharac.length >= 2 && isHashFound) {
  //       for (let i = findedCharac.length - 1; i >= 0; i--) {
  //         searchCharacter += findedCharac.charAt(i);
  //       }
  //       if (searchCharacter.length >= 2) {
  //         getUsers(searchCharacter);
  //       }
  //     } else {
  //       setSelected([]);
  //       setUserList([]);
  //     }
  //   } else {
  //     setSelected([]);
  //     setUserList([]);
  //   }
  // };

  //////////----------->

  return (
    <View>
      {/* {usersList.length != 0 ? (
        <FlatList
          keyboardShouldPersistTaps={'always'}
          style={{maxHeight: hv(310)}}
          data={usersList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setHashTag(item);
                }}>
                <View style={styles.singleUserView}>
                  {item?.image?.length > 0 ? (
                    <AppImageViewer
                      source={{uri: item?.image}}
                      placeHolder={AppImages.bottomBar.Profile}
                      style={styles.userProfile}
                    />
                  ) : (
                    <ProfilePlaceHolderComp
                      index={0}
                      name={props?.userName ? props?.userName : 'Testing'}
                      mainStyles={styles.userProfile}
                      nameStyles={{
                        fontSize: normalized(16),
                        fontWeight: '500',
                      }}
                    />
                  )}
                  <View
                    style={{
                      paddingHorizontal: normalized(10),
                      maxHeight: hv(35),
                    }}>
                    <Text style={styles.userName}>{item?.username}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : null} */}
      {props?.isReply ? (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: AppColors.white.white,
            borderTopLeftRadius: normalized(10),
            borderTopRightRadius: normalized(10),
            padding: normalized(10),
            justifyContent: 'space-between',
            alignItems: 'center',
            ...AppStyles.shadowCommon,
          }}>
          <Text
            style={{
              color: AppColors.grey.towerGrey,
              fontSize: normalized(13),
              fontWeight: '300',
            }}>
            Replying to{' '}
            <Text
              style={{
                color: AppColors.black.black,
                fontSize: normalized(13),
                fontWeight: '400',
              }}>
              {props?.isReply?.creatorName}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              props?.atCancelReply();
            }}>
            <Image
              source={AppImages.createVideo.CloseIcon}
              style={{tintColor: AppColors.black.black}}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      <View
        style={
          props?.isReply ? styles.mainContainerAtReply : styles.mainContainer
        }>
        <TextInput
          placeholder="Add comment... "
          placeholderTextColor={AppColors.grey.dimGrey}
          value={props.messageTxt}
          onChangeText={props.onChangeMessage}
          style={[styles.input, {marginLeft: 10}]}
        />
        <TouchableWithoutFeedback
          onPress={props.onSendPress}
          disabled={props.messageTxt.trim() == ''}>
          <View
            style={[
              styles.sendImgBox,
              props.messageTxt.trim() == '' && {opacity: 0.7},
            ]}>
            <Image
              source={AppImages.Common.Send}
              resizeMode="contain"
              style={styles.sendImg}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  mainContainerAtReply: {
    backgroundColor: AppColors.white.white,
    height: normalized(60),
    paddingHorizontal: normalized(10),
    ...AppStyles.horiCommon,
    width: '100%',
  },
  mainContainer: {
    backgroundColor: AppColors.white.white,
    ...AppStyles.shadowCommon,
    height: normalized(60),
    paddingHorizontal: normalized(10),
    ...AppStyles.horiCommon,
    width: '100%',
  },
  input: {
    color: AppColors.black.black,
    fontSize: normalized(14),
    flex: 1,
    height: '100%',
  },
  sendImgBox: {
    paddingHorizontal: normalized(10),
  },
  sendImg: {
    height: 20,
    width: 20,
  },
  voiceBox: {
    height: 45,
    width: 30,
    ...AppStyles.centeredCommon,
  },
  voiceImg: {
    height: 25,
    width: 25,
  },
  attachmentImg: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  singleUserView: {
    height: normalized(60),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: AppHorizontalMargin,
    marginVertical: hv(5),
  },
  userProfile: {
    height: hv(50),
    width: hv(50),
    borderRadius: 35,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
