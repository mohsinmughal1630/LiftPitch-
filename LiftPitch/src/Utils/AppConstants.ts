import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
import moment from 'moment';
import {AppStrings} from './Strings';
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
    followerIcon: require('../Ui/assets/images/BottomBar/followerIcon.png'),
    Message: require('../Ui/assets/images/BottomBar/Message.png'),
    PlusIcon: require('../Ui/assets/images/BottomBar/PlusIcon.png'),
    Profile: require('../Ui/assets/images/BottomBar/Profile.png'),
  },
  Chat: {
    SendIcon: require('../Ui/assets/images/Chat/SendIcon.png'),
    Voice: require('../Ui/assets/images/Chat/Voice.png'),
    Attachment: require('../Ui/assets/images/Chat/Attachment.png'),
    Camera: require('../Ui/assets/images/Chat/Camera.png'),
    Gallery: require('../Ui/assets/images/Chat/Gallery.png'),
    Video: require('../Ui/assets/images/Chat/Video.png'),
    Document: require('../Ui/assets/images/Chat/Document.png'),
  },
  createVideo: {
    galleryIcon: require('../Ui/assets/images/CreateVideo/galleryIcon.png'),
    smileIcon: require('../Ui/assets/images/CreateVideo/smileIcon.png'),
    CloseIcon: require('../Ui/assets/images/CreateVideo/CloseIcon.png'),
    FiltersIcon: require('../Ui/assets/images/CreateVideo/FiltersIcon.png'),
    flash: require('../Ui/assets/images/CreateVideo/flash.png'),
    MagicPenIcon: require('../Ui/assets/images/CreateVideo/MagicPenIcon.png'),
    FlipIcon: require('../Ui/assets/images/CreateVideo/FlipIcon.png'),
    musicIcon: require('../Ui/assets/images/CreateVideo/musicIcon.png'),
    SpeedIcon: require('../Ui/assets/images/CreateVideo/SpeedIcon.png'),
    TimerIcon: require('../Ui/assets/images/CreateVideo/TimerIcon.png'),
  },
  Videos: {
    Play: require('../Ui/assets/images/Videos/Play.png'),
    Comment: require('../Ui/assets/images/Videos/Comment.png'),
    Report: require('../Ui/assets/images/Videos/Report.png'),
    Share: require('../Ui/assets/images/Videos/Share.png'),
    Error: require('../Ui/assets/images/Videos/Error.png'),
    PauseIcon: require('../Ui/assets/images/Videos/PauseIcon.png'),
    moreIcon: require('../Ui/assets/images/Videos/moreIcon.png'),
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
  },
};
export const AppFonts = {};
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
    creamy: '#FBF5F4',
  },
  black: {
    black: '#000000',
    darkDeep: '#090b0e',
    light: '#9F9F9F',
    lightBlack: '#767D90',
    shadow: 'rgba(0,0,0, 0.7)',
    simpleLight: '#333333',
    blackRGBA: 'rgba(30, 30, 31, 1)',
    mid: '#1E1E1F',
    brown: '#333333',
  },
  grey: {
    towerGrey: '#afb8bb',
    bgGrey: '#BDBDBD',
    greyLevel1: '#E8E8E8',
    grey: '#E4E7EB',
    switchGrey: '#E4E4E4',
    dimGrey: '#ACACAC',
    gray: 'rgba(118, 125, 144, 1)',
    gray2: 'rgba(215, 215, 215, 1)',
    grayLight: 'rgba(226, 227, 228, 1)',
    grayExtraLight: 'rgba(234, 236, 237, 1)',
    midGray: 'rgba(146, 148, 151, 1)',
    simple: '#DDDDDD',
    placeholderGrey: '#c5c5c7',
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
    title: AppStrings.bottomBar.home,
  },
  {
    icon: AppImages.bottomBar.followerIcon,
    title: AppStrings.bottomBar.followers,
  },
  {
    icon: AppImages.bottomBar.PlusIcon,
    title: AppStrings.bottomBar.createVideo,
  },
  {
    icon: AppImages.bottomBar.Message,
    title: AppStrings.bottomBar.notification,
  },
  {
    icon: AppImages.bottomBar.Profile,
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
  const isPoco = Platform?.constants?.Brand?.toLowerCase() == 'poco';
  const isRedmi = Platform?.constants?.Brand?.toLowerCase() == 'redmi';
  const statusHeight = StatusBar?.currentHeight || 0;
  return Dimensions.get('screen').height - statusHeight;
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
