import { axiosClient } from '../axiosClient';
import { SectionBody, SimpleSectionBody } from '../../model/section'

export const getAllSectionAPI = async (setSections: any) => {
    
    return await axiosClient
      .get(`section`)
      .then((response: any) => setSections(response?.data?.data))
      .catch((error: any) => console.log(error?.response?.data));
}

export const allSectionSimple = async (payload: any, setSections: any) => {
    
    return await axiosClient
      .post(`section/simple`, payload)
      .then((response: any) => setSections(response?.data))
      .catch((error: any) => console.log(error.response.data.message));
}

export const addSection = async (payload: SectionBody, setResponse: any) => {
    
    return await axiosClient
        .post(`section`, payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const updateSection = async (payload: SectionBody, setResponse: any) => {
    
    return await axiosClient
        .post(`section/update`,payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const deleteSection = async (payload: SimpleSectionBody, setResponse: any) => {
        
    return await axiosClient
        .post(`section/delete`,payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}