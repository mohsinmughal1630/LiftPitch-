import React, { useEffect, useState } from 'react';
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
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import { AppStrings } from '../../../../Utils/Strings';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAlertShow } from '../../../../Redux/reducers/AppReducer';
import { Routes } from '../../../../Utils/Routes';

const PitchIdeaStepScreen = (props: ScreenProps) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
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

  const savePitchHandle = () => {
    let findStepIndex = stepList.findIndex(
      (value: any) => value.isSelected == true,
    );
    if (findStepIndex != -1) {
      let stepObj: any = stepList[findStepIndex];
      if (stepObj?.isSelected) {
        delete stepObj?.isSelected;
      }
      if (
        props?.route?.params?.from == Routes.addVideoTab.pitchListScreen &&
        props?.route?.params?.atBack
      ) {
        props?.route?.params?.atBack({
          ...props?.route?.params?.data,
          steps: stepObj,
        });
        setTimeout(() => {
          props?.navigation?.pop(2);
        }, 1000);
      } else {
        props?.navigation.navigate(Routes.addVideoTab.sharePitch, {
          mediaPath: props?.route?.params?.mediaPath,
          selectedPitch: {
            ...props?.route?.params?.data,
            steps: stepObj,
          },
        });
      }
    } else {
      dispatch(
        setIsAlertShow({
          value: true,
          message: 'Please select Pitch Step!',
        }),
      );
    }
  };
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />

      <CustomHeader
        title={'Day in the Life'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
        atRightBtn={() => {
          savePitchHandle();
        }}
        rightTxt={
          props?.route?.params?.from == Routes.addVideoTab.pitchListScreen
            ? 'Save'
            : 'Next'
        }
      />

      <View style={styles.mainContainer}>
        <Text style={styles.topDesTxt}>
          {AppStrings.PitchIdeasFlow.stepDes}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={stepList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => {
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
                        ? { uri: item?.image_url }
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
    ...AppStyles.textRegular,
    color: AppColors.black.black,
    marginVertical: normalized(15),
    width: normalized(250),
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
    ...AppStyles.textSemiBold,
    color: AppColors.black.black,
  },
  itemDes: {
    fontSize: normalized(11),
    ...AppStyles.textRegular,
    color: AppColors.grey.greyLevel1,
    top: normalized(30),
  },
});

export default PitchIdeaStepScreen;
