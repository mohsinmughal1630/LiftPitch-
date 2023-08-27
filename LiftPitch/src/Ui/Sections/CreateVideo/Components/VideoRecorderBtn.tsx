import React, { useEffect, useMemo, useState } from "react";
import { PixelRatio, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import { AppColors, normalized } from "../../../../Utils/AppConstants";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { AppStyles } from "../../../../Utils/AppStyles";

interface AnimatedCircularProgressProps {
    radius?: number;
    color?: string;
    percentage?: number;
    borderWidth?: number;
    duration?: number;
    onSuccess: () => void
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const VideoRecorderBtn = ({
    radius = normalized(40),
    color = AppColors.red.darkRed,
    // percentage = 0,
    borderWidth = 5,
    duration = 30000,
    onSuccess
}) => {
    const [percentage, setPercentage] = React.useState(0);

    useEffect(() => {
        setTimeout(() => {
            setPercentage(100)
        }, 2000);
    }, [])

    const loaderRadius = PixelRatio.roundToNearestPixel(radius);
    const innerCircleRadii = loaderRadius - borderWidth;

    const progress = useSharedValue(2 * Math.PI * innerCircleRadii);

    const [recordingDuration, setRecordingDuration] = useState(0);
    const [startInterval, setStartInterval] = useState(false);
    const [recordingStarted, setRecordingStarted] = useState(false);

    const getCircumferenceData = useMemo(() => {
        const circumference = 2 * Math.PI * innerCircleRadii;
        const perc = percentage <= 100 ? percentage : 100;
        const circumferencePercentage = circumference * perc * 0.01;

        return {
            circumference,
            circumferencePercentage,
            percentDiff: circumference - circumferencePercentage,
        };
    }, [percentage, innerCircleRadii, recordingDuration]);

    const animatedStrokeDashOffset = useAnimatedProps(() => {
        return {
            strokeDashoffset: withTiming(progress.value, {
                duration,
            }),
        };
    }, []);

    useEffect(() => {
        progress.value = getCircumferenceData.percentDiff;
    }, [percentage, innerCircleRadii]);

    useEffect(() => {
        let interval: any;
        if (startInterval) {
            interval = setInterval(() => {
                setRecordingDuration((prevDuration) => prevDuration + 1);
                setRecordingStarted(true);
            }, 1000)
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [startInterval])

    const handlePressIn = () => {
        setStartInterval(true);
    };

    const handlePressOut = () => {
        setStartInterval(false);
        setRecordingStarted(false);
        setRecordingDuration(0);
        if (recordingDuration < 1) {
            console.log('Only pressed');
            setRecordingDuration(0);
        } else {
            console.log('real recording starts');
        }
    };

    console.log('recording duration', recordingDuration);

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Svg style={styles(radius).svg}>
                <AnimatedCircle
                    cx={radius}
                    cy={radius}
                    fill="transparent"
                    r={innerCircleRadii}
                    stroke={color}
                    strokeWidth={borderWidth}
                    animatedProps={animatedStrokeDashOffset}
                    strokeDasharray={getCircumferenceData.circumference}
                    strokeDashoffset={getCircumferenceData.circumference}
                    strokeLinecap="round"
                />
                <View style={[styles(radius).svg, AppStyles.centeredCommon, !recordingStarted && {
                    backgroundColor: color,
                    borderRadius: 50
                }]}>
                    <View style={styles(radius).startRecordChildCont} />
                </View>
            </Svg>
        </TouchableWithoutFeedback>
    )
}

export const styles = (radius: number) =>
    StyleSheet.create({
        svg: {
            width: 2 * radius,
            height: 2 * radius,
            transform: [{
                rotateZ: '-90deg'
            }]
        },
        innerView: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'red',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        startRecordChildCont: {
            backgroundColor: AppColors.red.darkRed,
            height: normalized(20),
            width: normalized(20),
            borderRadius: normalized(5),
        },
    });

export default VideoRecorderBtn;