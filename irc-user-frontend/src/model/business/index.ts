export interface Business {
    id: number,
    pan: string,
    name: string,
    taxpayer_id: number,
}

export interface BusinessUser {
    id: number,
    name: string,
    email: string,
    taxpayer_id: number,
}

export interface BusinessBody {
    id?: number,
    pan: string,
    name: string,
    taxpayer_id: number,
}

export interface BusinessResponse {
    status: number;
    message: string;
    data: Business[];
}

export interface BusinessUserResponse {
    status: number;
    message: string;
    data: BusinessUser[];
}

export interface BusinessUserBody{
    id: number;
}

export interface WriteBusinessResponse {
    status: number;
    message: string;
}

export interface AddBusinessUserBody {
    id: number;
    email: string;
    role: string;
}

export interface AddBusinessUserBodyResponse {
    status: number;
    message: string;
}

export interface BusinessErrorResponse {
    status?: number;
    message: string | any;
}

export interface WriteBusinessThreshold {
    id: number;
    thresholds: string;
}

export interface BusinessThreshold {
    id: number;
    name: string;
    remarks: string|null;
    value: number;
}

export interface BusinessThresholdResponse {
    status: number;
    message: string;
    data: BusinessThreshold[];
}

export interface BusinessIdBody {
    id: number;
}

export interface WriteResponse {
    status: number;
    message: string;
}