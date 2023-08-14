import moment from 'moment';
import ThreadManager from '../ChatModule/ThreadManger';
import {getUserData} from './AsyncStorage';

export const makeObjForChat = (data: any) => {
  let obj: any = {};
  obj['id'] = data?.userId?.toString();
  obj['_id'] = data?.userId?.toString();
  obj['image'] = data?.companyLogo ? data?.companyLogo : '';
  obj['username'] = data?.userName ? data?.userName : '';

  return obj;
};

export const setUpChat = async (onComplete: any) => {
  const user = await getUserData();
  let userId: any = '';
  userId = user?.user ? user?.user?.userId : user?.userId;
  let newId = userId.toString();
  if (newId?.length > 0) {
    await ThreadManager.instance.getUserThread(newId, async (list: any) => {
      console.log('list-0000----->', list?.length);
      await ThreadManager.instance.setupParticipantListener(newId);
      await ThreadManager.instance.setupThreadListener(newId);
      ThreadManager.instance.setupUserListener();
    });
  }
  onComplete(true);
};

export const filterListAndSorted = (threadList: any) => {
  let mList: any = [];
  if (threadList?.length > 0) {
    threadList.forEach((item: any) => {
      if (item?.lastMessage) {
        mList.push(item);
      }
    });
  }
  mList = mList.sort((s1: any, s2: any) => {
    let firstObj = moment(
      s1.createdAt,
      ThreadManager.instance.dateFormater.fullDate,
    )
      .toDate()
      .getTime();
    let secondObj = moment(
      s2.createdAt,
      ThreadManager.instance.dateFormater.fullDate,
    )
      .toDate()
      .getTime();

    return secondObj - firstObj;
  });
  mList = mList.filter((item: any, index: any) => {
    return mList.indexOf(item) === index;
  });
  return mList;
};

export const followingActionObj = (action: any, obj: any, arr: any) => {
  let newArr: any = [];
  if (action == 'add') {
    newArr = [...arr, obj];
  } else {
    newArr = arr.filter((el: any) => el.id != obj?.id);
  }
  return newArr;
};
