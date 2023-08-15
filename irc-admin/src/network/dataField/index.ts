import { axiosClient } from '../axiosClient';
import { RegulatorBody, SimpleRegulatorBody } from '../../model/regulator'

export const getAllRegulatorsAPI = async (setRegulators: any) => {
    
    return await axiosClient
      .get(`regulator`)
      .then((response: any) => setRegulators(response?.data?.data))
      .catch((error: any) => console.log(error?.response?.data));
}

export const allRegulatorSimple = async (setRegulators: any) => {
    
    return await axiosClient
      .post(`regulator/simple`, true)
      .then((response: any) => setRegulators(response?.data))
      .catch((error: any) => console.log(error?.response?.data?.message));
}

export const addRegulator = async (payload: RegulatorBody, setResponse: any) => {
    return await axiosClient
        .post(`regulator`, payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}

export const updateRegulator = async (payload: RegulatorBody, setResponse: any) => {
    return await axiosClient
        .post(`regulator/update`,payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}

export const deleteRegulator = async (payload: SimpleRegulatorBody, setResponse: any) => {
        
    return await axiosClient
        .post(`regulator/delete`,payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}