import { axiosClient } from '../axiosClient';
import { FormBody, SimpleFormBody } from '../../model/form'

export const getAllFormAPI = async (setForms: any) => {
    
    return await axiosClient
      .get(`form`)
      .then((response: any) => setForms(response?.data?.data))
      .catch((error: any) => console.log(error?.response?.data));
}


export const allFormSimple = async (payload: any, setForms: any) => {
    
    return await axiosClient
      .post(`form/simple`, payload)
      .then((response: any) => setForms(response?.data))
      .catch((error: any) => console.log(error.response.data.message));
}

export const addForm = async (payload: FormBody, setResponse: any) => {
    
    return await axiosClient
        .post(`form`, payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const updateForm = async (payload: FormBody, setResponse: any) => {
    
    return await axiosClient
        .post(`form/update`,payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const deleteForm = async (payload: SimpleFormBody, setResponse: any) => {
        
    return await axiosClient
        .post(`form/delete`,payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}

