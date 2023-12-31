import React, {useEffect} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Routes} from '../Utils/Routes';
import Container from '../Ui/Sections/Container/Container';
import ProfileScreen from '../Ui/Sections/Profile/Screens/ProfileScreen';
import ChatScreen from '../Ui/Sections/Chat/Screens/ChatScreen';
import NotificationScreen from '../Ui/Sections/Notification/Screens/NotificationScreen';
import PitchIdeasListScreen from '../Ui/Sections/CreateVideo/Screens/PitchIdeasListScreen';
import PitchIdeaStepScreen from '../Ui/Sections/CreateVideo/Screens/PitchIdeaStepScreen';
import VideoCreateScreen from '../Ui/Sections/CreateVideo/Screens/VideoCreateScreen';
import UploadMediaPreviewScreen from '../Ui/Sections/CreateVideo/Screens/UploadMediaPreviewScreen';
import SharePitchScreen from '../Ui/Sections/CreateVideo/Screens/SharePitchScreen';
import SettingScreen from '../Ui/Sections/Settings/Screens/SettingScreen';
import FeedListingScreen from '../Ui/Sections/Home/Screens/FeedListingScreen';
import UpdateProfileSccreen from '../Ui/Sections/Settings/Screens/UpdateProfileScreen';
import TermsNConditionScreen from '../Ui/Sections/Settings/Screens/TermsNConditionScreen';
import PrivacyScreen from '../Ui/Sections/Settings/Screens/PrivacyScreen';
import AnalyticsScreen from '../Ui/Sections/Settings/Screens/AnalyticsScreen';
import ReportProblemScreen from '../Ui/Sections/Settings/Screens/ReportProblemScreen';
const MainStack = createStackNavigator();

export default function MainNavigation() {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.Container.Container}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <MainStack.Screen
        name={Routes.Container.Container}
        component={Container}
      />
      <MainStack.Screen
        name={Routes.ProfileTab.ProfileScreen}
        component={ProfileScreen}
      />
      <MainStack.Screen
        name={Routes.Chat.messageListing}
        component={NotificationScreen}
      />
      <MainStack.Screen name={Routes.Chat.chatScreen} component={ChatScreen} />
      <MainStack.Screen
        name={Routes.addVideoTab.createVideoScreen}
        component={VideoCreateScreen}
      />
      <MainStack.Screen
        name={Routes.addVideoTab.uploadMediaPreviewScreen}
        component={UploadMediaPreviewScreen}
      />
      <MainStack.Screen
        name={Routes.addVideoTab.pitchListScreen}
        component={PitchIdeasListScreen}
      />
      <MainStack.Screen
        name={Routes.addVideoTab.pitchIdeaScreen}
        component={PitchIdeaStepScreen}
      />
      <MainStack.Screen
        name={Routes.addVideoTab.sharePitch}
        component={SharePitchScreen}
      />
      <MainStack.Screen
        name={Routes.Setting.settingScreen}
        component={SettingScreen}
      />
      <MainStack.Screen
        name={Routes.HomeTab.feedScreen}
        component={FeedListingScreen}
      />
      <MainStack.Screen
        name={Routes.Setting.updateProfile}
        component={UpdateProfileSccreen}
      />
      <MainStack.Screen
        name={Routes.Setting.terms}
        component={TermsNConditionScreen}
      />
      <MainStack.Screen
        name={Routes.Setting.privacy}
        component={PrivacyScreen}
      />
      <MainStack.Screen
        name={Routes.Setting.analytics}
        component={AnalyticsScreen}
      />
      <MainStack.Screen
        name={Routes.Setting.reportProblem}
        component={ReportProblemScreen}
      />
    </MainStack.Navigator>
  );
}
