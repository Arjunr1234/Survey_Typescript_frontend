import { axiosInstance } from "../api/axiosInstance";



export const adminLoginService = async(data:{email:string, password:string}) => {
    try {
        const response = await axiosInstance.post('/api/auth/admin/login', data);
        console.log("Resposne; ", response)
        return response.data
        
    } catch (error) {
        console.log("Error in adminLoginService; ", error);
        throw error
    }
}

export const fetchAllResponseServic = async() => {
     try {

        const response = await axiosInstance.get('/api/auth/admin/form-data');
        return response.data
        
     } catch (error) {
        console.log("Error in fetchAllResposeService: ", error);
        throw error
     }
}

export const adminLogoutService = async() => {
    try {
       const response = await axiosInstance.get('/api/auth/admin/logout');
       
       return  response.data
      
    } catch (error) {
        console.log("userLogoutService: ", error);
        throw error
    }
 }