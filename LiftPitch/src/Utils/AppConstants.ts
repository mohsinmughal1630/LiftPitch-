import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions, Platform, PixelRatio} from 'react-native';
import {ActiveFunctionTypeStrings, PackageDetailStrings, SocialTypeStrings} from './AppEnums';
import {cardPronounTypes} from './AppEnums';
import CommonDataManager from './CommonManager';
import {UserViewModel} from '../Models/UserViewModel';
import moment from 'moment';
export const platformVersion = Platform.Version;
export type ScreenProps = StackScreenProps<any, any>;
export const ScreenSize = Dimensions.get('screen');
const templateWidth = 375;
const templateHeight = 812;
const widthRatio = ScreenSize.width / templateWidth;
const heightRatio = ScreenSize.height / templateHeight;
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

export const AppImages = {
  Auth: {
    ContactLogo: require('../Ui/assets/images/Auth/ContactLogo.png'),
    Slider1: require('../Ui/assets/images/Auth/Slider1.png'),
    Slider2: require('../Ui/assets/images/Auth/Slider2.png'),
    Slider3: require('../Ui/assets/images/Auth/Slider3.png'),
    ShowPassword: require('../Ui/assets/images/Auth/ShowPassword.png'),
    HidePassword: require('../Ui/assets/images/Auth/HidePassword.png'),
    FacebookIcon: require('../Ui/assets/images/Auth/FacebookIcon.png'),
    TwitterIcon: require('../Ui/assets/images/Auth/TwitterIcon.png'),
    InstagramIcon: require('../Ui/assets/images/Auth/InstagramIcon.png'),
    LinkedInIcon: require('../Ui/assets/images/Auth/LinkedInIcon.png'),
    GoogleIcon: require('../Ui/assets/images/Auth/GoogleIcon.png'),
    AppleIcon: require('../Ui/assets/images/Auth/AppleIcon.png'),
  },
  Home: {
    ContactLogoGreen: require('../Ui/assets/images/Home/Home/ContactLogoGreen.png'),
    EmptyHomeBanner: require('../Ui/assets/images/Home/Home/EmptyHomeBanner.png'),
    VenmoIcon: require('../Ui/assets/images/Home/Home/VenmoIcon.png'),
    CashAppIcon: require('../Ui/assets/images/Home/Home/CashAppIcon.png'),
    LinkIcon: require('../Ui/assets/images/Home/Home/LinkIcon.png'),
    BindBraceletBanner: require('../Ui/assets/images/Home/Home/BindBraceletBanner.png'),
    BindBraceletHomeBg: require('../Ui/assets/images/Home/Home/BindBraceletHomeBg.png'),
    EmergencyContactPlaceholder: require('../Ui/assets/images/Home/Home/EmergencyContactPlaceholder.png'),
  },
  Common: {
    CameraPicker: require('../Ui/assets/images/Common/CameraPicker.png'),
    GalleryPicker: require('../Ui/assets/images/Common/GalleryPicker.png'),
    ThreeDotsIcon: require('../Ui/assets/images/Common/ThreeDotsIcon.png'),
    LinkMiniIcon: require('../Ui/assets/images/Common/LinkMiniIcon.png'),
    CrossIconFilled: require('../Ui/assets/images/Common/CrossIconFilled.png'),
    CrossIcon: require('../Ui/assets/images/Common/CrossIcon.png'),
    ProfilePlaceholderIcon: require('../Ui/assets/images/Common/ProfilePlaceholderIcon.png'),
    ShortArrowForward: require('../Ui/assets/images/Common/ShortArrowForward.png'),
    WarningIcon: require('../Ui/assets/images/Common/WarningIcon.png'),
    AppIcon: require('../Ui/assets/images/Common/AppIcon.png'),
    RoundAppIcon: require('../Ui/assets/images/Common/RoundAppIcon.png'),
    RoundAppIconTransparent: require('../Ui/assets/images/Common/RoundAppIconTransparent.png'),
  },
  Cards: {
    ArrowBack: require('../Ui/assets/images/Cards/ArrowBack.png'),
    MenuIcon: require('../Ui/assets/images/Cards/MenuIcon.png'),
    MenuIconInverted: require('../Ui/assets/images/Cards/MenuIconInverted.png'),
    EmptyCards: require('../Ui/assets/images/Cards/EmptyCards.png'),
    ChooseCard: require('../Ui/assets/images/Cards/ChooseCard.png'),
    DropDown: require('../Ui/assets/images/Cards/DropDown.png'),
    DropDownOutlined: require('../Ui/assets/images/Cards/DropDownOutlined.png'),
    TickIcon: require('../Ui/assets/images/Cards/TickIcon.png'),
    SingleTickIcon: require('../Ui/assets/images/Cards/SingleTickIcon.png'),
    SingleDarkTick: require('../Ui/assets/images/Cards/SingleDarkTick.png'),
    SingleTickIconBold: require('../Ui/assets/images/Cards/SingleTickIconBold.png'),
    NextButton: require('../Ui/assets/images/Cards/NextButton.png'),
    CardPerson: require('../Ui/assets/images/Cards/CardPerson.png'),
    CardImagePlaceholder: require('../Ui/assets/images/Cards/CardImagePlaceholder.png'),
    CardContact: require('../Ui/assets/images/Cards/CardContact.png'),
    SocialProfileFrame: require('../Ui/assets/images/Cards/SocialProfileFrame.png'),
    SocialProfileFrame2: require('../Ui/assets/images/Cards/SocialProfileFrame2.png'),
    BinIcon: require('../Ui/assets/images/Cards/BinIcon.png'),
    CrossIcon: require('../Ui/assets/images/Cards/CrossIcon.png'),
    DocumentIcon: require('../Ui/assets/images/Cards/DocumentIcon.png'),
    LocationIcon: require('../Ui/assets/images/Cards/LocationIcon.png'),
    LocationUnfilledIcon: require('../Ui/assets/images/Cards/LocationUnfilledIcon.png'),
    MailIcon: require('../Ui/assets/images/Cards/MailIcon.png'),
    MailUnfilledIcon: require('../Ui/assets/images/Cards/MailUnfilledIcon.png'),
    WebsiteIcon: require('../Ui/assets/images/Cards/WebsiteIcon.png'),
    PhoneIcon: require('../Ui/assets/images/Cards/PhoneIcon.png'),
    OfficePhoneIcon: require('../Ui/assets/images/Cards/OfficePhoneIcon.png'),
    HomePhoneIcon: require('../Ui/assets/images/Cards/HomePhoneIcon.png'),
    CardCompanyDetailsBanner: require('../Ui/assets/images/Cards/CardCompanyDetailsBanner.png'),
    CardBioBgIcon: require('../Ui/assets/images/Cards/CardBioBgIcon.png'),
    EditIcon: require('../Ui/assets/images/Cards/EditIcon.png'),
    ShareIcon: require('../Ui/assets/images/Cards/ShareIcon.png'),
    QRIcon: require('../Ui/assets/images/Cards/QRIcon.png'),
    QrIconGrey: require('../Ui/assets/images/Cards/QrIconGrey.png'),
    QRPlaceholder: require('../Ui/assets/images/Cards/QRPlaceholder.png'),
    DownloadIcon: require('../Ui/assets/images/Cards/DownloadIcon.png'),
    PreviewBg: require('../Ui/assets/images/Cards/PreviewBg.png'),
    GradientBg: require('../Ui/assets/images/Cards/GradientBg.png'),
    ExclamationIcon: require('../Ui/assets/images/Cards/ExclamationIcon.png'),
    CompanyLogoPlaceholder: require('../Ui/assets/images/Cards/CompanyLogoPlaceholder.png'),
    ExclamationMiniIcon: require('../Ui/assets/images/Cards/ExclamationMiniIcon.png'),
    ArrowCurl: require('../Ui/assets/images/Cards/ArrowCurl.png'),
    PhonebookIcon: require('../Ui/assets/images/Cards/PhonebookIcon.png'),
    FunctionHomeIcons: {
      CashApp: require('../Ui/assets/images/Cards/CashAppIcon.png'),
      Emergency: require('../Ui/assets/images/Cards/EmergencyContactIcon.png'),
      Card: require('../Ui/assets/images/Cards/FunctionCardIcon.png'),
      Link: require('../Ui/assets/images/Cards/LinkIcon.png'),
      Venmo: require('../Ui/assets/images/Cards/VenmoIcon.png'),
      PaymentIcon: require('../Ui/assets/images/Cards/PaymentIcon.png'),
      UploadFilesIcon: require('../Ui/assets/images/Cards/UploadFilesIcon.png'),
    },
    Emergency: {
      EmptyEmergencyCardsCover: require('../Ui/assets/images/Cards/Emergency/EmptyEmergencyCardsCover.png'),
      EmergencyDeleteIcon: require('../Ui/assets/images/Cards/Emergency/EmergencyDeleteIcon.png'),
      EmergencyScanIcon: require('../Ui/assets/images/Cards/Emergency/EmergencyScanIcon.png'),
    },
    CustomUrls: {
      EmptyCustomUrlBg: require('../Ui/assets/images/Cards/CustomUrls/EmptyCustomUrlBg.png'),
      AddUrlCover: require('../Ui/assets/images/Cards/CustomUrls/AddUrlCover.png'),
    },
    Venmo: {
      EmptyVenmoBg: require('../Ui/assets/images/Cards/Venmo/EmptyVenmoBg.png'),
    },
  },
  Container: {
    BottomBar: {
      Home: require('../Ui/assets/images/Home/BottomBar/Home.png'),
      Contact: require('../Ui/assets/images/Home/BottomBar/Contact.png'),
      Shop: require('../Ui/assets/images/Home/BottomBar/Shop.png'),
      Scan: require('../Ui/assets/images/Home/BottomBar/Scan.png'),
      Setting: require('../Ui/assets/images/Home/BottomBar/Setting.png'),
      SoloFunctionIcon: require('../Ui/assets/images/Home/BottomBar/SoloFunctionIcon.png'),
    },
  },
  Profile: {
    CameraIcon: require('../Ui/assets/images/Profile/CameraIcon.png'),
    BirthdayIcon: require('../Ui/assets/images/Profile/BirthdayIcon.png'),
    GenderIcon: require('../Ui/assets/images/Profile/GenderIcon.png'),
    JobIcon: require('../Ui/assets/images/Profile/JobIcon.png'),
    JobIconFilled: require('../Ui/assets/images/Profile/JobIconFilled.png'),
    PersonIcon: require('../Ui/assets/images/Profile/PersonIcon.png'),
    PersonIconBold: require('../Ui/assets/images/Profile/PersonIconBold.png'),
    PersonIconMedium: require('../Ui/assets/images/Profile/PersonIconMedium.png'),
    PhoneIcon: require('../Ui/assets/images/Profile/PhoneIcon.png'),
    ProfileEditIcon: require('../Ui/assets/images/Profile/ProfileEditIcon.png'),
  },
  Drawer: {
    BackIcon: require('../Ui/assets/images/Drawer/BackIcon.png'),
    NotificationIcon: require('../Ui/assets/images/Drawer/NotificationIcon.png'),
    NotificationIconUnread: require('../Ui/assets/images/Drawer/NotificationIconUnread.png'),
    dummyProfilePlaceholder: {
      uri: 'https://cdn.pixabay.com/photo/2017/09/27/16/06/man-2792549_1280.jpg',
    },
    HelpIcon: require('../Ui/assets/images/Drawer/HelpIcon.png'),
    LogoutIcon: require('../Ui/assets/images/Drawer/LogoutIcon.png'),
    AnalyticsIcon: require('../Ui/assets/images/Drawer/AnalyticsIcon.png'),
    UnlinkBracelet: require('../Ui/assets/images/Drawer/UnlinkBracelet.png'),
  },
  Contacts: {
    FilterIcon: require('../Ui/assets/images/Contact/filter_icon.png'),
    GirdIcon: require('../Ui/assets/images/Contact/grid_icon.png'),
    ListIcon: require('../Ui/assets/images/Contact/list_icon.png'),
    SelectedFilterIcon: require('../Ui/assets/images/Contact/selected_filter_icon.png'),
    SelectedGridIcon: require('../Ui/assets/images/Contact/selected_grid_icon.png'),
    UnselectedListIcon: require('../Ui/assets/images/Contact/unselected_list_icon.png'),
    selected_radio_btn: require('../Ui/assets/images/Contact/selected_green_btn.png'),
    unselected_radio_btn: require('../Ui/assets/images/Contact/unselected_gray_btn.png'),
    SearchIcon: require('../Ui/assets/images/Contact/SearchIcon.png'),
    EditIcon: require('../Ui/assets/images/Contact/edit_vec.png'),
    DeleteIcon: require('../Ui/assets/images/Contact/delete_vec.png'),
    ShareIcon: require('../Ui/assets/images/Contact/share.png'),
    InputSearchIcon: require('../Ui/assets/images/Contact/search_vec.png'),
    InputSearchIconGray: require('../Ui/assets/images/Contact/search_icon.png'),
    SearchIconMini: require('../Ui/assets/images/Contact/SearchIconMini.png'),
  },
  DynamicLink: {
    CardsEmptyView: require('../Ui/assets/images/DynamicLinks/emptydynamiclinkView.png'),
    HangDrag: require('../Ui/assets/images/DynamicLinks/hang_drag.png'),
    EditPencil: require('../Ui/assets/images/DynamicLinks/edit_pencil.png'),
    shareIcon: require('../Ui/assets/images/DynamicLinks/share.png'),
    ProfileImg: require('../Ui/assets/images/DynamicLinks/profileImg.png'),
    Facebook: require('../Ui/assets/images/DynamicLinks/facebook.png'),
    Twitter: require('../Ui/assets/images/DynamicLinks/twitter.png'),
    Snapchat: require('../Ui/assets/images/DynamicLinks/snapchat.png'),
    Pintrest: require('../Ui/assets/images/DynamicLinks/pintrest.png'),
    Youtube: require('../Ui/assets/images/DynamicLinks/Youtube.png'),
  },
  UpgradeAccount: {
    Aeroplan: require('../Ui/assets/images/UpgradeAccount/aeroplan.png'),
    Rocket: require('../Ui/assets/images/UpgradeAccount/rocket.png'),
    Message: require('../Ui/assets/images/UpgradeAccount/messageVec.png'),
    UpgradeIcon: require('../Ui/assets/images/UpgradeAccount/upgradeIcon.png')
  },
  ChangePassword: {
    rightArrow: require('../Ui/assets/images/ChangePassword/next_arrow.png'),
  },
  Settings: {
    SettingsAboutIcon: require('../Ui/assets/images/Settings/SettingsAboutIcon.png'),
    CustomerCareIcon: require('../Ui/assets/images/Settings/CustomerCareIcon.png'),
    HelpFaqIcon: require('../Ui/assets/images/Settings/HelpFaqIcon.png'),
    SettingsLogoutIcon: require('../Ui/assets/images/Settings/SettingsLogoutIcon.png'),
    SettingsMiniArrowForward: require('../Ui/assets/images/Settings/SettingsMiniArrowForward.png'),
    SettingsNotificationIcon: require('../Ui/assets/images/Settings/SettingsNotificationIcon.png'),
    SettingsPasswordLockIcon: require('../Ui/assets/images/Settings/SettingsPasswordLockIcon.png'),
    SettingsPersonIcon: require('../Ui/assets/images/Settings/SettingsPersonIcon.png'),
    SettingsUpgradeAccountIcon: require('../Ui/assets/images/Settings/SettingsUpgradeAccountIcon.png'),
    EmailSettings: require('../Ui/assets/images/Settings/EmailSettings.png'),
    NotificationSettings: require('../Ui/assets/images/Settings/NotificationSettings.png'),
    Help: {
      ExclamationIcon: require('../Ui/assets/images/Settings/Help/ExclamationIcon.png'),
      PhoneIcon: require('../Ui/assets/images/Settings/Help/PhoneIcon.png'),
      VideoIcon: require('../Ui/assets/images/Settings/Help/VideoIcon.png'),
      FaqIcon: require('../Ui/assets/images/Settings/Help/FaqIcon.png'),
      TermsIcon: require('../Ui/assets/images/Settings/Help/TermsIcon.png'),
      PrivacyIcon: require('../Ui/assets/images/Settings/Help/PrivacyIcon.png'),
      help: require('../Ui/assets/images/Settings/Help/help.png'),
    },
    FAQ: require('../Ui/assets/images/Settings/faq.png'),
    dropDown: require('../Ui/assets/images/Settings/dropDown.png'),
    termsnCondition: require('../Ui/assets/images/Settings/termsnConditionPic.png'),
    aboutUs: require('../Ui/assets/images/Settings/aboutUs.png'),
    contactUs: require('../Ui/assets/images/Settings/contactUs.png'),
    location: require('../Ui/assets/images/Settings/location.png'),
    phone: require('../Ui/assets/images/Settings/phone.png'),
    email: require('../Ui/assets/images/Settings/Help/email.png'),
    Restore: require('../Ui/assets/images/Settings/Restore.png'),
  },
  AboutUs: {
    aboutUsLogo: require('../Ui/assets/images/AboutUs/aboutUsLogo.png'),
  },
  ContactUs: {
    aboutUsLogo: require('../Ui/assets/images/ContactUs/contactUslogo.png'),
    locationPinIcon: require('../Ui/assets/images/ContactUs/location.png'),
    instagramIcon: require('../Ui/assets/images/ContactUs/instagram.png'),
    phoneIcon: require('../Ui/assets/images/ContactUs/phone.png'),
    linkedInIcon: require('../Ui/assets/images/ContactUs/linked.png'),
    facebookIcon: require('../Ui/assets/images/DynamicLinks/facebook.png'),
    twitterIcon: require('../Ui/assets/images/DynamicLinks/twitter.png'),
    tiktokIcon: require('../Ui/assets/images/Cards/social/TiktokIcon.png'),
  },
  Tutorials: {
    playbutton: require('../Ui/assets/images/tutorials/playbutton.png'),
    tutorialsBackground: require('../Ui/assets/images/tutorials/tutorialsbg.png'),
    VideoError: require('../Ui/assets/images/tutorials/VideoError.png'),
  },
  Teams: {
    TeamMembersIcon: require('../Ui/assets/images/Teams/TeamMembersIcon.png'),
    SingleUserIcon: require('../Ui/assets/images/Teams/SingleUserIcon.png'),
  },
};
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
  transparentColor: 'rgba(0,0,0,0.5)',
  transparentColorLight: 'rgba(0,0,0,0.3)',
  white: {
    white: '#ffffff',
    whiteOp: '#E8E8E8',
  },
  black: {
    black: '#000000',
    darkDeep: '#090b0e',
  },
  grey: {
    toastColor: '#62656c',
    bgGrey: '#BDBDBD',
    greyLevel1: '#E8E8E8',
  },
  red: {
    warning: '#E35252',
  },
  green: {
    primaryLight: '#76E2C6',
    primaryLightButton: '#57dbba',
  },
};

export const Sliders = [
  {
    id: '1',
    img: AppImages.Auth.Slider1,
    title: 'Memorable connections, just one tap away.',
  },
  {
    id: '2',
    img: AppImages.Auth.Slider2,
    title: 'Unlock help with a simple tap.',
  },
  {
    id: '3',
    img: AppImages.Auth.Slider3,
    title: 'Share payment information with a tap.',
  },
];
export const ListTab = [
  {
    id: '1',
    category: 'top',
  },
  {
    id: '2',
    category: 'recent',
  },
  {
    id: '3',
    category: 'fav',
  },
  {
    id: '4',
    category: 'new',
  },
  {
    id: '5',
    category: 'nearBy',
  },
];

export const socialList = [
  {
    id: '1',
    img: AppImages.Auth.FacebookIcon,
    name: SocialTypeStrings.facebook,
  },
  // {
  //   id: '2',
  //   img: AppImages.Auth.TwitterIcon
  // },
  // {
  //   id: '3',
  //   img: AppImages.Auth.LinkedInIcon
  // },
  // {
  //   id: '2',
  //   img: AppImages.Auth.InstagramIcon,
  // },
  {
    id: '2',
    img: AppImages.Auth.GoogleIcon,
    name: SocialTypeStrings.google,
  },
  {
    id: '3',
    img: AppImages.Auth.AppleIcon,
    name: SocialTypeStrings.apple,
  },
];

export const bottomBarList = [
  {
    image: AppImages.Container.BottomBar.Home,
    title: 'home',
  },
  {
    image: AppImages.Container.BottomBar.Contact,
    title: 'connections',
  },
  {
    image: '',
    title: 'function',
  },
  {
    image: AppImages.Container.BottomBar.Shop,
    title: 'shop',
  },
  {
    image: AppImages.Container.BottomBar.Scan,
    title: 'scan',
  },
];

export const cardsImages = [
  {
    img: require('../Ui/assets/images/Home/Home/CardImage1.png'),
    id: '1',
  },
  {
    img: require('../Ui/assets/images/Home/Home/CardImage2.png'),
    id: '2',
  },
  {
    img: require('../Ui/assets/images/Home/Home/CardImage3.png'),
    id: '3',
  },
];

export const cardsHomeList = [
  {
    id: '1',
    title: 'Your Cards',
    label: 'Your Personal And Business Cards',
    images: cardsImages,
  },
];

export const paymentHomeList = [
  {
    id: '1',
    title: 'Venmo',
    label: 'Your Venmo Account Is Linked',
    images: [
      {
        img: AppImages.Home.VenmoIcon,
        id: '1',
      },
    ],
  },
  {
    id: '1',
    title: 'Cash App',
    label: 'Your Cash App Account Is Linked',
    images: [
      {
        img: AppImages.Home.CashAppIcon,
        id: '1',
      },
    ],
  },
];

export const emergencyHomeList = [
  {
    id: '1',
    title: 'Johns Smith',
    label: 'Lorem Ipsum #1',
    images: [
      {
        img: require('../Ui/assets/images/Home/Home/CardImage2.png'),
        id: '1',
      },
    ],
  },
];
export const customUrlList = [
  {
    id: '1',
    title: 'Link #1',
    label: 'Website.Com',
    images: [
      {
        img: AppImages.Home.LinkIcon,
        id: '1',
      },
    ],
  },
  {
    id: '2',
    title: 'Link #1',
    label: 'Website.Com',
    images: [
      {
        img: AppImages.Home.LinkIcon,
        id: '1',
      },
    ],
  },
  {
    id: '3',
    title: 'Link #1',
    label: 'Website.Com',
    images: [
      {
        img: AppImages.Home.LinkIcon,
        id: '1',
      },
    ],
  },
];
export const functionButtonsList = [
  {
    id: 1,
    title: 'Read',
  },
  {
    id: 2,
    title: 'Link',
  },
];

export const cardTypeConstants = ['Personal', 'Business'];

export const cardBgList = [
  {
    id: 1,
    image: require('../Ui/assets/images/Cards/Backgrounds/CardBg1.jpg'),
    fileName: 'CardBg1.png',
    cardUrl: 'images/card-background/CardBg1.png',
  },
  {
    id: 2,
    image: require('../Ui/assets/images/Cards/Backgrounds/CardBg2.jpg'),
    fileName: 'CardBg2.png',
    cardUrl: 'images/card-background/CardBg2.png',
  },
  {
    id: 3,
    image: require('../Ui/assets/images/Cards/Backgrounds/CardBg3.jpg'),
    fileName: 'CardBg3.png',
    cardUrl: 'images/card-background/CardBg3.png',
  },
  {
    id: 4,
    image: require('../Ui/assets/images/Cards/Backgrounds/CardBg4.jpg'),
    fileName: 'CardBg4.png',
    cardUrl: 'images/card-background/CardBg4.png',
  },
  {
    id: 5,
    image: require('../Ui/assets/images/Cards/Backgrounds/CardBg5.jpg'),
    fileName: 'CardBg5.png',
    cardUrl: 'images/card-background/CardBg5.png',
  },
  {
    id: 6,
    image: require('../Ui/assets/images/Cards/Backgrounds/CardBg6.jpg'),
    fileName: 'CardBg6.png',
    cardUrl: 'images/card-background/CardBg6.png',
  },
  {
    id: 7,
    image: require('../Ui/assets/images/Cards/Backgrounds/CardBg7.jpg'),
    fileName: 'CardBg7.png',
    cardUrl: 'images/card-background/CardBg7.png',
  },
  {
    id: 8,
    image: require('../Ui/assets/images/Cards/Backgrounds/CardBg8.jpg'),
    fileName: 'CardBg8.png',
    cardUrl: 'images/card-background/CardBg8.png',
  },
  {
    id: 9,
    image: require('../Ui/assets/images/Cards/Backgrounds/CardBg9.jpg'),
    fileName: 'CardBg9.png',
    cardUrl: 'images/card-background/CardBg9.png',
  },
];

export const cardSocialLinks = [
  {
    media_type: 'facebook',
    image: require('../Ui/assets/images/Cards/social/FacebookIcon.png'),
    url: '',
  },
  {
    media_type: 'youtube',
    image: require('../Ui/assets/images/Cards/social/YoutubeIcon.png'),
    url: '',
  },
  {
    media_type: 'instagram',
    image: require('../Ui/assets/images/Cards/social/InstagramIcon.png'),
    url: '',
  },
  {
    media_type: 'spotify',
    image: require('../Ui/assets/images/Cards/social/SpotifyIcon.png'),
    url: '',
  },
  {
    media_type: 'vimeo',
    image: require('../Ui/assets/images/Cards/social/VimeoIcon.png'),
    url: '',
  },
  {
    media_type: 'twitter',
    image: require('../Ui/assets/images/Cards/social/TwitterIcon.png'),
    url: '',
  },
  {
    media_type: 'dribble',
    image: require('../Ui/assets/images/Cards/social/DribbleIcon.png'),
    url: '',
  },
  {
    media_type: 'soundCloud',
    image: require('../Ui/assets/images/Cards/social/SoundCloudIcon.png'),
    url: '',
  },
  {
    media_type: 'pinterest',
    image: require('../Ui/assets/images/Cards/social/PinterestIcon.png'),
    url: '',
  },
  {
    media_type: 'android',
    image: require('../Ui/assets/images/Cards/social/AndroidIcon.png'),
    url: '',
  },
  {
    media_type: 'linkedIn',
    image: require('../Ui/assets/images/Cards/social/LinkedInIcon.png'),
    url: '',
  },
  {
    media_type: 'snapChat',
    image: require('../Ui/assets/images/Cards/social/SnapChatIcon.png'),
    url: '',
  },
  {
    id: 14,
    media_type: 'behance',
    image: require('../Ui/assets/images/Cards/social/BehanceIcon.png'),
    url: '',
  },
  {
    media_type: 'tumblr',
    image: require('../Ui/assets/images/Cards/social/TumblrIcon.png'),
    url: '',
  },
  {
    media_type: 'messenger',
    image: require('../Ui/assets/images/Cards/social/MessengerIcon.png'),
    url: '',
  },
  {
    media_type: 'whatsapp',
    image: require('../Ui/assets/images/Cards/social/WhatsappIcon.png'),
    url: '',
  },
  {
    media_type: 'skype',
    image: require('../Ui/assets/images/Cards/social/SkypeIcon.png'),
    url: '',
  },
  {
    media_type: 'dropbox',
    image: require('../Ui/assets/images/Cards/social/DropboxIcon.png'),
    url: '',
  },
  {
    media_type: 'wordpress',
    image: require('../Ui/assets/images/Cards/social/WordpressIcon.png'),
    url: '',
  },
  {
    media_type: 'google',
    image: AppImages.Auth.GoogleIcon,
    url: '',
  },
  {
    media_type: 'tiktok',
    image: require('../Ui/assets/images/Cards/social/TiktokIcon.png'),
    url: '',
  },
  {
    media_type: 'custom',
    custom_label: '',
    image: require('../Ui/assets/images/Cards/social/OtherIcon.png'),
    url: '',
  },
];

export const cardColorsList = [
  {
    id: 1,
    color: '#22A081',
    borderColor: '#abeddd',
  },
  {
    id: 2,
    color: '#E35252',
    borderColor: '#c52020',
  },
  {
    id: 3,
    color: '#E4A56B',
    borderColor: '#db8a3d',
  },
  {
    id: 4,
    color: '#7000B5',
    borderColor: '#d899ff',
  },
  {
    id: 5,
    color: '#EEB8C9',
    borderColor: '#e184a1',
  },
  {
    id: 6,
    color: '#DFF87C',
    borderColor: '#b1da0b',
  },
  {
    id: 7,
    color: '#34D844',
    borderColor: '#21ab2f',
  },
  {
    id: 8,
    color: '#3B58BD',
    borderColor: '#9eace0',
  },
  {
    id: 9,
    color: '#FF5099',
    borderColor: '#ff1a79',
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

export const loremIpsumString =
  'Lorem ipsum dolor sit amet, consectetuer adip isci ng elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit ';
export const loremIpsumString2 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute.';
export const genderList = [
  {
    id: '1',
    name: 'Male',
  },
  {
    id: '2',
    name: 'Female',
  },
];

export const drawerMenuList = [
  {
    id: 1,
    title: 'Home',
    image: AppImages.Container.BottomBar.Home,
  },
  {
    id: 2,
    title: 'My Profile',
    image: AppImages.Profile.PersonIcon,
  },
  // {
  //   id: 3,
  //   title: 'Dynamic Links',
  //   image: AppImages.Common.LinkMiniIcon,
  // },
  // {
  //   id: 4,
  //   title: 'Analytics',
  //   image: AppImages.Drawer.AnalyticsIcon,
  // },
  {
    id: 5,
    title: 'Settings',
    image: AppImages.Container.BottomBar.Setting,
  },
  {
    id: 6,
    title: 'Unlink Bracelet',
    image: AppImages.Drawer.UnlinkBracelet,
  },
];

export const functionHomeList = [
  {
    id: 1,
    title: 'Cards',
    subTitle: 'Cards',
    label: 'Your personal & business card',
    image: AppImages.Cards.FunctionHomeIcons.Card,
    cardType: ActiveFunctionTypeStrings.card,
  },
  // {
  //   id: 2,
  //   title: 'Venmo',
  //   subTitle: 'Venmo',
  //   label: 'Link your Venmo account',
  //   image: AppImages.Cards.FunctionHomeIcons.Venmo,
  //   cardType: ActiveFunctionTypeStrings.venmo,
  // },
  // {
  //   id: 3,
  //   title: 'Cash App',
  //   subTitle: 'Cash App',
  //   label: 'Link your CashApp account',
  //   image: AppImages.Cards.FunctionHomeIcons.CashApp,
  //   cardType: ActiveFunctionTypeStrings.cash_app,
  // },
  {
    id: 2,
    title: 'Payments',
    subTitle: 'Payment Services',
    label: 'Link your Payment service account',
    image: AppImages.Cards.FunctionHomeIcons.PaymentIcon,
    cardType: ActiveFunctionTypeStrings.payment,
  },
  {
    id: 4,
    title: 'Emergency Contact',
    subTitle: 'Emergency Contact',
    label: 'For emergency purpose',
    image: AppImages.Cards.FunctionHomeIcons.Emergency,
    cardType: ActiveFunctionTypeStrings.emergency_contact,
  },
  {
    id: 5,
    title: "Custom URL's",
    subTitle: "Custom URL's",
    label: 'Create Your Custom URL’s',
    image: AppImages.Cards.FunctionHomeIcons.Link,
    cardType: ActiveFunctionTypeStrings.custom_url,
  },
  {
    id: 6,
    title: 'File Upload',
    subTitle: 'File Upload',
    label: 'Link your Uploaded file URL’s',
    image: AppImages.Cards.FunctionHomeIcons.UploadFilesIcon,
    cardType: ActiveFunctionTypeStrings.file_upload,
  },
];

export const cardsSectionList = [
  {
    title: 'Personal Cards',
    data: [
      {
        id: 1,
        title: 'David Carl',
        label: 'Photography',
        status: true,
        image: require('../Ui/assets/images/Home/Home/CardImage1.png'),
      },
      {
        id: 2,
        title: 'David Carl',
        label: 'Photography',
        status: false,
        image: require('../Ui/assets/images/Home/Home/CardImage1.png'),
      },
    ],
  },
  {
    title: 'Business Cards',
    data: [
      {
        id: 1,
        title: 'David Carl',
        label: 'Photography',
        status: false,
        image: require('../Ui/assets/images/Home/Home/CardImage1.png'),
      },
    ],
  },
];

export const dynamicLinksCard = [
  // {
  //   id: 1,
  //   title: 'My Website',
  //   link: 'https://website.com/123456789.......',
  //   visible: true,
  // },
  // {
  //   id: 2,
  //   title: 'My Website2',
  //   link: 'https://website.com/777778278.......',
  //   visible: false,
  // }
];

export const contactList = [
  {
    id: 1,
    contactName: 'David Carl',
    shortDescription: 'Software Engineer',
  },
  {
    id: 2,
    contactName: 'Johnson Truth',
    shortDescription: 'HR',
  },
  {
    id: 3,
    contactName: 'Hardly Mic',
    shortDescription: 'Tecniqual',
  },
  {
    contactName: 'Jhon Ibraham',
    shortDescription: 'AD',
  },
  {
    id: 4,
    contactName: 'Breath White',
    shortDescription: 'Dean',
  },
  {
    id: 5,
    contactName: 'Andreoson',
    shortDescription: 'Cartoon Chracter',
  },
  {
    id: 6,
    contactName: 'Mickle clark',
    shortDescription: 'MA',
  },
];
export const socialMediaData = [
  {
    id: 1,
    title: 'Facebook',
    image: AppImages.DynamicLink.Facebook,
  },
  {
    id: 2,
    title: 'Twitter',
    image: AppImages.DynamicLink.Twitter,
  },
  {
    id: 3,
    title: 'Youtube',
    image: AppImages.DynamicLink.Youtube,
  },
  {
    id: 4,
    title: 'Pinterest',
    image: AppImages.DynamicLink.Pintrest,
  },
  {
    id: 5,
    title: 'Snapchat',
    image: AppImages.DynamicLink.Snapchat,
  },
];
export const cardOptionsList = [
  {
    name: 'Link to bracelet',
  },
  {
    name: 'View Card',
  },
  {
    name: 'Duplicate',
  },
  {
    name: 'QR Code',
  },
  {
    name: 'Edit',
  },
  {
    name: 'Delete',
  },
];

export const emergencyCardOptionsList = [
  {
    name: 'Link to bracelet',
  },
  {
    name: 'View Contact',
  },
  {
    name: 'QR Code',
  },
  {
    name: 'Edit',
  },
  {
    name: 'Delete',
  },
];

export const customUrlOptionsList = [
  {
    name: 'Link to Bracelet',
  },
  {
    name: 'View Custom URL',
  },
  {
    name: 'QR Code',
  },
  {
    name: 'Edit',
  },
  {
    name: 'Delete',
  },
];

export const venmoCardOptionsList = [
  {
    name: 'Link to Bracelet',
  },
  {
    name: 'View Venmo',
  },
  {
    name: 'QR Code',
  },
  {
    name: 'Edit',
  },
  {
    name: 'Delete',
  },
];

export const cashAppOptionsList = [
  {
    name: 'Link to Bracelet',
  },
  {
    name: 'View Cash App',
  },
  {
    name: 'QR Code',
  },
  {
    name: 'Edit',
  },
  {
    name: 'Delete',
  },
];

export const customPaymentOptionsList = [
  {
    name: 'Link to Bracelet',
  },
  {
    name: 'View Custom Payment',
  },
  {
    name: 'QR Code',
  },
  {
    name: 'Edit',
  },
  {
    name: 'Delete',
  },
];

export const uploadFilesOptionsList = [
  {
    name: 'Link to Bracelet',
  },
  {
    name: 'View File Upload Card',
  },
  {
    name: 'QR Code',
  },
  {
    name: 'Edit',
  },
  {
    name: 'Delete',
  },
];

export const imagePickerConstants = [
  {
    id: 1,
    image: AppImages.Common.GalleryPicker,
    text: 'Upload from Gallery',
  },
  {
    id: 1,
    image: AppImages.Common.CameraPicker,
    text: 'Take a photo from Camera',
  },
];

export const contactOptionsList = [
  {
    id: 1,
    name: 'Delete',
    image: AppImages.Contacts.DeleteIcon,
  },
  {
    id: 2,
    name: 'Edit',
    image: AppImages.Contacts.EditIcon,
  },
  {
    id: 3,
    name: 'Share',
    image: AppImages.Contacts.ShareIcon,
  },
];

export const settingsSectionList = [
  {
    title: 'Account',
    data: [
      {
        id: 1,
        name: 'My Profile',
        icon: AppImages.Settings.SettingsPersonIcon,
      },
      {
        id: 2,
        name: 'Notifications',
        icon: AppImages.Settings.SettingsNotificationIcon,
      },
      {
        id: 3,
        name: 'Upgrade Account',
        icon: AppImages.Settings.SettingsUpgradeAccountIcon,
      },
      {
        id: 3.1,
        name: 'Restore Purchase',
        icon: AppImages.Settings.Restore,
      },
    ],
  },
  {
    title: 'Notification Settings',
    data: [
      {
        id: 4,
        name: 'Notifications',
        icon: AppImages.Settings.NotificationSettings,
      },
      {
        id: 5,
        name: 'Email',
        icon: AppImages.Settings.EmailSettings,
      },
    ],
  },
  {
    title: 'Security',
    data: [
      {
        id: 6,
        name: 'Password',
        icon: AppImages.Settings.SettingsPasswordLockIcon,
      },
    ],
  },
  {
    title: 'Support & Legal',
    data: [
      {
        id: 7,
        name: 'Customer Support',
        icon: AppImages.Settings.CustomerCareIcon,
      },
      {
        id: 8,
        name: 'Help & FAQs',
        icon: AppImages.Settings.HelpFaqIcon,
      },
      {
        id: 9,
        name: 'About',
        icon: AppImages.Settings.SettingsAboutIcon,
      },
      {
        id: 10,
        name: 'Log out',
        icon: AppImages.Settings.SettingsLogoutIcon,
      },
    ],
  },
];

export const socialSettingsList = settingsSectionList.filter(
  (item, index) => index !== 2,
);

export const settingsHelpList = [
  {
    id: 1,
    image: AppImages.Settings.SettingsAboutIcon,
    title: 'About Us',
    subTitle: 'About Us',
  },
  {
    id: 2,
    image: AppImages.Settings.Help.PhoneIcon,
    title: 'Contact Us',
    subTitle: 'Contact Connect',
  },
  {
    id: 3,
    image: AppImages.Settings.Help.VideoIcon,
    title: 'Tutorials',
    subTitle: 'Check videos for help',
  },
  {
    id: 4,
    image: AppImages.Settings.Help.FaqIcon,
    title: "FAQ's",
    subTitle: 'Frequently Asked Question',
  },
  {
    id: 5,
    image: AppImages.Settings.Help.TermsIcon,
    title: 'Terms & Conditions',
    subTitle: 'Terms & Conditions',
  },
  {
    id: 6,
    image: AppImages.Settings.Help.PrivacyIcon,
    title: 'Privacy & Policy',
    subTitle: 'Privacy Policy',
  },
  {
    id: 7,
    image: AppImages.Settings.Help.PrivacyIcon,
    title: 'Intellectual Property',
    subTitle: 'Intellectual Property',
  },
];

export const profilePreviewList = [
  {
    id: 1,
    value: 'David Carls',
    icon: AppImages.Profile.PersonIcon,
  },
  {
    id: 2,
    value: '+1 234 567 890',
    icon: AppImages.Profile.PhoneIcon,
  },
  {
    id: 3,
    value: 'emailaddress@mail.om',
    icon: AppImages.Cards.MailUnfilledIcon,
  },
  {
    id: 4,
    value: 'New York, USA',
    icon: AppImages.Cards.LocationUnfilledIcon,
  },
  {
    id: 5,
    value: '22 / 05 / 1999',
    icon: AppImages.Profile.BirthdayIcon,
  },
  {
    id: 6,
    value: 'Male',
    icon: AppImages.Profile.GenderIcon,
  },
  {
    id: 7,
    value: 'Photographer',
    icon: AppImages.Profile.JobIcon,
  },
];

export const emptyCardBoilerplate = {
  cardType: '',
  firstName: '',
  lastName: '',
  companyName: '',
  jobPosition: '',
  companyLogo: '',
  cardBackground: cardBgList[0].cardUrl,
  selectedBgObj: cardBgList[0],
  themeColor: cardColorsList[0],
  profileImgUrl: '',
  phoneDetails: [
    {
      id: 1,
      phoneCode: '+1',
      type: '',
      // phoneCountry: 'United States',
      phoneFlagCode: 'us',
      phoneNumber: '',
      isValid: true,
    },
  ],
  cardSocialLinks: [
    {
      ...cardSocialLinks[0],
      id: CommonDataManager.getSharedInstance().generateIdForSocial(),
    },
  ],
  aboutText: '',
  city: '',
  state: '',
  country: '',
  email: '',
  website: '',
  pronoun: '',
  pronounText: '',
};

export const createCardError = {
  cardType: true,
  firstName: true,
  phoneNumber: false,
  cardSocialLinks: false,
  email: false,
  website: false,
};

export const termsString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 

ut aliquip ex ea commodo consequat. Duis aute. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris

 nisi ut aliquip ex ea commodo consequat. Duis aute.Lorem ipsum dolor sit amet, consectetur

 adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
labore et dolore magna aliqua
labore et dolore magna aliqua
labore et dolore magna aliqua
labore et dolore magna aliqua 

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute.`;

export const helpDummyTxt = {
  title:
    'Help Center Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus.',
  des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus purus eu justo commodo, sit amet mollis lacus',
};

export const createBusinessCardList = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
  {
    id: 11,
  },
];

export const createPersonalCardList = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
  {
    id: 11,
  },
];

export const cardPronounConstants = [
  cardPronounTypes.heHim,
  cardPronounTypes.sheHer,
  cardPronounTypes.theyThem,
  cardPronounTypes.custom,
];

export interface IReduxState {
  isLoaderStart: boolean;
  openMenu: boolean;
  isNetConnected: boolean;
  safeArea: {top: number; bottom: number};
  userData: any;
  currentTab: number;
  bottomBarHeight: number;
  drawerValue: boolean;
  drawerIndex: number;
  isNotchDevice: boolean;
  moveToSettings: boolean;
  fetchUpdatedUser: any;
  fetchUpdatedCards: any;
  fetchUpdatedContacts: any;
  fetchUpdatedFunctions: any;
  moveToScreen: null | string;
  moveToParams: null | any;
  alertObj: any;
  showToast: string;
  createCardObj: any;
  moveToBindScreen: boolean;
  notificationObj: any;
  cardClickedFromHome: boolean;
  settingsData: any;
  showWalkthrough: boolean;
  isNewNotification: boolean;
  linkingUrl: string;
  secretId: null | string;
  teamId: null | string;
  teamSignupData: null | any;
  selectedTeamMember: null | any;
  isComingFromTeam: boolean;
  scannedTeamDetails: {
    team: {
      id: number;
      name: string;
      status: number;
    };
    team_members: Array<UserViewModel>;
  } | null;
  isTagScanning: boolean;
  packagePlan: {
    id: number,
    name: packagePlanType,
    subscription_type: 'monthly' | 'yearly',
    start_date: string,
    end_date: string,
    receipt: string,
    transaction_id: string,
    isExpired?: boolean
  } | null,
  userFunctionAvailability: {
    total_cards: number,
    total_payments: number,
    total_emergency_contacts: number,
    total_custom_urls: number,
    total_file_uploads: number,
    total_connections: number
} | null,
  showUpgradeModal: null | {
    visible: boolean,
    isConfirmFirst?: boolean,
    resetScreen?: boolean,
    notCloseable?: boolean,
    title?: string,
    body?: string
  },
  isUpgradeScreenFocused: boolean
}

export const packagePlansList = [
  {
    id: 1,
    type: 'Starter',
    monthly_price: '0',
    yearly_price: '0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: AppImages.UpgradeAccount.Message,
    features: [
      {
        name: 'Personal/Business cards',
        value: 1
      },
      {
        name: 'Connections',
        value: 5
      },
      {
        name: 'Payment cards',
        value: 0,
      },
      {
        name: 'Emergency contact',
        value: 0
      },
      {
        name: 'Custom URL',
        value: 0
      }, 
      {
        name: 'File Upload URL',
        value: 0
      },
      {
        name: 'Custom Buttons',
        value: false
      },
      {
        name: 'Email notifications',
        value: false
      }
    ]
  },
  {
    id: 2,
    type: 'Premium',
    monthly_productId: 'com.holguinmedia.contactapp.premium.monthly',
    yearly_productId: 'com.holguinmedia.contactapp.premium.yearly',
    monthly_price: '6.99',
    yearly_price: '59.99',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: AppImages.UpgradeAccount.Aeroplan,
    features: [
      {
        name: 'Personal/Business cards',
        value: 3
      },
      {
        name: 'Connections',
        value: "Unlimited"
      },
      {
        name: 'Payment cards',
        value: 2
      },
      {
        name: 'Emergency contact',
        value: 2
      },
      {
        name: 'Custom URL',
        value: 2
      }, 
      {
        name: 'File Upload URL',
        value: 2
      },
      {
        name: 'Custom Buttons',
        value: true
      },
      {
        name: 'Email notifications',
        value: false
      },
      // {
      //   name: 'Business Card Scanner (coming soon)',
      //   value: true
      // },
    ],
  },
  {
    id: 3,
    type: 'Elite',
    monthly_productId: 'com.holguinmedia.contactapp.elite.monthly',
    yearly_productId: 'com.holguinmedia.contactapp.elite.yearly',
    monthly_price: '13.99',
    yearly_price: '99.99',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: AppImages.UpgradeAccount.Rocket,
    features: [
      {
        name: 'Personal/Business cards',
        value: "Unlimited"
      },
      {
        name: 'Connections',
        value: "Unlimited"
      },
      {
        name: 'Payment cards',
        value: "Unlimited"
      },
      {
        name: 'Emergency contact',
        value: "Unlimited"
      },
      {
        name: 'Custom URL',
        value: "Unlimited"
      }, 
      {
        name: 'File Upload URL',
        value: "Unlimited"
      },
      {
        name: 'Custom Buttons',
        value: true
      },
      {
        name: 'Email notifications',
        value: true
      },
      // {
      //   name: 'Lead Capture Form',
      //   value: true
      // },
      // {
      //   name: 'Custom NFC Branded Tap',
      //   value: true
      // },
      // {
      //   name: 'Business Card Scanner (coming soon)',
      //   value: true
      // },
    ],
  },
  {
    id: 4,
    type: 'Enterprise',
    monthly_price: 'NA',
    yearly_price: 'NA',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: AppImages.UpgradeAccount.Rocket,
    features: [
      {
        name: 'Personal/Business cards',
        value: "Unlimited"
      },
      {
        name: 'Connections',
        value: "Unlimited"
      },
      {
        name: 'Payment cards',
        value: "Unlimited"
      },
      {
        name: 'Emergency contact',
        value: "Unlimited"
      },
      {
        name: 'Custom URL',
        value: "Unlimited"
      }, 
      {
        name: 'File Upload URL',
        value: "Unlimited"
      },
      {
        name: 'Custom Buttons',
        value: true
      },
      {
        name: 'Email notifications',
        value: true
      },
      // {
      //   name: 'Lead Capture Form',
      //   value: true
      // },
      // {
      //   name: 'Custom White labled App for your Business',
      //   value: true
      // },
      // {
      //   name: 'Contact Smart Directory',
      //   value: true
      // },
      // {
      //   name: 'Custom NFC Branded Tap',
      //   value: true
      // },
      // {
      //   name: 'Business Card Scanner (coming soon)',
      //   value: true
      // },
    ],
  }
];

export type packagePlanType = 'Starter' | 'Premium' | 'Elite' | 'Enterprise'

export const convertUtcToLocal = (dateString: any) => {
  let parsedDate = moment(new Date(dateString)).toDate();
  return moment(parsedDate).local();
};