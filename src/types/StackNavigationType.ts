import {ParamListBase} from '@react-navigation/native';

import {OrderDetailInfoType} from './OrderDetailType';
import {ReviewType} from './ReviewType';

type StackParamType<T> = {
  screen?: keyof T;
  params?: T[keyof T];
};

export interface HomeStackParamList extends ParamListBase {
  MarketInfo: undefined;
  MyPage: undefined;
  MenuManage: undefined;
  Order: undefined;
  Review: undefined;
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
    order: OrderDetailInfoType;
  };
}

export interface RegisterMarketParmaList extends ParamListBase {
  RegisterMarket: undefined;
  RegisterMarketDone: undefined;
}

export interface ReviewStackParamList extends ParamListBase {
  ReviewManagement: undefined;
  ReviewReply: {
    review: ReviewType;
  };
}

export interface RootStackParamList extends ParamListBase {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
  RegisterMarketRoot: StackParamType<RegisterMarketParmaList>;
  Order: StackParamType<OrderStackParamList>;
  Review: StackParamType<ReviewStackParamList>;
}
