import React from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppColors, normalized} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';

interface Props {
  recordingType: number;
  onRecordingTypeChage: (index: number) => void;
  disabled: boolean;
}

const singleItemWidth = normalized(70);

const RecordingTypeToggle = (props: Props) => {
  return (
    <View style={styles.headerRow}>
      <View
        style={[
          styles.absoluteBox,
          {
            left: props.recordingType == 0 ? 0 : singleItemWidth,
          },
        ]}
      />
      {['Photo', 'Video'].map((item, index) => {
        return (
          <TouchableWithoutFeedback
            key={index}
            disabled={props.disabled}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              props.onRecordingTypeChage(index);
            }}>
            <View style={styles.singleBox}>
              <Text style={styles.singleTxt}>{item}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default RecordingTypeToggle;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginBottom: 10,
  },
  singleBox: {
    paddingVertical: 7,
    borderRadius: 10,
    width: singleItemWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleTxt: {
    color: AppColors.white.white,
    fontSize: normalized(14),
    ...AppStyles.textMedium,
  },
  absoluteBox: {
    backgroundColor: '#808080',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: singleItemWidth,
    borderRadius: 20,
  },
});
