import { Platform } from "react-native";
import { makeid } from "../../Utils/AppConstants";
import storage from "@react-native-firebase/storage";

  // Uploading File
  export const uploadMedia = async (uri: string, onComplete: (url: string | null) => void) => {
    const filename = makeid(6) + uri.substring(uri.lastIndexOf("/") + 1);
    console.log("filename === ", filename);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    console.log("uploadUri =====> ", uploadUri);
    const ref = storage().ref(filename);
    const task = ref.putFile(uploadUri);
    // set progress state
    task.on("state_changed", (snapshot) => {
      console.log(snapshot.state);
    });
    try {
      await task
        .then((item) => {
          ref.getDownloadURL().then((url) => {
            console.log("url is ", url);
            onComplete(url);
          });
        })
        .catch((error) => {
          console.log("error getting url ", error);
          onComplete(null);
        });
    } catch (e) {
      onComplete(null);
    }
  };