import { Act } from '../act';
import { Section } from '../section';

export interface Form{
    id: number;
    name: string;
    form_type: string;
    remarks: string;
    sections: Section[];
    act:Act;
}

export interface SimpleForm {
    id: number;
    name: string;
}

export interface SimpleFormBody {
    id: number;
}

export interface FormBody {
    id?: number;
    name: string;
    sections: number;
    remarks: string;
}

export interface FormResponse {
    status: number;
    message: string;
    data: Form[];
}

export interface WriteFormResponse {
    status: number;
    message: string;
}

export interface FormErrorResponse {
    status?: number;
    message: string | any;
}

export interface FormType {
    id: number | string;
    name: string;
}