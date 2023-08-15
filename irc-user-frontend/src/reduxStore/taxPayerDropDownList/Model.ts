export type TaxPayerDropDownListRes = TaxPayerDropDownList[];

export interface TaxPayerDropDownList {
  id: number;
  name: string;
}
export interface TaxPayerDropDownListErrRes {
  message: string | any;
}
export interface TaxPayerDropDownListReq {
  token: string;
}
