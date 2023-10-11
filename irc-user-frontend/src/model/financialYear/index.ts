export interface FinancialYear{
    id: number;
    financial_year: string;
    assesment_year: string;
    remarks:string;
}

export interface SimpleFinancialYear {
    id: number;
    name: string;
}

export interface SimpleFinancialYearBody{
    id: number;
}

export interface FinancialYearBody {
    id?: number;
    financial_year: string;
    assesment_year: string;
}

export interface FinancialYearResponse {
    status: number;
    message: string;
    data: FinancialYear[];
}

export interface WriteFinancialYearResponse {
    status: number;
    message: string;
}

export interface FinancialYearErrorResponse {
    status?: number;
    message: string | any;
}