export interface UserDetailsRes {
  message: string
  data: Data
}

export interface Data {
  id: number
  name: string
  user_type: string
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
  phone?: string
}
export interface UserDetailsErrRes {
  message: string | any;
}
export interface UserDetailsReq {
  token: string
}
