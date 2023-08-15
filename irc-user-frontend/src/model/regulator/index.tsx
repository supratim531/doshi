export interface Regulator {
    id: number
    name: string
    color_code: string
    remarks: string
}

export interface SimpleRegulator {
    id: number
    name: string
}

export interface RegulatorBody {
    id?: number;
    name: string;
    color_code: string;
    remarks: string;
}

export interface RegulatorsResponse {
    status: number;
    message: string;
    data: Regulator[];
}

export interface WriteRegulatorResponse {
    status: number;
    message: string;
}

export interface RegulatorsErrorResponse {
    status?: number;
    message: string | any;
}

export interface BusinessRegulator{
    id: number;
    name: string;
    checked: boolean;
    default: boolean;
}