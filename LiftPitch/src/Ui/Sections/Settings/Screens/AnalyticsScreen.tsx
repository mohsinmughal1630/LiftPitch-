import React from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  ScreenSize,
  normalized,
} from '../../../../Utils/AppConstants';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {AppStyles} from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import BarGraph from '../../Profile/Components/BarGraph';
import CurveGraph from '../../Profile/Components/CurveGraph';

const AnalyticsScreen = (props: ScreenProps) => {
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Analytics'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
      />
      <View
        style={{
          alignSelf: 'flex-start',
          flex: 1,
          width: ScreenSize.width,
          paddingHorizontal: normalized(30),
        }}>
        <FlatList
          data={[0, 1]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({index}) => {
            return index == 0 ? <BarGraph /> : <CurveGraph />;
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.black.black,
    textAlign: 'center',
  },
  imgStyle: {
    marginVertical: normalized(30),
    alignSelf: 'center',
  },
});
export default AnalyticsScreen;
