import { Frequency } from '../frequency';
import { FinancialYear } from '../financialYear';

import { TaxPayer } from '../taxPayer';

import { Form } from '../form';
import { State } from '../state';

export interface RecordResponse {
    status: number
    message: string
    data: Record[]
}

export interface Record {
    id: number
    form_type: string
    date_from: string
    date_to: string
    actual_date: string
    tax_payers: TaxPayer[]
    threshold: string;
    description: string|null;
    extended_due_date_1: string|null;
    extended_due_date_remark_1: string|null;
    extended_due_date_2: string|null;
    extended_due_date_remark_2: string|null;
    extended_due_date_3: string|null;
    extended_due_date_remark_3: string|null;
    extended_due_date_4: string|null;
    extended_due_date_remark_4: string|null;
    extended_due_date_5: string|null;
    extended_due_date_remark_5: string|null;
    form: Form
    financial_year: FinancialYear
    frequency: Frequency
}

export interface RecordBody {
    id?: number
    form_type: string,
    form_id: number,
    states:string,
    financial_year_id: number,
    date_from: string,
    date_to: string,
    actual_date: string,
    tax_payers: string,
    frequency_id: number,
    threshold: string, 
    description: string|null;
    extended_due_date_1: string|null;
    extended_due_date_remark_1: string|null;
    extended_due_date_2: string|null;
    extended_due_date_remark_2: string|null;
    extended_due_date_3: string|null;
    extended_due_date_remark_3: string|null;
    extended_due_date_4: string|null;
    extended_due_date_remark_4: string|null;
    extended_due_date_5: string|null;
    extended_due_date_remark_5: string|null;
}

export interface WriteRecordResponse {
    status: number,
    message: string,
}

