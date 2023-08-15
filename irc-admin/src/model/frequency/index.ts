import { Act } from '../act';

export interface Frequency{
    id: number;
    name: string;
    frequency_type: string;
    days: number | null;
    months: number | null;
    years: number | null;
    hours: number | null;
    minutes: number | null;
    remarks: string | null;
}

export interface SimpleFrequency {
    id: number;
    name: string;
}

export interface SimpleFrequencyBody{
    act_id: number;
}

export interface FrequencyBody {
    id?: number;
    name: string;
    frequency_type: string;
    days: number | null;
    months: number | null;
    years: number | null;
    hours: number | null;
    minutes: number | null;
    remarks: string | null;
}

export interface FrequencyResponse {
    status: number;
    message: string;
    data: Frequency[];
}

export interface WriteFrequencyResponse {
    status: number;
    message: string;
}

export interface FrequencyErrorResponse {
    status?: number;
    message: string | any;
}

export interface SimpleFrequencyBody {
    id: number;
}