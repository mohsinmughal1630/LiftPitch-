import React, { useEffect, useRef, useState } from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import SimpleInput from '../../../Components/CustomInput/SimpleInput';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import {
  setIsAlertShow,
  setIsLoader,
  setTab,
} from '../../../../Redux/reducers/AppReducer';
import { AppStrings } from '../../../../Utils/Strings';
import ThreadManager from '../../../../ChatModule/ThreadManger';
import { createThumbnail } from 'react-native-create-thumbnail';
import { getVideoCreateObj } from '../../../../Utils/Helper';
import moment from 'moment';
import CommonDataManager from '../../../../Utils/CommonManager';
import { Routes } from '../../../../Utils/Routes';
const SharePitchScreen = (props: ScreenProps) => {
  const selectedPitch = props?.route?.params?.selectedPitch;
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const tagUserRef = useRef();
  const [desError, setDesError] = useState('');
  const [hastTagError, setHastTagError] = useState('');
  const [tagError, setTagError] = useState('');

  const [description, setDescription] = useState('');
  const [hastTag, setHastTag] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    if (props?.route?.params?.selectedPitch) {
      setDescription(
        props?.route?.params?.selectedPitch?.description +
        props?.route?.params?.selectedPitch?.steps?.description,
      );
    }
  }, [props?.route?.params]);

  const createPostFun = () => {
    if (!description) {
      setDesError('Please type Caption');
      return;
    }
    if (!hastTag) {
      setDesError('Please enter hastTag or Keyword');
      return;
    }

    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    dispatch(setIsLoader(true));
    let mediaType = props?.route?.params?.mediaType == 'video' ? true : false;
    ThreadManager.instance.uploadMedia(
      props?.route?.params?.mediaPath,
      mediaType,
      async (url: any) => {
        if (url != 'error') {
          let params: any = {};
          if (url && props?.route?.params?.mediaType == 'video') {
            createThumbnail({
              url: url,
              timeStamp: 10000,
            })
              .then(async response => {
                params['videoUrl'] = url;
                params['pitch_idea'] = props?.route?.params?.selectedPitch;
                params['hastTags'] = hastTag;
                params['caption'] = description;
                await uploadThumnail(response.path, params);
              })
              .catch(err => {
                dispatch(setIsLoader(false));
                console.log('printImgErr ', err);
              });
          } else {
            let userData = getVideoCreateObj(selector?.userData);
            let postId = ThreadManager.instance.makeid(8);
            let obj: any = {
              photoUrl: url,
              pitch_idea: props?.route?.params?.selectedPitch,
              hastTags: hastTag,
              caption: description,
              videoId: postId,
              thumbnail: url,
              like: [],
              comments: [],
              creatorData: userData,
              createdAt: moment
                .utc(new Date())
                .format(ThreadManager.instance.dateFormater.fullDate),
            };
            dispatch(setIsLoader(false));
            await ThreadManager.instance.createPost(obj, (response: any) => {
              // props?.navigation.pop(4);
              dispatch(setTab(0));
              CommonDataManager.getSharedInstance().resetToScreen(props.navigation, Routes.Container.Container);
            });
          }
        } else {
          dispatch(setIsLoader(false));
          dispatch(
            setIsAlertShow({
              value: true,
              message: 'Error while uploading media',
            }),
          );
        }
      },
    );
  };
  const uploadThumnail = async (path: any, payload: any) => {
    let obj = { ...payload };
    await ThreadManager.instance
      .uploadMedia(path, false, async (url: any) => {
        if (url !== 'error') {
          let userData = getVideoCreateObj(selector?.userData);
          let postId = ThreadManager.instance.makeid(8);
          obj['videoId'] = postId;
          obj['thumbnail'] = url;
          obj['like'] = [];
          obj['comments'] = [];
          obj['creatorData'] = userData;
          obj['createdAt'] = moment
            .utc(new Date())
            .format(ThreadManager.instance.dateFormater.fullDate);

          dispatch(setIsLoader(false));
          await ThreadManager.instance.createPost(obj, (response: any) => {
            // props?.navigation.pop(4);
            dispatch(setTab(0));
            CommonDataManager.getSharedInstance().resetToScreen(props.navigation, Routes.Container.Container);
          });
        } else {
          dispatch(setIsLoader(false));
          dispatch(
            setIsAlertShow({
              value: true,
              message: 'Error while uploading post',
            }),
          );
        }
      })
      .catch(() => {
        dispatch(setIsLoader(false));
        dispatch(
          setIsAlertShow({
            value: true,
            message: 'Error while uploading thumbnail',
          }),
        );
      });
  };
  const focusNextField = (inputRef: any) => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Share pitch'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
        atRightBtn={() => {
          createPostFun();
        }}
        rightTxt={'Share'}
        rigthBtnStyle={{ color: AppColors.blue.lightBlue }}
      />
      <View style={styles.mainContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <AppImageViewer
            source={{ uri: selectedPitch?.hero_image_url }}
            placeHolder={AppImages.bottomBar.Profile}
            style={styles.pitchImg}
          />
          <View>
            <TextInput
              multiline
              style={styles.multiLineInput}
              scrollEnabled={description?.length > 10 ? true : false}
              value={description}
              onChangeText={value => {
                setDescription(value);
              }}
              placeholder="write a caption...."
              placeholderTextColor={AppColors.black.lightBlack}
              textAlignVertical={'top'}
            />
            {desError?.length > 0 ? (
              <Text style={styles.errorMsg}>{'desError'}</Text>
            ) : null}
          </View>
        </View>
        <SimpleInput
          onSubmitEditing={() => focusNextField(tagUserRef)}
          returnKeyType={'next'}
          placeHold={'Add Hashtag/Keywords..'}
          container={styles.inputMainCont}
          textInputStyle={{ width: normalized(270) }}
          setValue={(txt: any) => {
            setHastTagError('');
            setHastTag(txt);
          }}
          value={hastTag}
          secureEntry={false}
          errorMsg={hastTagError}
        />
        {/* <SimpleInput
          ref={tagUserRef}
          returnKeyType={'next'}
          placeHold={'Tag Users/Business..'}
          container={styles.inputMainCont}
          textInputStyle={{width: normalized(270)}}
          setValue={(txt: any) => {
            setTagError('');
            setTag(txt);
          }}
          value={tag}
          secureEntry={false}
          errorMsg={tagError}
        /> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: AppHorizontalMargin,
  },
  topDesTxt: {
    fontSize: normalized(15),
    ...AppStyles.textRegular,
    color: AppColors.black.black,
    marginVertical: normalized(10),
  },
  img: {
    height: normalized(85),
    width: normalized(85),
    borderRadius: normalized(5),
  },
  singleItem: {
    flexDirection: 'row',
    borderColor: AppColors.grey.simple,
    borderWidth: normalized(1),
    borderRadius: normalized(15),
    padding: normalized(10),
    marginVertical: normalized(5),
  },
  innerCont: {
    justifyContent: 'center',
    flex: 1,
    marginStart: normalized(10),
  },
  title: {
    fontSize: normalized(13),
    ...AppStyles.textSemiBold,
    color: AppColors.black.black,
    top: normalized(-10),
  },
  itemDes: {
    fontSize: normalized(11),
    ...AppStyles.textRegular,
    color: AppColors.grey.greyLevel1,
  },
  inputMainCont: {
    width: '100%',
    marginTop: 15,
  },
  errorMsg: {
    marginTop: hv(1),
    color: 'red',
    ...AppStyles.textMedium,
    fontSize: normalized(12),
    marginLeft: normalized(2),
  },
  pitchImg: {
    height: 180,
    width: normalized(110),
    borderRadius: normalized(5),
  },
  multiLineInput: {
    height: 180,
    width: 210,
    textAlignVertical: 'top',
    borderRadius: normalized(10),
    borderWidth: 1,
    borderColor: AppColors.black.simpleLight,
    paddingHorizontal: normalized(15),
    paddingTop: hv(20),
    ...AppStyles.textRegular,
    color: AppColors.black.black,
  },
});
export default SharePitchScreen;
