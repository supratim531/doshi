export interface BusinessListResponse {
 	status: number
  	message: string
  	data: Business[]
}

export interface Business {
  	id: number
	pan: string
  	name: string
  	taxpayer_id: string
  	regulators: any
}

export interface BusinessErrorResponse {
    status?: number;
    message: string | any;
}