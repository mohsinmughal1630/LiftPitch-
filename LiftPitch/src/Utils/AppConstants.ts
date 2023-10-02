import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
import moment from 'moment';
import {AppStrings} from './Strings';
import {Routes} from './Routes';
export const platformVersion = Platform.Version;
export type ScreenProps = StackScreenProps<any, any>;
export const ScreenSize = Dimensions.get('screen');
const templateWidth = 375;
const templateHeight = 812;
const widthRatio = ScreenSize.width / templateWidth;
const heightRatio = ScreenSize.height / templateHeight;
export const isLargeWidth = Dimensions.get('window').width > 390;
export const normalized = (value: number) =>
  PixelRatio.roundToNearestPixel(value * widthRatio);
export const hv = (value: number) =>
  PixelRatio.roundToNearestPixel(value * heightRatio);
export const horizontalScreenWithMargin = ScreenSize.width - normalized(48);
export const formFieldsHeight =
  Platform.OS == 'android' ? normalized(50) : normalized(55);
export const isSmallDevice = ScreenSize.height < 700 ? true : false;
export const bottomBarHeightConstant = hv(90);
export const maxDescriptionLength = 60;
export const maxImageSizeInBytes = 10 * 1024 * 1024; // 10MB
export const mainBottomPadding = bottomBarHeightConstant + hv(10);
export const deviceHeight = Dimensions.get('window').height;
export const deviceHeightwithOutBar =
  Dimensions.get('window').height - normalized(70);

export const AppImages = {
  AppIcon: require('../Ui/assets/images/AppIcon.png'),
  Auth: {
    Camera: require('../Ui/assets/images/Auth/Camera.png'),
    closeEye: require('../Ui/assets/images/Auth/closeEye.png'),
    fbIcon: require('../Ui/assets/images/Auth/fbIcon.png'),
    google: require('../Ui/assets/images/Auth/google.png'),
    logo: require('../Ui/assets/images/Auth/logo.png'),
    Message: require('../Ui/assets/images/Auth/Message.png'),
    Password: require('../Ui/assets/images/Auth/Password.png'),
    eye: require('../Ui/assets/images/Auth/eye.png'),
    backIcon: require('../Ui/assets/images/Auth/backIcon.png'),
    CameraPicker: require('../Ui/assets/images/Auth/CameraPicker.png'),
    GalleryPicker: require('../Ui/assets/images/Auth/GalleryPicker.png'),
  },
  bottomBar: {
    Home: require('../Ui/assets/images/BottomBar/Home.png'),
    HomeFilled: require('../Ui/assets/images/BottomBar/HomeFilled.png'),
    followerIcon: require('../Ui/assets/images/BottomBar/followerIcon.png'),
    FollowersFilled: require('../Ui/assets/images/BottomBar/FollowersFilled.png'),
    Message: require('../Ui/assets/images/BottomBar/Message.png'),
    MessageFilled: require('../Ui/assets/images/BottomBar/MessageFilled.png'),
    PlusIcon: require('../Ui/assets/images/BottomBar/PlusIcon.png'),
    Profile: require('../Ui/assets/images/BottomBar/Profile.png'),
    ProfileFilled: require('../Ui/assets/images/BottomBar/ProfileFilled.png'),
  },
  Chat: {
    SendIcon: require('../Ui/assets/images/Chat/SendIcon.png'),
    Voice: require('../Ui/assets/images/Chat/Voice.png'),
    Attachment: require('../Ui/assets/images/Chat/Attachment.png'),
    Camera: require('../Ui/assets/images/Chat/Camera.png'),
    Gallery: require('../Ui/assets/images/Chat/Gallery.png'),
    Video: require('../Ui/assets/images/Chat/Video.png'),
    Document: require('../Ui/assets/images/Chat/Document.png'),
    msgSeen: require('../Ui/assets/images/Chat/msgSeen.png'),
  },
  createVideo: {
    galleryIcon: require('../Ui/assets/images/CreateVideo/galleryIcon.png'),
    smileIcon: require('../Ui/assets/images/CreateVideo/smileIcon.png'),
    CloseIcon: require('../Ui/assets/images/CreateVideo/CloseIcon.png'),
    FiltersIcon: require('../Ui/assets/images/CreateVideo/FiltersIcon.png'),
    flash: require('../Ui/assets/images/CreateVideo/flash.png'),
    flashOn: require('../Ui/assets/images/CreateVideo/FlashOn.png'),
    MagicPenIcon: require('../Ui/assets/images/CreateVideo/MagicPenIcon.png'),
    FlipIcon: require('../Ui/assets/images/CreateVideo/FlipIcon.png'),
    musicIcon: require('../Ui/assets/images/CreateVideo/musicIcon.png'),
    SpeedIcon: require('../Ui/assets/images/CreateVideo/SpeedIcon.png'),
    TimerIcon: require('../Ui/assets/images/CreateVideo/TimerIcon.png'),
    doneIcon: require('../Ui/assets/images/CreateVideo/doneIcon.png'),
  },
  Videos: {
    Play: require('../Ui/assets/images/Videos/Play.png'),
    Comment: require('../Ui/assets/images/Videos/Comment.png'),
    Report: require('../Ui/assets/images/Videos/Report.png'),
    Share: require('../Ui/assets/images/Videos/Share.png'),
    Error: require('../Ui/assets/images/Videos/Error.png'),
    PauseIcon: require('../Ui/assets/images/Videos/PauseIcon.png'),
    moreIcon: require('../Ui/assets/images/Videos/moreIcon.png'),
    likeIcon: require('../Ui/assets/images/Videos/likeIcon.png'),
    unLikeIcon: require('../Ui/assets/images/Videos/unLikeIcon.png'),
  },
  Common: {
    DropDownIcon: require('../Ui/assets/images/Common/DropDownIcon.png'),
    Setting: require('../Ui/assets/images/Common/Setting.png'),
    WarningIcon: require('../Ui/assets/images/Common/WarningIcon.png'),
    MorningIcon: require('../Ui/assets/images/Common/MorningIcon.png'),
    TickIcon: require('../Ui/assets/images/Common/TickIcon.png'),
    TickIconMini: require('../Ui/assets/images/Common/tick.png'),
    MaximizeIcon: require('../Ui/assets/images/Common/MaximizeIcon.png'),
    MinimizeIcon: require('../Ui/assets/images/Common/MinimizeIcon.png'),
    FavouriteIcon: require('../Ui/assets/images/Common/FavouriteIcon.png'),
    CartIcon: require('../Ui/assets/images/Common/CartIcon.png'),
    CloseIcon: require('../Ui/assets/images/Common/CloseIcon.png'),
    AddIcon: require('../Ui/assets/images/Common/AddIcon.png'),
    MinusIcon: require('../Ui/assets/images/Common/MinusIcon.png'),
    SearchIcon: require('../Ui/assets/images/Common/SearchIcon.png'),
    EditIcon: require('../Ui/assets/images/Common/EditIcon.png'),
    DeleteIcon: require('../Ui/assets/images/Common/DeleteIcon.png'),
    HeaderSearch: require('../Ui/assets/images/Common/HeaderSearch.png'),
    DeliveryIcon: require('../Ui/assets/images/Common/DeliveryIcon.png'),
    DeliveryiconLarge: require('../Ui/assets/images/Common/DeliveryiconLarge.png'),
    Send: require('../Ui/assets/images/Common/Send.png'),
    menuIcon: require('../Ui/assets/images/Common/menuIcon.png'),
    LeftArrowIcon: require('../Ui/assets/images/Common/LeftArrowIcon.png'),
    CrossFilled: require('../Ui/assets/images/Common/CrossIconFilled.png'),
  },
  Followers: {
    ContactsInvite: require('../Ui/assets/images/Followers/ContactsInvite.png'),
    Facebookinvite: require('../Ui/assets/images/Followers/Facebookinvite.png'),
    MailInvite: require('../Ui/assets/images/Followers/MailInvite.png'),
  },
  setting: {
    Activity: require('../Ui/assets/images/Setting/Activity.png'),
    bell: require('../Ui/assets/images/Setting/bell.png'),
    Chat: require('../Ui/assets/images/Setting/Chat.png'),
    Document: require('../Ui/assets/images/Setting/Document.png'),
    forward: require('../Ui/assets/images/Setting/forward.png'),
    lock: require('../Ui/assets/images/Setting/lock.png'),
    Logout: require('../Ui/assets/images/Setting/Logout.png'),
    profile: require('../Ui/assets/images/Setting/profile.png'),
    report: require('../Ui/assets/images/Setting/report.png'),
    share: require('../Ui/assets/images/Setting/share.png'),
    security: require('../Ui/assets/images/Setting/security.png'),
  },
  profile: {
    rightArrow: require('../Ui/assets/images/Profile/rightArrow.png'),
    infoImage: require('../Ui/assets/images/Profile/infoImage.png'),
  },
};
export const settingScreenList = [
  {
    title: 'ACCOUNT',
    data: [
      {
        id: 1,
        name: 'Profile & User Management',
        icon: AppImages.setting.profile,
        atPressMoveTo: 'Profile manage Screen',
      },
      {
        id: 2,
        name: 'Privacy',
        icon: AppImages.setting.lock,
        atPressMoveTo: 'Privacy',
      },
      {
        id: 3,
        name: 'Security',
        icon: AppImages.setting.security,
        atPressMoveTo: 'Security',
      },
      {
        id: 4,
        name: 'Analytics',
        icon: AppImages.setting.Activity,
        atPressMoveTo: 'Analytics',
      },
      {
        id: 5,
        name: 'Share profile',
        icon: AppImages.setting.share,
        atPressMoveTo: 'Share',
      },
      {line: true},
    ],
  },
  {
    title: 'Content & Display',
    data: [
      {
        id: 6,
        name: 'Push notifications',
        icon: AppImages.setting.bell,
        atPressMoveTo: 'Push notifications',
      },
      {
        id: 7,
        name: 'Comments',
        icon: AppImages.setting.Chat,
        atPressMoveTo: 'Comments',
      },
      {
        id: 8,
        name: 'Report a problem',
        icon: AppImages.setting.report,
        atPressMoveTo: 'Report',
      },
      {
        id: 9,
        name: 'Terms & Conditions',
        icon: AppImages.setting.Document,
        atPressMoveTo: 'Terms',
      },

      {
        id: 10,
        name: 'Log out',
        icon: AppImages.setting.Logout,
        atPressMoveTo: 'Log out',
      },
      {
        id: 11,
        color: '#E35252',
        name: 'Delete Account',
      },
    ],
  },
];
export const AppFonts = {
  Regular: 'Poppins-Regular',
  Medium: 'Poppins-Medium',
  Bold: 'Poppins-Bold',
  ExtraBold: 'Poppins-ExtraBold',
  Light: 'Poppins-Light',
  Italic: 'Poppins-Italic',
  ItalicLight: 'Poppins-LightItalic',
  SemiBold: 'Poppins-SemiBold',
};
export const mediaSelectionConstants = [
  {
    id: 1,
    image: AppImages.Chat.Gallery,
    text: 'upload image',
  },
  {
    id: 2,
    image: AppImages.Chat.Document,
    text: 'Upload document',
  },
];
export const AppColors = {
  dark: {
    darkLevel1: '#535F79',
    darkLevel2: '#4B576E',
    darkLevel3: '#333E56',
    darkLevel4: '#232C3D',
    darkLevel5: '#21293B',
    darkLevel6: '#19202E',
    darkLevel7: '#10151B',
    darkLevel8: '#020101',
  },
  primaryGreen: '#22A081',
  primaryPurple: '#502165',
  gradient: {
    dark: '#0f0e24',
    light: '#70276c',
  },
  transparentColor: 'rgba(0,0,0,0.5)',
  transparentColorLight: 'rgba(0,0,0,0.3)',
  white: {
    white: '#ffffff',
    whiteOp: '#E8E8E8',
    bgWhite: '#F7FBF9',
    silverWhite: '#EBE4D9',
    creamy: '#ffe3e3',
    simple: '#f2f6fc',
  },
  black: {
    black: '#000000',
    darkDeep: '#090b0e',
    light: '#9F9F9F',
    lightBlack: '#767D90',
    shadow: 'rgba(0,0,0, 0.7)',
    simpleLight: '#333333',
    mid: '#1E1E1F',
    brown: '#333333',
  },
  grey: {
    towerGrey: '#afb8bb',
    bgGrey: '#BDBDBD',
    greyLevel1: '#777777',
    grey: '#E4E7EB',
    switchGrey: '#E4E4E4',
    dimGrey: '#ACACAC',
    gray: 'rgba(118, 125, 144, 1)',
    midGray: 'rgba(146, 148, 151, 1)',
    simple: '#DDDDDD',
    placeholderGrey: '#c5c5c7',
    simpleGrey: '#86878B',
  },
  red: {
    warning: '#E35252',
    mainColor: '#7E2A70',
    darkRed: '#EA4359',
    lightRed: '#902b38',
  },
  green: {
    lightGreen: '#EFF3F2',
    primaryLight: '#76E2C6',
    primaryLightButton: '#57dbba',
  },
  blue: {
    lightBlue: '#5db9ce',
    seeMoreBlue: '#17444f',
  },
};

export const BottomBarList = [
  {
    icon: AppImages.bottomBar.Home,
    selectedIcon: AppImages.bottomBar.HomeFilled,
    title: AppStrings.bottomBar.home,
  },
  {
    icon: AppImages.bottomBar.followerIcon,
    selectedIcon: AppImages.bottomBar.FollowersFilled,
    title: AppStrings.bottomBar.followers,
  },
  {
    icon: AppImages.bottomBar.PlusIcon,
    title: AppStrings.bottomBar.createVideo,
  },
  {
    icon: AppImages.bottomBar.Message,
    selectedIcon: AppImages.bottomBar.MessageFilled,
    title: AppStrings.bottomBar.notification,
  },
  {
    icon: AppImages.bottomBar.Profile,
    selectedIcon: AppImages.bottomBar.ProfileFilled,
    title: AppStrings.bottomBar.profile,
  },
];
export const imagePickerConstants = [
  {
    id: 1,
    image: AppImages.Auth.GalleryPicker,
    text: 'Upload from Gallery',
  },
  {
    id: 1,
    image: AppImages.Auth.CameraPicker,
    text: 'Take a photo from Camera',
  },
];

export const profileTabArr = [
  {
    id: 1,
    isSelected: false,
    txt: 'Feed',
  },
  {
    id: 2,
    isSelected: false,
    txt: 'Analytics',
  },
  {
    id: 1,
    isSelected: false,
    txt: 'Info',
  },
];

export const profileTabArrForOtherUser = [
  {
    id: 1,
    isSelected: false,
    txt: 'Feed',
  },
];

export const prefixCodes = {
  AF: '93',
  AE: '971',
  AL: '355',
  AN: '599',
  AS: '1684',
  AD: '376',
  AO: '244',
  AI: '1264',
  AG: '1268',
  AR: '54',
  AM: '374',
  AW: '297',
  AU: '61',
  AT: '43',
  AZ: '994',
  BS: '1242',
  BH: '973',
  BF: '226',
  BI: '257',
  BD: '880',
  BB: '1246',
  BY: '375',
  BE: '32',
  BZ: '501',
  BJ: '229',
  BM: '1441',
  BT: '975',
  BA: '387',
  BW: '267',
  BR: '55',
  BG: '359',
  BO: '591',
  BL: '590',
  BN: '673',
  CC: '61',
  CD: '243',
  CI: '225',
  KH: '855',
  CM: '237',
  // CA: '1',
  CV: '238',
  KY: '345',
  CF: '236',
  CH: '41',
  CL: '56',
  CN: '86',
  CX: '61',
  CO: '57',
  KM: '269',
  CG: '242',
  CK: '682',
  CR: '506',
  CU: '53',
  CY: '537',
  CZ: '420',
  DE: '49',
  DK: '45',
  DJ: '253',
  DM: '1767',
  DO: '1849',
  DZ: '213',
  EC: '593',
  EG: '20',
  ER: '291',
  EE: '372',
  ES: '34',
  ET: '251',
  FM: '691',
  FK: '500',
  FO: '298',
  FJ: '679',
  FI: '358',
  FR: '33',
  GB: '44',
  GF: '594',
  GA: '241',
  GS: '500',
  GM: '220',
  GE: '995',
  GH: '233',
  GI: '350',
  GQ: '240',
  GR: '30',
  GG: '44',
  GL: '299',
  GD: '1473',
  GP: '590',
  GU: '1671',
  GT: '502',
  GN: '224',
  GW: '245',
  GY: '595',
  HT: '509',
  HR: '385',
  HN: '504',
  HU: '36',
  HK: '852',
  IR: '98',
  IM: '44',
  IL: '972',
  IO: '246',
  IS: '354',
  IN: '91',
  ID: '62',
  IQ: '964',
  IE: '353',
  IT: '39',
  JM: '1876',
  JP: '81',
  JO: '962',
  JE: '44',
  KP: '850',
  KR: '82',
  KZ: '77',
  KE: '254',
  KI: '686',
  KW: '965',
  KG: '996',
  KN: '1869',
  LC: '1758',
  LV: '371',
  LB: '961',
  LK: '94',
  LS: '266',
  LR: '231',
  LI: '423',
  LT: '370',
  LU: '352',
  LA: '856',
  LY: '218',
  MO: '853',
  MK: '389',
  MG: '261',
  MW: '265',
  MY: '60',
  MV: '960',
  ML: '223',
  MT: '356',
  MH: '692',
  MQ: '596',
  MR: '222',
  MU: '230',
  MX: '52',
  MC: '377',
  MN: '976',
  ME: '382',
  MP: '1670',
  MS: '1664',
  MA: '212',
  MM: '95',
  MF: '590',
  MD: '373',
  MZ: '258',
  NA: '264',
  NR: '674',
  NP: '977',
  NL: '31',
  NC: '687',
  NZ: '64',
  NI: '505',
  NE: '227',
  NG: '234',
  NU: '683',
  NF: '672',
  NO: '47',
  OM: '968',
  PK: '92',
  PM: '508',
  PW: '680',
  PF: '689',
  PA: '507',
  PG: '675',
  PY: '595',
  PE: '51',
  PH: '63',
  PL: '48',
  PN: '872',
  PT: '351',
  PR: '1939',
  PS: '970',
  QA: '974',
  RO: '40',
  RE: '262',
  RS: '381',
  RU: '7',
  RW: '250',
  SM: '378',
  SA: '966',
  SN: '221',
  SC: '248',
  SL: '232',
  SG: '65',
  SK: '421',
  SI: '386',
  SB: '677',
  SH: '290',
  SD: '249',
  SR: '597',
  SZ: '268',
  SE: '46',
  SV: '503',
  ST: '239',
  SO: '252',
  SJ: '47',
  SY: '963',
  TW: '886',
  TZ: '255',
  TL: '670',
  TD: '235',
  TJ: '992',
  TH: '66',
  TG: '228',
  TK: '690',
  TO: '676',
  TT: '1868',
  TN: '216',
  TR: '90',
  TM: '993',
  TC: '1649',
  TV: '688',
  UG: '256',
  UA: '380',
  US: '1',
  UY: '598',
  UZ: '998',
  VA: '379',
  VE: '58',
  VN: '84',
  VG: '1284',
  VI: '1340',
  VC: '1784',
  VU: '678',
  WS: '685',
  WF: '681',
  YE: '967',
  YT: '262',
  ZA: '27',
  ZM: '260',
  ZW: '263',
  AQ: '672',
};
export type packagePlanType = 'Starter' | 'Premium' | 'Elite' | 'Enterprise';

export const convertUtcToLocal = (dateString: any) => {
  let parsedDate = moment(new Date(dateString)).toDate();
  return moment(parsedDate).local();
};

///////////Dummy Data for video Player

export type singleVideoItemType = {
  id: number;
  storeName: string;
  userName: string;
  productLink: string;
  productDescription: string;
  storeLink: string;
  videoUrl: string;
};
export const vidoesListConstant: Array<singleVideoItemType> = [
  {
    id: 1,
    storeName: 'Decent Store',
    userName: 'Malik Ahmad',
    productLink: 'www.productLink.com',
    productDescription:
      'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him.',
    storeLink: 'www.storeLink.com',
    // videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4'
    videoUrl:
      'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  },
  {
    id: 2,
    storeName: 'Blender',
    userName: 'Ghafoor Khan',
    productLink: 'www.productLink.com',
    productDescription: 'The first Blender Open Movie from 2006',
    storeLink: 'www.storeLink.com',
    // videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pov-of-a-basket-of-easter-eggs-48595-large.mp4',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 3,
    storeName: 'HBO',
    userName: 'Zohair Khan',
    productLink: 'www.productLink.com',
    productDescription:
      'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.',
    storeLink: 'www.storeLink.com',
    // videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-little-girl-eating-easter-egg-chocolate-in-the-garden-48603-large.mp4',
    videoUrl:
      'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4',
  },
  {
    id: 4,
    storeName: 'Chromecast',
    userName: 'Bigger Escape',
    productLink: 'www.productLink.com',
    productDescription: `Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35.`,
    storeLink: 'www.storeLink.com',
    // videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    videoUrl:
      'https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_5mb.mp4',
  },
  {
    id: 5,
    storeName: 'Tier Chromecast',
    userName: 'Vision Pro',
    productLink: 'www.productLink.com',
    productDescription:
      'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.',
    storeLink: 'www.storeLink.com',
    // videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-selecting-bowling-balls-from-the-tray-49116-large.mp4',
    videoUrl:
      'https://sample-videos.com/video123/mp4/360/big_buck_bunny_360p_5mb.mp4',
  },
];

export const commentsConstants = [
  {
    id: 1,
    name: 'Kabir Khan',
    image:
      'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_1280.jpg',
    date: new Date().setHours(0),
    message: 'This is a simple comment. Its for simple testing purposes. ',
    userId: 'ORpWZBRC',
  },
  {
    id: 2,
    name: 'Salman Khan',
    image:
      'https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_1280.jpg',
    date: new Date().setHours(1),
    message: 'This is a simple comment. Its for simple testing purposes. ',
    userId: 'noM34k2q',
  },
  {
    id: 3,
    name: 'Kabir Khan',
    image:
      'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_1280.jpg',
    date: new Date().setHours(2),
    message: 'This is a simple comment. Its for simple testing purposes. ',
  },
  {
    id: 4,
    name: 'Salman Khan',
    image:
      'https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_1280.jpg',
    date: new Date().setHours(3),
    message: 'This is a simple comment. Its for simple testing purposes. ',
  },
  {
    id: 5,
    name: 'Kabir Khan',
    image:
      'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_1280.jpg',
    date: new Date().setHours(4),
    message: 'This is a simple comment. Its for simple testing purposes. ',
  },
  {
    id: 6,
    name: 'Salman Khan',
    image: null,
    date: new Date().setHours(6),
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
  },
];

export const followersListConstant = [
  {
    id: 1,
    name: 'Kabir Khan',
    image:
      'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_1280.jpg',
    date: new Date().setHours(0),
    message:
      'This is my profile description. Its for testing purposes for now.',
  },
  {
    id: 2,
    name: 'Salman Khan',
    image:
      'https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_1280.jpg',
    date: new Date().setHours(1),
    message:
      'This is my profile description. Its for testing purposes for now.',
  },
  {
    id: 3,
    name: 'Kabir Khan',
    image:
      'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_1280.jpg',
    date: new Date().setHours(2),
    message:
      'This is my profile description. Its for testing purposes for now.',
  },
  {
    id: 4,
    name: 'Salman Khan',
    image:
      'https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_1280.jpg',
    date: new Date().setHours(3),
    message:
      'This is my profile description. Its for testing purposes for now.',
  },
  {
    id: 5,
    name: 'Kabir Khan',
    image:
      'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_1280.jpg',
    date: new Date().setHours(4),
    message:
      'This is my profile description. Its for testing purposes for now.',
  },
  {
    id: 6,
    name: 'Salman Khan',
    image: null,
    date: new Date().setHours(6),
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
  },
];

export type socialInviteType = 'facebook' | 'email' | 'contacts';

export const socialInviteList = [
  {
    id: 1,
    name: 'Invite by Email',
    type: 'email',
    image: AppImages.Followers.MailInvite,
  },
  {
    id: 2,
    name: 'Import contacts',
    type: 'contacts',
    image: AppImages.Followers.ContactsInvite,
  },
  // {
  //   id: 3,
  //   name: 'Import Facebook friends',
  //   type: 'facebook',
  //   image: AppImages.Followers.Facebookinvite
  // },
];

export const shareOptionsList = [
  {
    id: 3,
    type: 'comment',
    image: AppImages.Videos.Comment,
  },
  {
    id: 2,
    type: 'share',
    image: AppImages.Videos.Share,
  },
  {
    id: 4,
    type: 'more',
    image: AppImages.Videos.moreIcon,
  },
];

export interface ILocation {
  address: string;
  lat: number;
  lng: number;
}

// export const calculateWindowHeight = () => {
//   let statusHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;
//   let diff = Dimensions.get('screen').height - Dimensions.get('window').height;
//   const isPoco = Platform?.constants?.Brand?.toLowerCase() == 'poco';
//   const isRedmi = Platform?.constants?.Brand?.toLowerCase() == 'redmi';
//   if (diff <= 50 && !isPoco && !isRedmi) {
//     return Dimensions.get('window').height - (diff - statusHeight - 3);
//   }
//   return Dimensions.get('window').height;
// };
export const calculateWindowHeight = () => {
  const diff =
    Dimensions.get('screen').height - Dimensions.get('window').height;
  const statusHeight = StatusBar?.currentHeight || 0;
  return Dimensions.get('screen').height - (2 > 3 ? diff : statusHeight);
};

export const makeid = (length: number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const videoHeaderOptions = [
  {
    id: 1,
    name: 'Network',
  },
  {
    id: 2,
    name: 'For Business',
  },
];

export const PITCH_IDEAS_LIST = [
  {
    id: 1,
    name: 'Day in the Life of an Employee',
    description:
      'Showcase the daily routine of an employee within your company.',
    hero_image_url: 'https://unsplash.com/photos/_h7aBovKia4',
    steps: [
      {
        step_number: 1,
        description:
          'Select an employee who is willing to share their daily work routine.',
        image_url: 'https://unsplash.com/photos/_h7aBovKia4',
      },
      {
        step_number: 2,
        description:
          'Film the employee performing various tasks throughout the day.',
        image_url: 'https://unsplash.com/photos/_h7aBovKia4',
      },
      {
        step_number: 3,
        description: 'Edit the footage to fit within the 1-minute limit.',
        image_url: 'https://unsplash.com/photos/_h7aBovKia4',
      },
      {
        step_number: 4,
        description:
          'Post the video with a catchy caption and relevant hashtags.',
        image_url: 'https://unsplash.com/photos/_h7aBovKia4',
      },
    ],
  },
  {
    id: 2,
    name: 'Product Showcase',
    description: 'Highlight the features and benefits of one of your products.',
    hero_image_url: 'https://unsplash.com/photos/f0KBLNDUtDY',
    steps: [
      {
        step_number: 1,
        description: 'Choose a product to showcase.',
        image_url: 'https://unsplash.com/photos/f0KBLNDUtDY',
      },
      {
        step_number: 2,
        description: 'Set up a clean and well-lit background.',
        image_url: 'https://unsplash.com/photos/f0KBLNDUtDY',
      },
      {
        step_number: 3,
        description: 'Film the product, highlighting its features.',
        image_url: 'https://unsplash.com/photos/f0KBLNDUtDY',
      },
      {
        step_number: 4,
        description:
          'Edit the video, adding captions or voiceover to explain features.',
        image_url: 'https://unsplash.com/photos/f0KBLNDUtDY',
      },
      {
        step_number: 5,
        description: 'Post the video with a brief description of the product.',
        image_url: 'https://unsplash.com/photos/f0KBLNDUtDY',
      },
    ],
  },
  {
    id: 3,
    name: 'Behind-the-Scenes',
    description:
      'Provide a peek into the interesting processes or tasks within your company.',
    hero_image_url: 'https://unsplash.com/photos/p2TQ-3Bh3Oo',
    steps: [
      {
        step_number: 1,
        description:
          'Identify an interesting process or task within the company.',
        image_url: 'https://unsplash.com/photos/p2TQ-3Bh3Oo',
      },
      {
        step_number: 2,
        description: 'Capture the process or task on video.',
        image_url: 'https://unsplash.com/photos/p2TQ-3Bh3Oo',
      },
      {
        step_number: 3,
        description: 'Edit the video to highlight key moments.',
        image_url: 'https://unsplash.com/photos/p2TQ-3Bh3Oo',
      },
      {
        step_number: 4,
        description:
          'Post the video with a caption explaining what viewers are seeing.',
        image_url: 'https://unsplash.com/photos/p2TQ-3Bh3Oo',
      },
    ],
  },
  {
    id: 4,
    name: 'Customer Testimonial',
    description:
      'Showcase the positive experiences of your satisfied customers.',
    hero_image_url: 'https://unsplash.com/photos/VRB1LJoTZ6w',
    steps: [
      {
        step_number: 1,
        description: 'Request a satisfied customer for a video testimonial.',
        image_url: 'https://unsplash.com/photos/VRB1LJoTZ6w',
      },
      {
        step_number: 2,
        description:
          'Record the customer talking about their positive experience.',
        image_url: 'https://unsplash.com/photos/VRB1LJoTZ6w',
      },
      {
        step_number: 3,
        description: 'Edit the video, including text overlays with key quotes.',
        image_url: 'https://unsplash.com/photos/VRB1LJoTZ6w',
      },
      {
        step_number: 4,
        description:
          'Post the video with a caption expressing gratitude to the customer.',
        image_url: 'https://unsplash.com/photos/VRB1LJoTZ6w',
      },
    ],
  },
  {
    id: 5,
    name: 'Product Unboxing',
    description:
      'Highlight the product and its packaging through an unboxing video.',
    hero_image_url: 'https://unsplash.com/photos/8manzosDSGM',
    steps: [
      {
        step_number: 1,
        description: 'Get a box containing the product you want to showcase.',
        image_url: 'https://unsplash.com/photos/8manzosDSGM',
      },
      {
        step_number: 2,
        description:
          'Film the unboxing process, highlighting the product and packaging.',
        image_url: 'https://unsplash.com/photos/8manzosDSGM',
      },
      {
        step_number: 3,
        description: 'Edit the video to show the most exciting moments.',
        image_url: 'https://unsplash.com/photos/8manzosDSGM',
      },
      {
        step_number: 4,
        description:
          'Post the video with a caption explaining what the product is.',
        image_url: 'https://unsplash.com/photos/8manzosDSGM',
      },
    ],
  },
  {
    id: 6,
    name: "How It's Made",
    description: 'Show the production process of a product your company makes.',
    hero_image_url: 'https://unsplash.com/photos/WQJvWU_HZFo',
    steps: [
      {
        step_number: 1,
        description: 'Choose a product that the company makes.',
        image_url: 'https://unsplash.com/photos/WQJvWU_HZFo',
      },
      {
        step_number: 2,
        description:
          'Record the production process, showcasing the different stages.',
        image_url: 'https://unsplash.com/photos/WQJvWU_HZFo',
      },
      {
        step_number: 3,
        description:
          'Edit the video, adding captions or voiceover to explain the process.',
        image_url: 'https://unsplash.com/photos/WQJvWU_HZFo',
      },
      {
        step_number: 4,
        description: 'Post the video with a caption describing the product.',
        image_url: 'https://unsplash.com/photos/WQJvWU_HZFo',
      },
    ],
  },
  {
    id: 7,
    name: 'Weekly Tips',
    description: 'Share valuable tips or advice on a relevant industry topic.',
    hero_image_url: 'https://unsplash.com/photos/Itj1aZOnX5E',
    steps: [
      {
        step_number: 1,
        description: 'Choose a relevant topic for your industry.',
        image_url: 'https://unsplash.com/photos/Itj1aZOnX5E',
      },
      {
        step_number: 2,
        description: 'Film a short video giving a tip or advice on that topic.',
        image_url: 'https://unsplash.com/photos/Itj1aZOnX5E',
      },
      {
        step_number: 3,
        description: 'Edit the video, adding text overlays if necessary.',
        image_url: 'https://unsplash.com/photos/Itj1aZOnX5E',
      },
      {
        step_number: 4,
        description:
          'Post the video with a catchy caption and relevant hashtags.',
        image_url: 'https://unsplash.com/photos/Itj1aZOnX5E',
      },
    ],
  },
  {
    id: 8,
    name: 'Meet the Team',
    description: 'Introduce your team or department to your audience.',
    hero_image_url: 'https://unsplash.com/photos/1JNukrENwsw',
    steps: [
      {
        step_number: 1,
        description: 'Select a team or department in the company.',
        image_url: 'https://unsplash.com/photos/1JNukrENwsw',
      },
      {
        step_number: 2,
        description:
          'Interview team members, asking them to introduce themselves.',
        image_url: 'https://unsplash.com/photos/1JNukrENwsw',
      },
      {
        step_number: 3,
        description:
          'Edit the video to feature key moments from each interview.',
        image_url: 'https://unsplash.com/photos/1JNukrENwsw',
      },
      {
        step_number: 4,
        description: 'Post the video with a caption introducing the team.',
        image_url: 'https://unsplash.com/photos/1JNukrENwsw',
      },
    ],
  },
  {
    id: 9,
    name: 'Industry News and Updates',
    description: 'Share recent news and updates from your industry.',
    hero_image_url: 'https://unsplash.com/photos/8OyKWQgJv5c',
    steps: [
      {
        step_number: 1,
        description: 'Research recent industry news and updates.',
        image_url: 'https://unsplash.com/photos/8OyKWQgJv5c',
      },
      {
        step_number: 2,
        description: 'Record a video summarizing the news.',
        image_url: 'https://unsplash.com/photos/8OyKWQgJv5c',
      },
      {
        step_number: 3,
        description:
          'Edit the video, adding text overlays or images to support the content.',
        image_url: 'https://unsplash.com/photos/8OyKWQgJv5c',
      },
      {
        step_number: 4,
        description: 'Post the video with a caption and relevant hashtags.',
        image_url: 'https://unsplash.com/photos/8OyKWQgJv5c',
      },
    ],
  },
  {
    id: 10,
    name: 'Q&A Session',
    description: 'Answer questions from your followers or customers.',
    hero_image_url: 'https://unsplash.com/photos/Lu2pfy_8VKg',
    steps: [
      {
        step_number: 1,
        description: 'Collect questions from followers or customers.',
        image_url: 'https://unsplash.com/photos/Lu2pfy_8VKg',
      },
      {
        step_number: 2,
        description: 'Record a video answering the most interesting questions.',
        image_url: 'https://unsplash.com/photos/Lu2pfy_8VKg',
      },
      {
        step_number: 3,
        description: 'Edit the video to fit within the 1-minute limit.',
        image_url: 'https://unsplash.com/photos/Lu2pfy_8VKg',
      },
      {
        step_number: 4,
        description:
          'Post the video with a caption encouraging further questions.',
        image_url: 'https://unsplash.com/photos/Lu2pfy_8VKg',
      },
    ],
  },
  {
    id: 11,
    name: 'Event Recap',
    description:
      'Share highlights from a relevant industry event or conference.',
    hero_image_url: 'https://unsplash.com/photos/U5rMrSI7Pn4',
    steps: [
      {
        step_number: 1,
        description: 'Attend a relevant industry event or conference.',
        image_url: 'https://unsplash.com/photos/U5rMrSI7Pn4',
      },
      {
        step_number: 2,
        description:
          'Capture footage of key moments and interesting happenings.',
        image_url: 'https://unsplash.com/photos/U5rMrSI7Pn4',
      },
      {
        step_number: 3,
        description: 'Edit the video to showcase the highlights.',
        image_url: 'https://unsplash.com/photos/U5rMrSI7Pn4',
      },
      {
        step_number: 4,
        description: 'Post the video with a caption summarizing the event.',
        image_url: 'https://unsplash.com/photos/U5rMrSI7Pn4',
      },
    ],
  },
  {
    id: 12,
    name: 'Success Story',
    description: 'Celebrate a successful project or collaboration.',
    hero_image_url: 'https://unsplash.com/photos/Kgjx2DYSpmU',
    steps: [
      {
        step_number: 1,
        description: 'Identify a successful project or collaboration.',
        image_url: 'https://unsplash.com/photos/Kgjx2DYSpmU',
      },
      {
        step_number: 2,
        description: 'Record a video talking about the process and results.',
        image_url: 'https://unsplash.com/photos/Kgjx2DYSpmU',
      },
      {
        step_number: 3,
        description: 'Edit the video, adding images or text overlays.',
        image_url: 'https://unsplash.com/photos/Kgjx2DYSpmU',
      },
      {
        step_number: 4,
        description: 'Post the video with a caption celebrating the success.',
        image_url: 'https://unsplash.com/photos/Kgjx2DYSpmU',
      },
    ],
  },
  {
    id: 13,
    name: 'Office Tour',
    description: 'Showcase your office space to your audience.',
    hero_image_url: 'https://unsplash.com/photos/vlMzUxmY4zI',
    steps: [
      {
        step_number: 1,
        description: 'Plan the route for your office tour.',
        image_url: 'https://unsplash.com/photos/vlMzUxmY4zI',
      },
      {
        step_number: 2,
        description:
          'Film a walkthrough of the office, highlighting key areas.',
        image_url: 'https://unsplash.com/photos/vlMzUxmY4zI',
      },
      {
        step_number: 3,
        description: 'Edit the video to fit within the 1-minute limit.',
        image_url: 'https://unsplash.com/photos/vlMzUxmY4zI',
      },
      {
        step_number: 4,
        description:
          'Post the video with a caption welcoming viewers into your office.',
        image_url: 'https://unsplash.com/photos/vlMzUxmY4zI',
      },
    ],
  },
  {
    id: 14,
    name: 'New Feature Announcement',
    description: 'Announce a new feature or product and explain its benefits.',
    hero_image_url: 'https://unsplash.com/photos/pTCcjsIACWk',
    steps: [
      {
        step_number: 1,
        description: 'Choose a new feature or product to announce.',
        image_url: 'https://unsplash.com/photos/pTCcjsIACWk',
      },
      {
        step_number: 2,
        description: 'Record a video explaining the feature and its benefits.',
        image_url: 'https://unsplash.com/photos/pTCcjsIACWk',
      },
      {
        step_number: 3,
        description: 'Edit the video, adding text overlays or images.',
        image_url: 'https://unsplash.com/photos/pTCcjsIACWk',
      },
      {
        step_number: 4,
        description:
          'Post the video with a caption announcing the new feature.',
        image_url: 'https://unsplash.com/photos/pTCcjsIACWk',
      },
    ],
  },
  {
    id: 15,
    name: 'Throwback Thursday',
    description: 'Reminisce about a past achievement, event, or project.',
    hero_image_url: 'https://unsplash.com/photos/vNqmeYPN0ek',
    steps: [
      {
        step_number: 1,
        description: 'Select a past achievement, event, or project.',
        image_url: 'https://unsplash.com/photos/vNqmeYPN0ek',
      },
      {
        step_number: 2,
        description: 'Compile images and video clips from that time.',
        image_url: 'https://unsplash.com/photos/vNqmeYPN0ek',
      },
      {
        step_number: 3,
        description: 'Edit the video to showcase the highlights.',
        image_url: 'https://unsplash.com/photos/vNqmeYPN0ek',
      },
      {
        step_number: 4,
        description:
          'Post the video with a caption reminiscing about the moment.',
        image_url: 'https://unsplash.com/photos/vNqmeYPN0ek',
      },
    ],
  },
];
