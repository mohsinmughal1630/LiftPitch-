import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { AppStyles } from '../../../../Utils/AppStyles';
import { AppColors, normalized } from '../../../../Utils/AppConstants';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

interface Props {
    counterValue: number
}

const CountDownTimer = ({ counterValue }: Props) => {
    const opacityOffset = useSharedValue(0);
    const scalingOffset = useSharedValue(2);
    useEffect(() => {
        animateCounter();
    }, [counterValue]);
    const animateCounter = () => {
        opacityOffset.value = withSequence(withTiming(1, {
            duration: 500
        }), withTiming(0, { duration: 500 }))
        scalingOffset.value = withSequence(withTiming(1, {
            duration: 500
        }), withTiming(2, { duration: 500 }))
    }
    const counterStyles = useAnimatedStyle(() => {
        return {
            opacity: opacityOffset.value,
            transform: [{
                scale: scalingOffset.value
            }]
        }
    })
    return (
        <Animated.View style={[{
            position: 'absolute',
            right: 0,
            left: 0,
            height: 350,
            zIndex: 100,
            ...AppStyles.centeredCommon
        }, counterStyles]}>
            <Text style={{
                fontSize: normalized(80),
                color: AppColors.white.white,
                ...AppStyles.textRegular
            }}>{counterValue}</Text>
        </Animated.View>
    )
}

export default CountDownTimer;