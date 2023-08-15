export interface Threshold {
    id: number;
    name: string;
    remarks: string|null;
}

export interface SimpleThreshold {
    id: number;
    name: string;
}

export interface SimpleThresholdBody {
    id: number;
}

export interface ThresholdBody {
    id?: number;
    name: string;
    remarks: string|null;
}

export interface ThresholdResponse {
    status: number;
    message: string;
    data: Threshold[];
}

export interface WriteThresholdResponse {
    status: number;
    message: string;
}

export interface ThresholdErrorResponse {
    status?: number;
    message: string | any;
}