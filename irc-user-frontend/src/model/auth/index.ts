export interface LoginBody {
    email: string
    password: string
}

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
    password_confirmation: string
}


export interface AuthResponseData {
  user_type: string;
  token: string;
}

export interface AuthResponse {
    message: string;
    data: AuthResponseData;
}

export interface ErrorResponse {
    message: string | any;
}