export interface UserSignUpResponse {
  message: string;
  data: Data;
}

export interface Data {
  user_type: string;
  token: string;
}

export interface UserSignUpErrorResponse {
  message: string | any;
}
export interface UserSignUpBody {
  name: string;
  email: string;
  password: string;
  password_confirmation: string
}
