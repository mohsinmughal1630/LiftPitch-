export const AppStrings = {
  Network: {
    internetError: 'Please check your internet connection and try again',
    somethingWrong: 'Something went wrong',
    requestTimeoutError: 'Request Timed out',
    errorTitle: 'Alert',
    tokenExpired: 'Unauthenticated.',
    noNfcError: 'No NFC connected yet.',
    recordNotFound: 'Record Not Found',
    notLoggedIn: 'User not logged in yet',
    emailAlreadyUse: 'That email address is already in use!',
    invalidEmail: 'That email address is invalid!',
    invalidPassword: 'The password is invalid!',
    userNotFound: 'User not found against this Email.',
  },
  Validation: {
    fieldsEmptyError: 'Please fill the fields properly',
    invalidEmailError: 'Email is invalid',
    passwordLengthError: 'Password should not be less than 8 characters.',
    passwordNotMatchError: 'Passwords does not match',
    emailEmptyError: "Email can't be empty",
    otpCodeEmptyError: "OTP Code can't be empty",
    maxImageSizeError:
      'The selected image size exceeds the maximum limit of 10MB.',
  },

  Permissions: {
    contactPermission:
      'The app wants to access contacts. Go to Settings and enable it!',
    cameraPermission:
      'The app wants to access your camera. Go to Settings and enable it!',
    contactsUnavailable: 'Contacts not accessible',
    cancelled: 'Cancelled',
    success: 'Success',
  },
  bottomBar: {
    home: 'Home',
    followers: 'Followers',
    createVideo: 'CreateVideo',
    notification: 'Notification',
    profile: 'Profile',
  },
  PitchIdeasFlow: {
    listingDes: 'Scroll these ideas and templates for your next pitch video',
    stepDes: 'Follow these steps to create a Day in the Life video',
  },
};

export const AsyncKeyStrings = {
  Auth: {
    userToken: 'user_token',
    userdata: 'user_data',
  },
};
export const USER_TYPE = {
  owner: 'Owner',
  otherUser: 'OtherUser',
  guest: 'Guest',
};

export const Collections = {
  Users: 'Users',
  FOLLOW_N_FOLLOWING_COLLECTION: 'follow_&_follower',
  POST_COLLECTION: 'Videos',
};

export const CommentActionType = {
  addComment: 'AddNewComment',
  reply: 'ReplyAtComment',
  deleteComment: 'DeleteComment',
  reportComment: 'ReportComment',
};

export const GOOGLE_API_KEY = 'AIzaSyBQyEE67gM0AvoJAzwp7fSdDlPqKwqKTxU';
