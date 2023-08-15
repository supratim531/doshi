import { axiosClient } from '../axiosClient';
import { TaxPayerBody, SimpleTaxPayerBody } from '../../model/taxPayer';

export const getAllTaxPayerAPI = async (setTaxPayers: any) => {

    return await axiosClient
        .get(`taxpayer`)
        .then((response: any) => setTaxPayers(response?.data?.data))
        .catch((error: any) => console.log(error?.response?.data));
}

export const allTaxPayerSimple = async (setTaxPayers: any) => {

    return await axiosClient
        .post(`taxpayer/simple`)
        .then((response: any) => setTaxPayers(response?.data))
        .catch((error: any) => console.log(error?.response?.data));
}



export const addTaxPayer = async (payload: TaxPayerBody, setResponse: any) => {

    return await axiosClient
        .post(`taxpayer`, payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const updateTaxPayer = async (payload: TaxPayerBody, setResponse: any) => {

    return await axiosClient
        .post(`taxpayer/update`, payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const deleteTaxPayer = async (payload: SimpleTaxPayerBody, setResponse: any) => {

    return await axiosClient
        .post(`taxpayer/delete`, payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}