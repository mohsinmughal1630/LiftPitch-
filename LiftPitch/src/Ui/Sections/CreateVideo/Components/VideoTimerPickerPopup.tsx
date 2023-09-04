import React, { useEffect, useRef, useState } from 'react';
import { Image, LayoutAnimation, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AppColors, AppImages, ScreenSize, normalized } from '../../../../Utils/AppConstants';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AppStyles } from '../../../../Utils/AppStyles';

interface Props {
    onClose: () => void;
    currentTimer: number;
    onSelectTimer: (val: number) => void
}

const boxWidth = 60;

const VideoTimerPickerPopup = (props: Props) => {
    const [rightOffset, setRightOffset] = useState(-boxWidth)
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setRightOffset(0);
    }, [])
    const closeBox = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setRightOffset(-boxWidth);
        setTimeout(() => {
            props.onClose();
        }, 200);
    }
    return (
        <View style={[styles.mainBox, {
            right: rightOffset,
        }]}>
            <TouchableWithoutFeedback onPress={closeBox}>
                <View style={styles.arrowBox}>
                    <Image source={AppImages.Common.DropDownIcon} resizeMode='contain' style={styles.arrowImg} />
                </View>
            </TouchableWithoutFeedback>
            {
                [0, 3, 5, 10].map((item, index) => {
                    const isActive = item == props.currentTimer;
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => {
                                props.onSelectTimer(item);
                                closeBox();
                            }}
                        >
                            <View style={{
                                marginVertical: 2,
                                height: 40,
                                width: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: isActive ? AppColors.red.darkRed : AppColors.black.black,
                                    fontSize: normalized(12),
                                    ...AppStyles.textMedium
                                }}>{item == 0 ? 'OFF' : `${item} s`}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </View>
    )
}

export default VideoTimerPickerPopup;

const styles = StyleSheet.create({
    mainBox: {
        backgroundColor: AppColors.white.white,
        position: 'absolute',
        minHeight: 200,
        width: boxWidth,
        right: 0,
        zIndex: 999,
        top: normalized(150),
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 10,
    },
    arrowBox: {
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowImg: {
        height: 20,
        width: 20,
        transform: [{ rotate: '-90deg' }]
    }
})