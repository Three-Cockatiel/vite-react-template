export interface Response<T> {
  data: T;
  code: number | string;
  msg: string;
}
