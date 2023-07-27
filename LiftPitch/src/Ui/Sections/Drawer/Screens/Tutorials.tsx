import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTutorialsListRequest} from '../../../../Network/Services/SettingServices';
import {setAlertObj, setLoader} from '../../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
  ScreenProps,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import {AppStrings} from '../../../../Utils/Strings';
import AppHeader from '../../../Components/Header/AppHeader';
import EmptyCompSimple from '../../../Components/ViewWrapper/EmptyCompSimple';
import TutorialsSingleComponent from '../Components/TutorialsSingleComponent';

const Tutorials = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [playedIndex, setPlayedIndex] = useState(-1);
  const [tutorialsList, setTutorialsList] = useState([]);
  const [isApiCalled, setIsApiCalled] = useState(false);

  useEffect(() => {
    fetchTutorialsList();
  }, []);

  const fetchTutorialsList = async () => {
    dispatch(setLoader(true));
    const res = await getTutorialsListRequest(isNetConnected).finally(() => {
      dispatch(setLoader(false));
      setIsApiCalled(true);
    });
    if (res.success) {
      setTutorialsList(res.data);
    } else {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: res?.message,
        }),
      );
    }
  };

  return (
    <View style={AppStyles.MainStyle}>
      {/* Header */}
      <AppHeader
        title="Tutorials"
        isBack={true}
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      {/* Main Container Dark navy */}
      <View style={styles.mainContainer}>
        <FlatList
          data={tutorialsList}
          ListHeaderComponent={useMemo(
            () =>
              isApiCalled ? (
                <Image
                  source={AppImages.Tutorials.tutorialsBackground}
                  resizeMode="contain"
                  style={styles.logoStyles}
                />
              ) : null,
            [isApiCalled],
          )}
          renderItem={({item, index}) => (
            <TutorialsSingleComponent
              item={item}
              index={index}
              isLast={index == tutorialsList.length - 1 ? true : false}
              isPlaying={index == playedIndex}
              playedIndex={playedIndex}
              setPlayedIndex={setPlayedIndex}
            />
          )}
          ListEmptyComponent={() =>
            isApiCalled ? (
              <EmptyCompSimple message="No tutorials found" />
            ) : null
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>
    </View>
  );
};
export default Tutorials;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.dark.darkLevel5,
    flex: 1,
    paddingHorizontal: normalized(20),
  },
  logoStyles: {
    alignSelf: 'center',
    marginVertical: hv(30),
    marginTop: hv(50),
  },
  titleStyle: {
    ...AppStyles.textMedium,
    fontSize: normalized(14),
    color: AppColors.white.white,
  },
});
