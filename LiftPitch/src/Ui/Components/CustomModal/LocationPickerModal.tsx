import React from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  AppColors,
  AppImages,
  ILocation,
  hv,
  normalized,
} from "../../../Utils/AppConstants";
import { GOOGLE_API_KEY } from "../../../Utils/Strings";
import PlacesInput from "react-native-places-input";
import { AppStyles } from "../../../Utils/AppStyles";

interface Props {
  onSelectLocation: (val: ILocation) => void;
  onClose: () => void;
}

const LocationPickerModal = (props: Props) => {
  return (
    <Modal transparent onRequestClose={props.onClose} animationType="slide">
      <View style={styles.outerMain}>
        <View style={styles.subContainer}>
          <SafeAreaView
            style={{
              backgroundColor: "white",
            }}
          >
            <View style={styles.headerRow}>
              <TouchableWithoutFeedback onPress={props.onClose}>
                <View style={styles.headerCrossBox}>
                  <Image
                    source={AppImages.Common.CloseIcon}
                    resizeMode="contain"
                    style={styles.headerCrossImg}
                  />
                </View>
              </TouchableWithoutFeedback>
              <Text style={styles.selectLocTitle}>Select Location</Text>
              <View style={{ width: 40 }} />
            </View>
          </SafeAreaView>
          <View style={styles.locOuter}>
            <View style={styles.locInner}>
              <View
                style={{
                  ...AppStyles.horiCommon,
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.locTitle}>Location</Text>
              </View>
            </View>
            <PlacesInput
              googleApiKey={GOOGLE_API_KEY}
              placeHolder="Enter location"
              stylesContainer={styles.placesContainer}
              stylesList={styles.placesListContainer}
              stylesInput={styles.placesInputContainer}
              onSelect={(place: any) => {
                const locObj: ILocation = {
                  address: place?.result?.formatted_address,
                  ...place?.result?.geometry?.location,
                };
                props.onSelectLocation(locObj);
                props.onClose();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationPickerModal;

const styles = StyleSheet.create({
  outerMain: {
    flex: 1,
    backgroundColor: AppColors.white.white,
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 60,
    paddingHorizontal: normalized(15),
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  headerCrossBox: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCrossImg: {
    width: 15,
    height: 15,
  },
  selectLocTitle: {
    fontSize: 18,
    color: AppColors.black.black,
    fontWeight: "600",
  },
  locTitle: {
    fontSize: normalized(4),
    fontWeight: "600",
    color: AppColors.black.black,
    marginBottom: hv(5),
  },
  locOuter: {
    paddingHorizontal: normalized(15),
    marginTop: normalized(10),
  },
  locInner: {
    position: "absolute",
    top: 10,
    right: 0,
    left: 0,
    paddingHorizontal: normalized(15),
    height: 35,
  },
  placesContainer: {
    position: "relative",
    alignSelf: "stretch",
    margin: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "white",
    shadowOpacity: 0,
    overflow: "hidden",
  },
  placesListContainer: {
    borderColor: 'grey',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  placesInputContainer: {
    fontSize: normalized(14),
    backgroundColor: "transparent",
  },
});
