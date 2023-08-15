import { Act } from '../act';

export interface Section{
    id: number
    name: string
    chapter_number: any
    subtitle_number: any
    sub_subtitle_number: any
    clause_number: any
    sub_clause_number: any
    remarks: any
    act: Act
}

export interface SimpleSection {
    id: number;
    name: string;
}

export interface SimpleSectionBody{
    id: number;
}

export interface SimpleActSectionBody{
    act_id: number;
}

export interface SectionBody {
    id?: number;
    name: string;
    chapter_number: null|string;
    subtitle_number: null|string;
    sub_subtitle_number: null|string;
    clause_number: null|string;
    sub_clause_number: null|string;
    act_id: number;
    remarks: string;
}

export interface SectionResponse {
    status: number;
    message: string;
    data: Section[];
}

export interface WriteSectionResponse {
    status: number;
    message: string;
}

export interface SectionErrorResponse {
    status?: number;
    message: string | any;
}