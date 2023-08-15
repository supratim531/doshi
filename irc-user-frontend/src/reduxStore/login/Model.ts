export interface AdminLoginResponse {
  message: string;
  data: Data;
}

export interface Data {
  user_type: string;
  token: string;
}

export interface AdminLoginErrorResponse {
  message: string | any;
}
export interface AdminLoginBody {
  email: string;
  password: string;
}
