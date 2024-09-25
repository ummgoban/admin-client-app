import {ParamListBase} from '@react-navigation/native';

type StackParamType<T> = {
  screen?: keyof T;
  params?: T[keyof T];
};

export interface HomeStackParamList extends ParamListBase {
  Feed: undefined;
<<<<<<< HEAD
  MarketInfo: undefined;
=======
>>>>>>> 2bf2560 (chore: install deps)
  MyPage: undefined;
}

export interface RegisterStackParamList extends ParamListBase {
  Signup: undefined;
  Login: undefined;
}

export interface DetailStackParamList extends ParamListBase {
<<<<<<< HEAD
=======
  Market: {marketId: number};
>>>>>>> 2bf2560 (chore: install deps)
  Payment: undefined;
}

export interface RootStackParamList extends ParamListBase {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
}
