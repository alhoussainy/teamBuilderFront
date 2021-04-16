export interface Response<T> {
  token: string;
  msg: string;
    success: boolean;
    message: string;
    data: T;
  }
