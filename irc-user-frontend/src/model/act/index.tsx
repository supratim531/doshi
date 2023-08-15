import { Regulator } from '../regulator';

export interface Act{
    id: number;
    name: string;
    remarks: string;
    regulator: Regulator;
}

export interface SimpleAct {
    id: number;
    name: string;
}

export interface SimpleActBody{
    id: number;
}

export interface SimpleRegulatorActBody{
    regulator_id: number;
}

export interface ActBody {
    id?: number;
    name?: string;
    regulator_id?: number;
    remarks?: string;
}

export interface ActResponse {
    status: number;
    message: string;
    data: Act[];
}

export interface WriteActResponse {
    status: number;
    message: string;
}

export interface ActErrorResponse {
    status?: number;
    message: string | any;
}