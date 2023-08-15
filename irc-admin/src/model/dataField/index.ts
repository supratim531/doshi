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

export interface UserDataFieldBody {
    id?: number
    name: string
    placeholder: string|null
    variable: string
    priority: number
    isEditable:number
    remarks: string|null
}


export interface DataFieldErrorResponse {
    status?: number;
    message: string | any;
}