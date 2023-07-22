import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions, Platform, PixelRatio} from 'react-native';
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
export const AppImages = {
  home: {
    logo: require('../Ui/assets/images/innerLogo.png'),
    heartIcon: require('../Ui/assets/images/fav.png'),
    cartIcon: require('../Ui/assets/images/cart.png'),
    dropdownIcon: require('../Ui/assets/images/dropdown-Icon.png'),
    searchIcon: require('../Ui/assets/images/search.png'),
    filterIcon: require('../Ui/assets/images/filter.png'),
    card1: require('../Ui/assets/images/banner1.png'),
    card2: require('../Ui/assets/images/banner2.png'),
    res1: require('../Ui/assets/images/resturant1.png'),
    res2: require('../Ui/assets/images/resturant2.png'),
    res3: require('../Ui/assets/images/resturant3.png'),
    meal: require('../Ui/assets/images/meal.png'),
    star: require('../Ui/assets/images/star.png'),
    resMark: require('../Ui/assets/images/resMark.png'),
    clock: require('../Ui/assets/images/clock.png'),
    simpleBanner: require('../Ui/assets/images/banner3.png'),
    back: require('../Ui/assets/images/back.png'),
    deleteFav: require('../Ui/assets/images/deleteFav.png'),
    noOrder : require('../Ui/assets/images/noOrder.png'),
    locIcon : require('../Ui/assets/images/locIcon.png'),
    startPoint : require('../Ui/assets/images/startPoint.png'),
    acceptStatus : require('../Ui/assets/images/acceptStatus.png'),
    progressStatus : require('../Ui/assets/images/progressStatus.png')
  },
  RestaurantList: {
    bikeIcon: require('../Ui/assets/images/bikeIcon.png'),
  },
  Container: {
    bottomBar: {
      home: require('../Ui/assets/images/home.png'),
      selectedHome: require('../Ui/assets/images/selectedHome.png'),
      earning : require('../Ui/assets/images/earning.png'),
      selectedEarning : require('../Ui/assets/images/selectedEarning.png'),
      grocery: require('../Ui/assets/images/grocery.png'),
      selectedGrocery: require('../Ui/assets/images/selectedGrocery.png'),
      orders: require('../Ui/assets/images/orders.png'),
      selectedOrders: require('../Ui/assets/images/selectedOrders.png'),
      offers: require('../Ui/assets/images/offers.png'),
      selectedOffers: require('../Ui/assets/images/selectedOffers.png'),
      more: require('../Ui/assets/images/more.png'),
      selectedMore: require('../Ui/assets/images/selectedMore.png'),
      profile: require('../Ui/assets/images/profileTab.png'),
      selectedProfile: require('../Ui/assets/images/selectedProfile.png'),
    },
  },
  details: {
    dummyDetailBg: require('../Ui/assets/images/details/dummyDetailBg.png'),
    dummyLogo: require('../Ui/assets/images/details/dummyLogo.png'),
    clock: require('../Ui/assets/images/details/clock.png'),
    cock: require('../Ui/assets/images/details/cock.png'),
    ratingStar: require('../Ui/assets/images/details/ratingStar.png'),
    dummyLike: require('../Ui/assets/images/details/dummyLike.png'),
    bike: require('../Ui/assets/images/details/bike.png'),
    menu: require('../Ui/assets/images/details/menu.png'),
    menuSelected: require('../Ui/assets/images/details/menuSelected.png'),
    reviews: require('../Ui/assets/images/details/reviews.png'),
    reviewsSelected: require('../Ui/assets/images/details/reviewsSelected.png'),
    about: require('../Ui/assets/images/details/about.png'),
    aboutSelected: require('../Ui/assets/images/details/aboutSelected.png'),
    dummyItem: require('../Ui/assets/images/details/dummyItem.png'),
    bannerDummy: require('../Ui/assets/images/details/bannerDummy.png'),
    checkbox: require('../Ui/assets/images/details/checkbox.png'),
    checkboxSelected: require('../Ui/assets/images/details/checkboxSelected.png'),
    checkBox2Selected: require('../Ui/assets/images/details/checkBox2Selected.png'),
    checkbox2: require('../Ui/assets/images/details/checkbox2.png'),
    ratingStar2: require('../Ui/assets/images/details/ratingStar2.png'),
    phoneCall: require('../Ui/assets/images/details/phoneCall.png'),
  },
  order: {
    back2: require('../Ui/assets/images/back2.png'),
    resLogo: require('../Ui/assets/images/resLogo.png'),
    resLogo2: require('../Ui/assets/images/resLogo2.png'),
    cancel: require('../Ui/assets/images/cancel.png'),
    riderDummy: require('../Ui/assets/images/riderDummy.png'),
    orderBanner: require('../Ui/assets/images/orderBanner.png'),
  },
  login: {
    appIcon: require('../Ui/assets/images/miniLogo.png'),
    appLogo: require('../Ui/assets/images/loginLogo.png'),
    closeEye: require('../Ui/assets/images/hidePass.png'),
    openEye: require('../Ui/assets/images/showPass.png'),
    halfLine: require('../Ui/assets/images/halfLine.png'),
    appleIcon: require('../Ui/assets/images/appleIcon.png'),
    googleIcon: require('../Ui/assets/images/googleIcon.png'),
    facebookIcon: require('../Ui/assets/images/facebookIcon.png'),
  },
  signUp: {
    checked: require('../Ui/assets/images/checked.png'),
    unchecked: require('../Ui/assets/images/unchecked.png'),
  },
  otp: {
    backBtn: require('../Ui/assets/images/backBtnIcon.png'),
  },
  address: {
    placesLogo: require('../Ui/assets/images/placesLogo.png'),
    searchBtn: require('../Ui/assets/images/searchBtn.png'),
    greenLoc: require('../Ui/assets/images/address.png'),
    editAdd: require('../Ui/assets/images/editAdd.png'),
    delete: require('../Ui/assets/images/delete.png'),
    mapPin: require('../Ui/assets/images/mapPin.png'),
  },
  favourite: {
    product1: require('../Ui/assets/images/product1.png'),
    product2: require('../Ui/assets/images/product2.png'),
    product3: require('../Ui/assets/images/product3.png'),
    cartIcon: require('../Ui/assets/images/GoCartIcon.png'),
  },
  products: {
    favIcon: require('../Ui/assets/images/fav.png'),
    unFavIcon: require('../Ui/assets/images/unFav.png'),
  },
};
export const AppFonts = {
  InterSemiBold: 'Inter-SemiBold',
  InterExtraBold: 'Inter-ExtraBold',
  InterBold: 'Inter-Bold',
  InterRegular: 'Inter',
  InterMedium: 'Inter-Medium',
  InterLight: 'Inter-Light',
  SwitzerThin: 'Switzer-Thin',
};
export const AppColors = {
  blue: {
    dark: '#004B87',
    lightBlue: '#C1E4FC',
  },

  grey: {
    light: '#C4C4C4',
    lightOp: '#FAFAFA',
    dark: '#6D6E72',
    dark2: '#787878',
  },

  shadowColor: {
    lightBlack: 'rgba(0,0,0,0.55)',
    darkBlack: 'rgba(0,0,0,1)',
    lightBlack2: 'rgba(0,0,0,0.3)',
  },

  yellow: {
    dark: '#FFCD00',
    lightYellow : "rgba(255,205,0,0.10)"
  },

  white: {
    whiteOP: 'rgba(255,255,255,0.65)',
    white: '#ffffff',
    lightWhite: '#FFFFF1',
    creamy: '#FFF9D5',
  },
  black: {
    black: '#000000',
    lightBlack: 'rgba(0,0,0,0.32)',
    withShadowLight:
      Platform.OS == 'ios' ? 'rgba(0,0,0,0.16)' : 'rgba(0,0,0,0.26)',
    textColor: '#414141',
    textDark: '#333333',
    lightOP: 'rgba(0,0,0,0.75)',
  },
  green: {
    dark: '#00870D',
  },
  red: {
    redOp: 'rgba(243,17,17,0.10)',
    red: 'rgba(243,17,17,1)',
    darkRed: '#F31111',
  },
};

export const Sliders = [
  {
    id: '1',
    img: require('../Ui/assets/images/img1.png'),
    title: 'part1',
    subtitle: 'part1Desc',
  },
  {
    id: '2',
    img: require('../Ui/assets/images/img2.png'),
    title: 'part2',
    subtitle: 'part2Desc',
  },
  {
    id: '3',
    img: require('../Ui/assets/images/img3.png'),
    title: 'part3',
    subtitle: 'part3Desc',
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

export const bottomBarList = [
  {
    selectedImage: AppImages.Container.bottomBar.selectedHome,
    image: AppImages.Container.bottomBar.home,
    title: 'home',
  },
  {
    selectedImage: AppImages.Container.bottomBar.selectedOrders,
    image: AppImages.Container.bottomBar.orders,
    title: 'orders',
  },
  {
    selectedImage: AppImages.Container.bottomBar.selectedEarning,
    image: AppImages.Container.bottomBar.earning,
    title: 'earning',
  },
  {
    selectedImage: AppImages.Container.bottomBar.selectedProfile,
    image: AppImages.Container.bottomBar.profile,
    title: 'profile',
  },
  {
    selectedImage: AppImages.Container.bottomBar.selectedMore,
    image: AppImages.Container.bottomBar.more,
    title: 'more',
  },
];

///Dummy Data

export const ResturantListData = [
  {
    id: '1',
    pic: AppImages.home.res1,
    title: 'Galaxy Height',
    time: '30',
    price: '30.00',
    resMark: AppImages.home.resMark,
    averageRating: '4.0',
    totalRating: '900',
    status: 'Top',
    timing: 'closed',
    openingTime: '4',
  },
  {
    id: '2',
    pic: AppImages.home.res2,
    title: 'Yummy Pizza',
    time: '15',
    price: '50.00',
    resMark: AppImages.home.resMark,
    averageRating: '3.7',
    totalRating: '226',
    status: 'Top',
  },
  {
    id: '3',
    pic: AppImages.home.res3,
    title: 'X Cafe',
    time: '30',
    price: '25.00',
    resMark: AppImages.home.resMark,
    averageRating: '4.6',
    totalRating: '309',
    status: 'Recent',
  },
  {
    id: '4',
    pic: AppImages.home.res1,
    title: 'Galaxy Height',
    time: '30',
    price: '30.00',
    resMark: AppImages.home.resMark,
    averageRating: '4.0',
    totalRating: '900',
    status: ' New',
  },
  {
    id: '5',
    pic: AppImages.home.res2,
    title: 'Yummy Pizza',
    time: '15',
    price: '50.00',
    resMark: AppImages.home.resMark,
    averageRating: '3.7',
    totalRating: '226',
    status: 'Near By',
  },
  {
    id: '6',
    pic: AppImages.home.res3,
    title: 'X Cafe',
    time: '30',
    price: '25.00',
    resMark: AppImages.home.resMark,
    averageRating: '4.6',
    totalRating: '309',
    status: 'New',
  },
  {
    id: '7',
    pic: AppImages.home.res1,
    title: 'Galaxy Height',
    time: '30',
    price: '30.00',
    resMark: AppImages.home.resMark,
    averageRating: '4.0',
    totalRating: '900',
    status: 'New',
    timing: 'closed',
    openingTime: '4',
  },
  {
    id: '8',
    pic: AppImages.home.res2,
    title: 'Yummy Pizza',
    time: '15',
    price: '50.00',
    resMark: AppImages.home.resMark,
    averageRating: '3.7',
    totalRating: '226',
    status: 'New',
  },
  {
    id: '9',
    pic: AppImages.home.res2,
    title: 'Yummy Pizza',
    time: '15',
    price: '50.00',
    resMark: AppImages.home.resMark,
    averageRating: '3.7',
    totalRating: '226',
    status: 'New',
  },
  {
    id: '10',
    pic: AppImages.home.res3,
    title: 'X Cafe',
    time: '30',
    price: '25.00',
    resMark: AppImages.home.resMark,
    averageRating: '4.6',
    totalRating: '309',
    status: 'Top',
  },
];

export const list = [
  {
    id: '1',
    pic: require('../Ui/assets/images/coffee-cup.png'),
    title: 'coffee',
  },
  {
    id: '2',
    pic: require('../Ui/assets/images/rice.png'),
    title: 'Rice',
  },
  {
    id: '3',
    pic: require('../Ui/assets/images/pasta.png'),
    title: 'Pasta',
  },
  {
    id: '4',
    pic: require('../Ui/assets/images/french-fries.png'),
    title: 'Fries',
  },
  {
    id: '5',
    pic: require('../Ui/assets/images/fried-fish.png'),
    title: 'Fish',
  },
  {
    id: '6',
    pic: require('../Ui/assets/images/coffee-cup.png'),
    title: 'coffee',
  },
  {
    id: '7',
    pic: require('../Ui/assets/images/rice.png'),
    title: 'Rice',
  },
  {
    id: '8',
    pic: require('../Ui/assets/images/pasta.png'),
    title: 'Pasta',
  },
  {
    id: '9',
    pic: require('../Ui/assets/images/french-fries.png'),
    title: 'Fries',
  },
  {
    id: '10',
    pic: require('../Ui/assets/images/fried-fish.png'),
    title: 'Fish',
  },
];
export const moreList = [
  {
    name: 'profile',
    image: require('../Ui/assets/images/profile.png'),
  },
  {
    name: 'addresses',
    image: require('../Ui/assets/images/address.png'),
  },
  {
    name: 'language',
    image: require('../Ui/assets/images/language.png'),
  },
  {
    name: 'aboutUs',
    image: require('../Ui/assets/images/about.png'),
  },
  {
    name: 'contactUs',
    image: require('../Ui/assets/images/contact.png'),
  },
  {
    name: 'termsCond',
    image: require('../Ui/assets/images/terms.png'),
  },
];
//Category List Data

//filtered Categories List

export const filteredCategoryList = [
  {
    id: '1',
    title: 'Dairy',
  },
  {
    id: '2',
    title: 'Fruits',
  },
  {
    id: '3',
    title: 'Vegetables',
  },
  {
    id: '4',
    title: 'Break Fast',
  },
  {
    id: '5',
    title: 'Baby Care',
  },
  {
    id: '6',
    title: 'Cosmetics',
  },
  {
    id: '7',
    title: 'Cleaning',
  },
  {
    id: '8',
    title: 'Frozen',
  },
];
