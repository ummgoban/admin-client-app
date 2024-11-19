import {ParamListBase} from '@react-navigation/native';

type StackParamType<T> = {
  screen?: keyof T;
  params?: T[keyof T];
};

export interface HomeStackParamList extends ParamListBase {
  MarketInfo: undefined;
  MyPage: undefined;
  MenuManage: undefined;
  Order: undefined;
}

export interface RegisterStackParamList extends ParamListBase {
  Signup: undefined;
  Login: undefined;
}

export interface DetailStackParamList extends ParamListBase {
  Payment: undefined;
}

export interface OrderStackParamList extends ParamListBase {
  OrderHistory: undefined;
  OrderDetail: {
    orderId: number;
  };
}

export interface RegisterMarketParmaList extends ParamListBase {
  RegisterMarket: undefined;
  RegisterMarketDone: undefined;
}

export interface RootStackParamList extends ParamListBase {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
  RegisterMarketRoot: StackParamType<RegisterMarketParmaList>;
  Order: StackParamType<OrderStackParamList>;
}
