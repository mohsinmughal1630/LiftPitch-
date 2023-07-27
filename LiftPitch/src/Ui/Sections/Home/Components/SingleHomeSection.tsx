import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {AppColors, hv, normalized} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import SingleCard from './SingleCard';

interface Props {
  sectionTitle: string;
  list: any;
  index?: number;
  onPress: (type?: string, item?: any) => void;
}

const SingleHomeSection = (props: Props) => {
  return props.list?.length > 0 ? (
    <View
      style={[
        styles.container,
        {
          paddingTop: hv(5),
          paddingBottom: hv(5),
        },
      ]}>
      <Text style={styles.heading}>{props.sectionTitle}</Text>
      <View style={styles.lineStyle} />
      <View style={styles.listSection}>
        <FlatList
          data={props.list}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => (
            <SingleCard
              key={index}
              title={item.title}
              label={item.label}
              images={item.images}
              index={props.index}
              onPress={() => props.onPress(item?.type, item)}
              type={item?.type ? item.type : ''}
            />
          )}
        />
      </View>
    </View>
  ) : null;
};

export default SingleHomeSection;

const styles = StyleSheet.create({
  container: {
    marginVertical: hv(5),
    padding: normalized(15),
    paddingVertical: normalized(5),
  },
  heading: {
    ...AppStyles.textRegular,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
  },
  lineStyle: {
    height: 1,
    backgroundColor: AppColors.dark.darkLevel3,
    width: '100%',
    marginVertical: hv(5),
  },
  listSection: {
    flex: 1,
    marginTop: hv(5),
  },
});
