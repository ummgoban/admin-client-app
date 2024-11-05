export type DefaultResponseType<T> = {
  code: number;
  message: string;
  data?: T;
};
