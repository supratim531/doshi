import { SimpleRegulator } from '../regulator';
import { SimpleTaxPayer } from '../taxPayer';

export interface DataFieldResponse {
    status: number
    message: string
    data: DataField[]
}

export interface DataField {
    id: number
    name: string
    placeholder: string|null
    variable: string
    priority: number
    regulators: SimpleRegulator[]
    tax_payers: SimpleTaxPayer[]
    remarks: string|null
}

export interface DataFieldBody {
    id?: number
    name: string
    placeholder: string|null
    variable: string
    priority: number
    regulators: string|null
    tax_payers: string|null
    remarks: string|null
}

export interface DataFieldErrorResponse {
    status?: number;
    message: string | any;
}

export interface BusinessDataFieldResponse {
    status: number
    message: string
    data: BusinessDataField[]
}

export interface BusinessDataField {
    id: number,
    name: string,
    placeholder: string,
    value: string | null,
}

export interface DFWriteResponse {
    status: number;
    message: string | any;
}
