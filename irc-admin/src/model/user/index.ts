export interface UserListResponse {
 	status: number
  	message: string
  	data: User[]
}

export interface User {
  	id: number
  	name: string
  	user_type: string
  	email: string
  	email_verified_at: any
  	email_otp?: number
  	email_verification_code_expire?: string
  	created_at: string
  	updated_at: string
}

export interface UserErrorResponse {
    status?: number;
    message: string | any;
}

export interface UserDetailsResponse {
    message: string
    data: UserDetails
}

export interface UserDetails {
    id: number
    name: string
    user_type: string
    email: string
    email_verified_at: any
    email_otp: number
    email_verification_code_expire: string
    created_at: string
    updated_at: string
}

export interface ErrorResponse {
    message: string | any;
}