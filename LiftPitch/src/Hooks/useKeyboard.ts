import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native';

const useKeyboardListener = () => {
    const [keyboardObj, setKeyboardObj] = useState({
      visible: false,
      keyboardHeight: 0
    });

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => setKeyboardObj({
        visible: true,
        keyboardHeight: e.endCoordinates.height
      })
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardObj({
        visible: false,
        keyboardHeight: 0
      })
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return keyboardObj
}
export default useKeyboardListener