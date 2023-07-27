import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
} from 'react-native';
import {
  AppColors,
  AppImages,
  emptyCardBoilerplate,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCreateCardObj,
  setIsUpgradeScreenFocused,
  setMoveToParams,
  setMoveToScreen,
  setShowUpgradeModal,
  setTab,
} from '../../../Redux/reducers/AppReducer';
import {Routes} from '../../../Utils/Routes';
import {AppRootStore} from '../../../Redux/store/AppStore';
import * as RootNavigation from '../../../Navigation/RootNavigation';
import ConfirmationModal from './ConfirmationModal';

// setShowUpgradeModal accepts following props
// visible: boolean
// isConfirmFirst: boolean
// resetScreen: boolean
// notCloseable: boolean
// title: string
// body: string

const UpgradePackageModal = () => {
  const dispatch = useDispatch();
  const {createCardObj, showUpgradeModal, isUpgradeScreenFocused} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    if (isUpgradeScreenFocused) dispatch(setShowUpgradeModal(null));
  }, [isUpgradeScreenFocused]);

  const onClose = () => {
    if (showUpgradeModal?.notCloseable) {
      console.log('Modal cannot be closed in this case');
      return;
    }
    dispatch(setShowUpgradeModal(null));
  };
  const onConfirm = () => {
    dispatch(setShowUpgradeModal(null));
    dispatch(setTab(6));
    dispatch(setMoveToScreen(Routes.Settings.upgradeAccount));
    if (createCardObj.cardType !== '' || showUpgradeModal?.resetScreen) {
      if (showUpgradeModal?.notCloseable) {
        dispatch(
          setMoveToParams({
            noBack: true,
          }),
        );
        dispatch(setIsUpgradeScreenFocused(true));
      }
      RootNavigation.reset(Routes.DrawerStack.main);
      if (createCardObj.cardType !== '') {
        dispatch(setCreateCardObj(emptyCardBoilerplate));
      }
    }
  };

  const confirmClicked = () => {
    if (showUpgradeModal?.isConfirmFirst) {
      setShowConfirmationModal(true);
    } else {
      onConfirm();
    }
  };

  return (
    <Modal transparent onRequestClose={onClose} animationType="slide">
      <View style={styles.main}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={AppColors.transparentColor}
        />
        <TouchableWithoutFeedback onPress={onClose} disabled={true}>
          <View style={styles.transparentBg} />
        </TouchableWithoutFeedback>
        <View style={styles.mainBox}>
          <View style={styles.headerRow}>
            <View style={{width: normalized(40)}} />
            <Text style={styles.title}>
              {showUpgradeModal?.title || 'Feature not Available!'}
            </Text>
            {showUpgradeModal?.notCloseable ? (
              <View style={{width: normalized(40)}} />
            ) : (
              <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.crossView}>
                  <Image
                    source={AppImages.Cards.CrossIcon}
                    resizeMode="contain"
                    style={styles.crossImg}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
          {/* <Image
            source={AppImages.UpgradeAccount.UpgradeIcon}
            style={styles.braceletBanner}
            resizeMode="contain"
          /> */}
          <Text style={styles.des}>
            {showUpgradeModal?.body ||
              `The requested feature doesn't comply with your current package. Upgrade your plan to continue using these features.`}
          </Text>
          <View
            style={[
              styles.buttonContainer,
              showUpgradeModal?.notCloseable && {justifyContent: 'center'},
            ]}>
            {!showUpgradeModal?.notCloseable && (
              <TouchableWithoutFeedback onPress={onClose}>
                <View
                  style={[
                    styles.singleBtn,
                    {
                      borderWidth: 2,
                      backgroundColor: 'transparent',
                    },
                  ]}>
                  <Text
                    style={[styles.btnTitle, {color: AppColors.primaryGreen}]}>
                    Later
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            <TouchableWithoutFeedback onPress={confirmClicked}>
              <View style={styles.singleBtn}>
                <Text style={styles.btnTitle}>Upgrade Now</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {showConfirmationModal && (
          <ConfirmationModal
            content={`All card data will be lost. Are you sure you want to continue leaving this screen?`}
            onClose={() => setShowConfirmationModal(false)}
            onConfirm={() => {
              setShowConfirmationModal(false);
              onConfirm();
            }}
          />
        )}
      </View>
    </Modal>
  );
};

export default UpgradePackageModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparentBg: {
    backgroundColor: AppColors.transparentColor,
    ...StyleSheet.absoluteFillObject,
  },
  mainBox: {
    backgroundColor: AppColors.white.white,
    width: '95%',
    borderRadius: 20,
    paddingBottom: hv(20),
  },
  crossView: {
    height: normalized(40),
    width: normalized(40),
    justifyContent: 'center',
    alignItems: 'center',
    margin: normalized(5),
  },
  crossImg: {
    height: normalized(22),
    width: normalized(22),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...AppStyles.textRegular,
    fontWeight: '600',
    // color: AppColors.dark.darkLevel1,
    color: AppColors.red.warning,
    fontSize: normalized(16),
    maxWidth: '70%',
    textAlign: 'center',
    marginTop: normalized(20),
  },
  des: {
    ...AppStyles.textRegular,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(14),
    maxWidth: '70%',
    // textAlign: 'center',
    // textAlign: 'justify',
    alignSelf: 'center',
  },
  braceletBanner: {
    height: hv(200),
    width: '80%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
    alignSelf: 'center',
    marginTop: 20,
  },
  singleBtn: {
    minWidth: normalized(130),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hv(12),
    borderRadius: 30,
    borderColor: AppColors.primaryGreen,
    backgroundColor: AppColors.primaryGreen,
  },
  btnTitle: {
    fontSize: normalized(14),
    ...AppStyles.textRegular,
    color: AppColors.white.white,
  },
});
