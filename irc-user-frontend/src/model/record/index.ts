import { Frequency } from '../frequency';
import { FinancialYear } from '../financialYear';

import { TaxPayer } from '../taxPayer';

import { Form } from '../form';

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
    states?: any[];
    threshold: string;
    description: string | null;
    extended_due_date_1: string | null;
    extended_due_date_remark_1: string | null;
    extended_due_date_2: string | null;
    extended_due_date_remark_2: string | null;
    extended_due_date_3: string | null;
    extended_due_date_remark_3: string | null;
    extended_due_date_4: string | null;
    extended_due_date_remark_4: string | null;
    extended_due_date_5: string | null;
    extended_due_date_remark_5: string | null;
    form: Form
    financial_year: FinancialYear
    frequency: Frequency
}
