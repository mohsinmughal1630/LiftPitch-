import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {AppColors, normalized} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';

interface Props {
  title: string;
  image: any;
  onPress: () => void;
  containerStyle?: any;
}

const FooterButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={1}>
      <View style={[styles.main, props.containerStyle]}>
        <Image source={props.image} resizeMode="contain" style={styles.icon} />
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FooterButton;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: normalized(10),
  },
  icon: {
    height: normalized(20),
    width: normalized(20),
  },
  text: {
    color: AppColors.dark.darkLevel1,
    marginLeft: normalized(15),
    ...AppStyles.textSemiBold,
    fontSize: normalized(14),
  },
});
