export interface Section{
    id: number;
    name: string;
    remarks: string;
    // act: Act;
}

export interface SimpleSection {
    id: number;
    name: string;
}

export interface SimpleSectionBody{
    act_id: number;
}

export interface SectionBody {
    id?: number;
    name: string;
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