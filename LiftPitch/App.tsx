/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   View,
 } from 'react-native';
 import AppContainer from './src/Navigation/MainNavigation';
 import { AppStyles } from './src/Utils/AppStyles';
 
 const App = () => {
   return (
     <View
     style = {{...AppStyles.MainStyle}}
     >
       <AppContainer/>
     </View>
   );
 };
 export default App;
 