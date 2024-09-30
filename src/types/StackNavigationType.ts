import {ParamListBase} from '@react-navigation/native';

type StackParamType<T> = {
  screen?: keyof T;
  params?: T[keyof T];
};

export interface HomeStackParamList extends ParamListBase {
  Feed: undefined;
<<<<<<< HEAD
<<<<<<< HEAD
  MarketInfo: undefined;
=======
>>>>>>> 2bf2560 (chore: install deps)
=======
  MarketInfo: undefined;
>>>>>>> d2fbfb4 (feat: 가게 상세 편집 페이지 제작합니다. (#13))
  MyPage: undefined;
}

export interface RegisterStackParamList extends ParamListBase {
  Signup: undefined;
  Login: undefined;
}

export interface DetailStackParamList extends ParamListBase {
<<<<<<< HEAD
<<<<<<< HEAD
=======
  Market: {marketId: number};
>>>>>>> 2bf2560 (chore: install deps)
=======
>>>>>>> d2fbfb4 (feat: 가게 상세 편집 페이지 제작합니다. (#13))
  Payment: undefined;
}

export interface RootStackParamList extends ParamListBase {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
}
