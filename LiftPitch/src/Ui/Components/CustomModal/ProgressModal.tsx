import React, { useEffect } from "react";
import { Image, LayoutAnimation, Modal, StyleSheet, Text, View } from "react-native";
import { AppStyles } from "../../../Utils/AppStyles";
import { AppColors, AppImages, normalized } from "../../../Utils/AppConstants";

interface Props {
    onClose: () => void;
    progressValues: {
        totalValue: number,
        currentValue: number
    }
}

const ProgressModal = (props: Props) => {
    const getPercentage = Math.round((props.progressValues.currentValue / props.progressValues.totalValue) * 100);
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (getPercentage == 100) {
            setTimeout(() => {
                props.onClose();
            }, 1000);
        }
    }, [getPercentage])
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
                    overflow: 'hidden'
                }}>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        height: `${getPercentage}%`,
                        width: '100%',
                        zIndex: 0,
                        backgroundColor: AppColors.grey.midGray
                    }} /><Text style={{
                        color: AppColors.primaryPurple,
                        fontWeight: '600',
                        fontSize: normalized(20),
                        marginRight: -10
                    }}>{`${getPercentage}%`}</Text>
                </View>
            </View>
        </Modal>
    )
}

export default ProgressModal;