import { axiosClient } from "../axiosClient";

export const getState = async (setState:any) => {
        
    return await axiosClient
        .get(`state`)
        .then((response: any) => setState(response?.data?.data))
        .catch((error: any) => setState(error?.response?.data));
}