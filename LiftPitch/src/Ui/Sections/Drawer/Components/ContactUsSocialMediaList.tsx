import React from 'react';
import {StyleSheet, Image, Pressable} from 'react-native';
import {AppColors, normalized} from '../../../../Utils/AppConstants';

interface Props {
  item: any;
  index: number;
  onPress: (index: number) => void;
}

const ContactUsSocialMediaList = (props: Props) => {
  return (
    <Pressable
      onPress={() => {
        props.onPress(props.item);
      }}
      style={[styles.mainContainer]}>
      <Image
        source={props.item.image}
        resizeMode="contain"
        style={styles.socialImg}
      />
    </Pressable>
  );
};
export default ContactUsSocialMediaList;

const styles = StyleSheet.create({
  mainContainer: {
    height: normalized(45),
    width: normalized(45),
    borderRadius: 25,
    backgroundColor: AppColors.primaryGreen,
    marginHorizontal: normalized(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialImg: {
    height: '50%',
    width: '50%',
    tintColor: AppColors.white.white,
  },
});
