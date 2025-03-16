export interface UserData {
  user_id: string;
  name: string;
  email: string;
}
export interface AuthData {
  name?: string;
  email?: string;
  password: string;
}

export interface ResponseData<T> {
  result: T;
  rowCount: number;
}
