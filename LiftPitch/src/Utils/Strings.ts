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
  Card: {
    cardAlreadyExists: 'This card already exists',
    qrCodeSaved: 'QRCode saved to gallery',
    noCardsError: 'There is no personal/business card available',
    noUploadFilesError: 'There is no uploaded file URL available',
    noEmergencyError: 'There is no emergency contact available',
    noCustomUrlError: 'There is no custom URL available',
    noPaymentError: 'There is no payment service available',
  },
  NFC: {
    nfcAlreadyRegistered: 'nfcAlreadyRegistered',
    nfcEmpty: 'There is no data written in this tag!',
    writeFail: 'Writing failed.',
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
  Teams: {
    suspendedMemberError:
      'You are currently suspended from the team, and thus cannot toggle to team now.',
    noMembersInNodeError:
      'This node neither has any child node nor any team member.',
  },
  Purchase: {
    purchasedAssociatedWithOtherAccountError: 'Existing subscription already associated with another account. Either login with that account or change iTunes account',
    subscriptionExpiredError: 'Your subscription is expired. You will need to renew your package to continue using the app.',
    noSubscriptionYet: `You haven't purchased any subscription yet.`,
    noSubcriptionFoundInSettings: `There's currently no available subscriptions in the iTunes.`
  }
};

export const AsyncKeyStrings = {
  Auth: {
    userToken: 'user_token',
    userdata: 'user_data',
  },
  Teams: {
    secretData: 'secret_data',
  },
};

export const ReceivedLinkType = {
  nfc: 'nfc',
  alreadyMember: 'alreadyMember',
  newMember: 'newMember',
};

export const TeamMemberJoiningStatus = {
  active: 'active',
  suspended: 'suspended',
};

export const TeamNodeUrlTypes = {
  node: 'node',
  team: 'team',
};
