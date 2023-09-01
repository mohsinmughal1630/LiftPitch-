import React, {useEffect, useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  normalized,
} from '../../../../Utils/AppConstants';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import {AppStrings} from '../../../../Utils/Strings';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import {useIsFocused} from '@react-navigation/native';
import ThreadManager from '../../../../ChatModule/ThreadManger';
import {useDispatch, useSelector} from 'react-redux';
import {createThumbnail} from 'react-native-create-thumbnail';
import {
  setIsAlertShow,
  setIsLoader,
} from '../../../../Redux/reducers/AppReducer';
import {getVideoCreateObj} from '../../../../Utils/Helper';
import moment from 'moment';

const PitchIdeaStepScreen = (props: ScreenProps) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const [stepList, setStepList] = useState([]);
  useEffect(() => {
    if (props?.route?.params?.data?.steps?.length > 0) {
      setSelectionValue(null, props?.route?.params?.data?.steps);
    }
  }, [isFocused]);
  const setSelectionValue = (step_number: any, data: any) => {
    let newArr: any = [];
    data.map((el: any) => {
      newArr.push({
        ...el,
        isSelected: step_number == el?.step_number ? true : false,
      });
    });
    setStepList(newArr);
  };
  const createPostFun = () => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    let findStepIndex = stepList.findIndex(
      (value: any) => value.isSelected == true,
    );
    if (findStepIndex != -1) {
      let stepObj: any = stepList[findStepIndex];
      if (stepObj?.isSelected) {
        delete stepObj?.isSelected;
      }

      dispatch(setIsLoader(true));
      ThreadManager.instance.uploadMedia(
        props?.route?.params?.mediaPath,
        true,
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
                  params['pitch_idea'] = {
                    ...props?.route?.params?.data,
                    steps: stepObj,
                  };
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
                pitch_idea: {
                  ...props?.route?.params?.data,
                  steps: stepObj,
                },
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
                props?.navigation.pop(3);
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
    } else {
      dispatch(
        setIsAlertShow({
          value: true,
          message: 'Please select Pitch Step!',
        }),
      );
    }
  };
  const uploadThumnail = async (path: any, payload: any) => {
    let obj = {...payload};
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
            props?.navigation.pop(3);
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
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      {props?.route?.params?.mediaPath ? (
        <CustomHeader
          title={'Day in the Life'}
          atBackPress={() => {
            props?.navigation.goBack();
          }}
          atRightBtn={() => {
            createPostFun();
          }}
          rightTxt={'Create Post'}
        />
      ) : (
        <CustomHeader
          title={'Day in the Life'}
          atBackPress={() => {
            props?.navigation.goBack();
          }}
        />
      )}

      <View style={styles.mainContainer}>
        <Text style={styles.topDesTxt}>
          {AppStrings.PitchIdeasFlow.stepDes}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={stepList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  ...styles.singleItem,
                  backgroundColor: item?.isSelected
                    ? AppColors.white.creamy
                    : AppColors.white.white,
                }}
                onPress={() => {
                  setSelectionValue(item?.step_number, stepList);
                }}>
                <>
                  <AppImageViewer
                    source={
                      item?.image_url
                        ? {uri: item?.image_url}
                        : AppImages.bottomBar.Profile
                    }
                    placeHolder={AppImages.bottomBar.Profile}
                    style={styles.img}
                  />
                  <View style={styles.innerCont}>
                    <Text
                      style={styles.title}>{`Step ${item?.step_number}:`}</Text>
                    <Text style={styles.itemDes}>{item?.description}</Text>
                  </View>
                </>
              </TouchableOpacity>
            );
          }}
        />
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
    fontWeight: '400',
    color: AppColors.black.black,
    marginVertical: normalized(10),
  },
  img: {
    height: normalized(154),
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
    padding: normalized(10),
    flex: 1,
  },
  title: {
    fontSize: normalized(13),
    fontWeight: '700',
    color: AppColors.black.black,
  },
  itemDes: {
    fontSize: normalized(11),
    fontWeight: '400',
    color: AppColors.grey.greyLevel1,
    top: normalized(30),
  },
});

export default PitchIdeaStepScreen;
