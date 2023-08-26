import React from 'react';
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

const PitchIdeaStepScreen = (props: ScreenProps) => {
  let params = props?.route?.params?.data;

  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Day in the Life'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.topDesTxt}>
          {AppStrings.PitchIdeasFlow.stepDes}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={params?.steps}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity activeOpacity={1} style={styles.singleItem}>
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
