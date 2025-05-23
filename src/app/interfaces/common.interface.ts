export interface PlayerProfile {
  player_id: string;
  player_name: string;
  email: string;
}
export interface AuthData {
  name?: string;
  email?: string;
  password: string;
}

export interface ResponseData<T> {
  data: T;
  statusCode: number;
  message?: string;
}
