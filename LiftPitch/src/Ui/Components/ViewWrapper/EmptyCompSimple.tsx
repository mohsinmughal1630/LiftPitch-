import React from 'react';
import {View, Text} from 'react-native';
import {AppColors, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';

interface Props {
  message: string;
}

const EmptyCompSimple = (props: Props) => {
  return (
    <View
      style={{
        height: 250,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: AppColors.white.white,
          fontSize: normalized(16),
          textAlign: 'center',
          ...AppStyles.textRegular,
        }}>
        {props.message}
      </Text>
    </View>
  );
};

export default EmptyCompSimple;
