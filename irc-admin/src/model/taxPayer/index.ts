import { Regulator } from "../regulator";

export interface TaxPayer {
    id: number;
    name: string;
    pan_letter: string;
    regulators: Regulator[]
    remarks: string|null;
}

export interface SimpleTaxPayer {
    id: number;
    name: string;
}

export interface SimpleTaxPayerBody {
    id: number;
}

export interface TaxPayerBody {
    id?: number;
    name: string;
    pan_letter: string;
    regulators: string;
    remarks: string|null;
}

export interface TaxPayerResponse {
    status: number;
    message: string;
    data: TaxPayer[];
}

export interface WriteTaxPayerResponse {
    status: number;
    message: string;
}

export interface TaxPayerErrorResponse {
    status?: number;
    message: string | any;
}