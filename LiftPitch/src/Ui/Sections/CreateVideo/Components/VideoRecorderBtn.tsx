import React, { useEffect, useState } from 'react';
import { LayoutAnimation, StyleSheet, TouchableWithoutFeedback, View, PanResponder } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { AppColors, normalized } from '../../../../Utils/AppConstants';
import { AppStyles } from '../../../../Utils/AppStyles';

interface Props {
    onImageClick: () => void;
    onVideRecordingStart: () => void;
    onVideoRecordingEnd: () => void;
}

const VideoRecorderBtn = (props: Props) => {
    const [isRecording, setIsRecording] = useState(false);

    const onMediaEnd = () => {
        console.log('isRecord ', isRecording ? 'video' : 'photo');
        setIsRecording(false);
        if (!isRecording) {
            props.onImageClick();
        } else {
            props.onVideoRecordingEnd();
        }
    }
    const mediaPressed = () => {
        setIsRecording(true)
        props.onVideRecordingStart();
    }

    return (
        <TouchableWithoutFeedback
            onLongPress={mediaPressed}
            onPressOut={onMediaEnd}
        >
            <View>
                {
                    isRecording ?
                        <AnimatedCircle
                            onEnd={onMediaEnd}
                        /> :
                        <View style={styles.stopRecordCont} />
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const radius = 30;

export const styles = StyleSheet.create({
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
    stopRecordCont: {
        backgroundColor: AppColors.red.darkRed,
        height: normalized(60),
        width: normalized(60),
        borderRadius: normalized(60 / 2),
        borderWidth: 5,
        borderColor: AppColors.red.lightRed,
    },
})

export default VideoRecorderBtn


const AnimatedCircle = ({ onEnd }: any) => {
    const [duration, setDuration] = useState(0);
    const [radius, setRadius] = useState(30)
    console.log("duration: ", duration);
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setRadius(40);
        let interval: any;
        interval = setInterval(() => {
            setDuration((prevDuration) => prevDuration + 1);
        }, 1000)
        return () => {
            console.log('Clearing interval');
            clearInterval(interval);
        }
    }, [])
    useEffect(() => {
        if (duration > 30) {
            onEnd();
        }
    }, [duration])

    const convertToPercentage = () => {
        const clampedValue = Math.min(Math.max(duration, 1), 30);
        const percentage = (clampedValue / 30) * 100
        return percentage;
    }

    return (
        <ProgressCircle
            percent={convertToPercentage()}
            radius={radius}
            borderWidth={5}
            color={AppColors.red.darkRed}
            shadowColor="#999"
            bgColor="black"
        >
            {/* <Text style={{ fontSize: 18 }}>{'30%'}</Text> */}
            <View style={[styles.svg, AppStyles.centeredCommon]}>
                <View style={styles.startRecordChildCont} />
            </View>
        </ProgressCircle>
    )
}