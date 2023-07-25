import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';

const ViewOrScrollContainer = ({children, containerStyle}: any) => {
  const {height} = Dimensions.get('window');
  const isSmallDevice = height < 680 ? true : false;
  return isSmallDevice ? (
    <ScrollView
      style={[{flex: 1}, containerStyle]}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[{flex: 1}, containerStyle]}>{children}</View>
  );
};

export default ViewOrScrollContainer;
