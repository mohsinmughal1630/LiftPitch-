import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
const useBackButtonListener = (handler: () => boolean) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handler,
    );
    if (!isFocused) {
      backHandler.remove();
    }
    return () => backHandler.remove();
  }, [isFocused]);
};
export default useBackButtonListener;
