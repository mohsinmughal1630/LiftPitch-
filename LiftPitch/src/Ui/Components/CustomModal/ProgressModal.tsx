import React, { useEffect } from "react";
import { Modal, Text, View } from "react-native";
import { AppStyles } from "../../../Utils/AppStyles";
import { AppColors, normalized } from "../../../Utils/AppConstants";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface Props {
    onClose: () => void;
    progressValues: {
        totalValue: number,
        currentValue: number
    }
}

const ProgressModal = (props: Props) => {
    const getPercentage = Math.round((props.progressValues.currentValue / props.progressValues.totalValue) * 100);
    const boxBgHeight = useSharedValue(0);
    useEffect(() => {
        boxBgHeight.value = withTiming(getPercentage);
        if (getPercentage == 100) {
            setTimeout(() => {
                props.onClose();
            }, 1000);
        }
    }, [getPercentage])
    const boxBgStyles = useAnimatedStyle(() => {
        return {
            height: `${boxBgHeight.value}%`,
        }
    })
    return (
        <Modal
            transparent
            animationType='fade'
        >
            <View style={{
                flex: 1,
                ...AppStyles.centeredCommon,
                backgroundColor: AppColors.transparentColorLight
            }}>
                <View style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    backgroundColor: AppColors.white.white,
                    ...AppStyles.centeredCommon,
                    ...AppStyles.shadowCommon,
                    overflow: 'hidden',

                }}>
                    <Animated.View style={[{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        zIndex: 1,
                        backgroundColor: AppColors.grey.midGray
                    }, boxBgStyles]} />
                    <Text style={{
                        color: AppColors.primaryPurple,
                        ...AppStyles.textMedium,
                        fontSize: normalized(20),
                        marginRight: -10,
                        zIndex: 2
                    }}>{`${getPercentage}%`}</Text>
                </View>
            </View>
        </Modal>
    )
}

export default ProgressModal;