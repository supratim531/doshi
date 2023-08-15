import { axiosClient } from '../axiosClient';
import { FrequencyBody, SimpleFrequencyBody } from '../../model/frequency'

export const getAllFrequencyAPI = async (setFrequencys: any) => {
    
    return await axiosClient
      .get(`frequency`)
      .then((response: any) => setFrequencys(response?.data?.data))
      .catch((error: any) => console.log(error?.response?.data));
}


export const addFrequency = async (payload: FrequencyBody, setResponse: any) => {
    
    return await axiosClient
        .post(`frequency`, payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const updateFrequency = async (payload: FrequencyBody, setResponse: any) => {
    
    return await axiosClient
        .post(`frequency/update`,payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const deleteFrequency = async (payload: SimpleFrequencyBody, setResponse: any) => {
        
    return await axiosClient
        .post(`frequency/delete`,payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}