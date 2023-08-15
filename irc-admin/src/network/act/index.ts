import { axiosClient } from '../axiosClient';
import { ActBody, SimpleActBody, SimpleRegulatorActBody } from '../../model/act'

export const getAllActAPI = async (setActs: any) => {

    return await axiosClient
        .get(`act`)
        .then((response: any) => {
            console.log('debug:', response)
            setActs(response?.data?.data)
        })
        .catch((error: any) => {
            console.log('debug:', error)
            console.log(error?.response?.data)
        });
}

export const allActSimple = async (payload: SimpleRegulatorActBody, setActs: any) => {

    return await axiosClient
        .post(`act/simple`, payload)
        .then((response: any) => setActs(response?.data))
        .catch((error: any) => console.log(error.response.data.message));
}

export const addAct = async (payload: ActBody, setResponse: any) => {

    return await axiosClient
        .post(`act`, payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const updateAct = async (payload: ActBody, setResponse: any) => {

    return await axiosClient
        .post(`act/update`, payload)
        .then((response: any) => setResponse(response.data))
        .catch((error: any) => setResponse(error.response.data));
}

export const deleteAct = async (payload: SimpleActBody, setResponse: any) => {

    return await axiosClient
        .post(`act/delete`, payload)
        .then((response: any) => setResponse(response?.data))
        .catch((error: any) => setResponse(error?.response?.data));
}