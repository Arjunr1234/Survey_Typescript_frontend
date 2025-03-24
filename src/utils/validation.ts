import { FormData, FormErrors } from "../interface/user";

type ValidationErrors = {
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
  };
  
  
  export const validateSignup = (
    name: string,
    phone: string,
    email: string,
    password: string
  ): ValidationErrors => {
    let errors: ValidationErrors = {};
  
    if (!name.trim()) errors.name = "Name is required!";
    if (!phone.trim()) errors.phone = "Phone number is required!";
    if (!email.trim()) {
      errors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format!";
    }
    if (!password.trim()) {
      errors.password = "Password is required!";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters!";
    }
    else if (!/^[A-Z]/.test(password)) {
      errors.password = " must start with an uppercase letter!";
    }
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "must contain at least one special character!";
    }
  
    return errors;
  };
  
  
  type LoginErrors = {
    email?: string;
    password?: string;
  };
  
 
  export const validateLogin = (email: string, password: string): LoginErrors => {
    const errors: LoginErrors = {};
  
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }
  
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  
    return errors;
  };


  export const validateForm = (form: FormData): FormErrors => {
    let newErrors: FormErrors = {};
  
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.nationality.trim()) newErrors.nationality = "Nationality is required";
  
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
  
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
  
    if (!form.address.trim()) newErrors.address = "Address is required";
  
    return newErrors;
  };
  