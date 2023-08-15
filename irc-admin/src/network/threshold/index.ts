import { axiosClient } from '../axiosClient';
import { ThresholdBody, SimpleThresholdBody } from '../../model/threshold';

export const getAllThresholdAPI = async (setThresholds: any) => {
    
    return await axiosClient
      .get(`threshold`)
      .then((response: any) => setThresholds(response?.data?.data))
      .catch((error: any) => console.log(error?.response?.data));
}


export const addThreshold = async (payload: ThresholdBody, setResponse: any) => {
    
    return await axiosClient
        .post(`threshold`, payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const updateThreshold = async (payload: ThresholdBody, setResponse: any) => {
    
    return await axiosClient
        .post(`threshold/update`,payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const deleteThreshold = async (payload: SimpleThresholdBody, setResponse: any) => {
        
    return await axiosClient
        .post(`threshold/delete`,payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}