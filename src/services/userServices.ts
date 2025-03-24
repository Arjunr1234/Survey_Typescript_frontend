
import { axiosInstance } from "../api/axiosInstance";
import { FormData } from "../interface/user";



export const signupService = async (name:string, email:string, phone:string, password:string) => {
    try {
        
        const response = await axiosInstance.post('/api/signup', {name, email, phone, password});
        return response.data
      
    } catch (error) {
         console.log("Error :", error);
         throw error
    }
}

export const signInService = async (email:string, password:string) => {
    try {
         const response = await axiosInstance.post('/api/signin', {email, password});
         return response.data;
       
    } catch (error) {
       console.log("Error in Service: ", error);
       throw error
    }
}

export const userLogoutService = async() => {
    try {
       const response = await axiosInstance.get('/api/logout');
       response.data
      
    } catch (error) {
        console.log("userLogoutService: ", error);
        throw error
    }
 }

 export const fetchFormDataService = async() => {
    try {
         const response = await axiosInstance.get('/api/submissions');
         return response.data
         
    } catch (error) {
         console.log("Error in fetchFormData: ", error);
         throw error
    }
}

export const formService = async(data:FormData) => {
    try {
        
         const response = await axiosInstance.post('/api/submit', data);
         return response.data;

    } catch (error) {
         console.log("Error in Service: ", error);
         throw error
    }
}

export const googleAuthService = async (email:string, name:string) => {
     try {
          const response = await axiosInstance.put('/api/google-signin', {email, name});
          return response.data
        
     } catch (error) {
        console.log("Error in googleAuthService: ", error);
        throw error
     }
}

export const verifyEmailService = async(email:string) => {
      try {
           const response =  await axiosInstance.get(`/api/verify-user/${email}`);
           return response.data
          
      } catch (error) {
          console.log("Error in verifyEmailService: ", error);
          throw error
      }
}

export const resetPasswordService = async(email:string, password:string) => {
      try {
          console.log(email, password);
          
          const response =  await axiosInstance.put(`/api/reset-password`, {email, password});
           return response.data
          
      } catch (error) {
          console.log("Error in resetPasswordService: ", error);
          throw error
      }
}