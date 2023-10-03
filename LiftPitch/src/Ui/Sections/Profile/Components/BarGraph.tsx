import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import { AppColors, ScreenSize, normalized, timeNameConstantsList, timesConstantList } from '../../../../Utils/AppConstants';
import { AppStyles } from '../../../../Utils/AppStyles';

const deviceWidth = ScreenSize.width - normalized(60);
const singleItemWidth = deviceWidth / 25 - normalized(5);

const BarGraph = () => {
    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        let maxValue = 0;
        timesConstantList.forEach(element => {
            if (element.value > maxValue) {
                maxValue = element.value
            }
        });
        setMaxHeight(maxValue);
    }, [])

    const getBarHeight = (val: number) => {
        if (maxHeight === 0) {
            return 0;
        }
        const heightPercentage = (val / maxHeight) * 100;
        const heightInPixels = Math.min(heightPercentage, 100);
        return heightInPixels;
    }
    return (
        <View style={{
            marginTop: 10
        }}>
            <Text
                style={{
                    color: 'black',
                    fontSize: normalized(14),
                    ...AppStyles.textBold,
                }}>Today <Text style={{
                    color: "#7F7F7F",
                    ...AppStyles.textRegular
                }}>  13 people reched acount</Text></Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingVertical: 10,
                paddingBottom: 5,
                marginTop: 10
            }}>
                {
                    timesConstantList.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    backgroundColor: AppColors.primaryPurple,
                                    width: singleItemWidth,
                                    height: getBarHeight(item.value),
                                    borderTopRightRadius: 25,
                                    borderTopLeftRadius: 25
                                }}>
                            </View>
                        )
                    })
                }
            </View>
            <View style={{
                // backgroundColor: 'orange',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingVertical: 10,
            }}>
                {
                    timeNameConstantsList.map((item, index) => {
                        return (
                            <View key={index}>
                                <Text
                                    style={{
                                        color: '#333232',
                                        fontSize: normalized(12)
                                    }}
                                >{item}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default BarGraph;