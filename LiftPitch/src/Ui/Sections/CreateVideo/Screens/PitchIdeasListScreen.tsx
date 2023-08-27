import React, {useEffect, useState} from 'react';
import {
  AppColors,
  AppImages,
  PITCH_IDEAS_LIST,
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

import firestore from '@react-native-firebase/firestore';
import {Routes} from '../../../../Utils/Routes';

const PitchIdeasListScreen = (props: ScreenProps) => {
  const [ideasList, setIdeasList] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getPitchIdeasList();
    }
  }, []);
  const getPitchIdeasList = async () => {
    await firestore()
      .collection('Pitch_Ideas')
      .get()
      .then((snapDoc: any) => {
        let list = snapDoc?._docs[0]?.data();
        if (list?.Ideas_List?.length > 0) {
          setIdeasList(list?.Idea_List);
        }
      });
  };
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Pitch Ideas'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.topDesTxt}>
          {AppStrings.PitchIdeasFlow.listingDes}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ideasList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.singleItem}
                onPress={() => {
                  props?.navigation.navigate(
                    Routes.addVideoTab.pitchIdeaScreen,
                    {
                      data: item,
                    },
                  );
                }}>
                <>
                  <AppImageViewer
                    source={
                      item?.hero_image_url
                        ? {uri: item?.hero_image_url}
                        : AppImages.bottomBar.Profile
                    }
                    placeHolder={AppImages.bottomBar.Profile}
                    style={styles.img}
                  />
                  <View style={styles.innerCont}>
                    <Text style={styles.title}>{item?.name}</Text>
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
  },
  title: {
    fontSize: normalized(13),
    fontWeight: '700',
    color: AppColors.black.black,
    top: normalized(-10),
  },
  itemDes: {
    fontSize: normalized(11),
    fontWeight: '400',
    color: AppColors.grey.greyLevel1,
  },
});
export default PitchIdeasListScreen;
