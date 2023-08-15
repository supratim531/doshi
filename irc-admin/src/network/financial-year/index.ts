import { axiosClient } from '../axiosClient';
import { FinancialYearBody, SimpleFinancialYearBody } from '../../model/financialYear';

export const getAllFinancialYearAPI = async (setFinancialYears: any) => {
    
    return await axiosClient
      .get(`financial-year`)
      .then((response: any) => setFinancialYears(response?.data?.data))
      .catch((error: any) => console.log(error?.response?.data));
}


export const addFinancialYear = async (payload: FinancialYearBody, setResponse: any) => {
    
    return await axiosClient
        .post(`financial-year`, payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const updateFinancialYear = async (payload: FinancialYearBody, setResponse: any) => {
    
    return await axiosClient
        .post(`financial-year/update`,payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const deleteFinancialYear = async (payload: SimpleFinancialYearBody, setResponse: any) => {
        
    return await axiosClient
        .post(`financial-year/delete`,payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}