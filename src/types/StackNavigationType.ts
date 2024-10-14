import {ParamListBase} from '@react-navigation/native';

type StackParamType<T> = {
  screen?: keyof T;
  params?: T[keyof T];
};

export interface HomeStackParamList extends ParamListBase {
  Feed: undefined;
  MarketInfo: undefined;
  MyPage: undefined;
<<<<<<< HEAD
  OrderHistory: undefined;
=======
>>>>>>> b6cdbb1 (feat: 네비게이션 및 타입 작성)
  OrderDetail: undefined;
}

export interface RegisterStackParamList extends ParamListBase {
  Signup: undefined;
  Login: undefined;
}

export interface DetailStackParamList extends ParamListBase {
  Payment: undefined;
}

export interface RegisterMarketParmaList extends ParamListBase {
  RegisterMarket: undefined;
  RegisterMarketDone: undefined;
}

export interface RootStackParamList extends ParamListBase {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
  RegisterMarket: StackParamType<RegisterMarketParmaList>;
}
