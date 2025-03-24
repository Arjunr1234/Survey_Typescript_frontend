export interface FormData {
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  gender?: string;
  nationality?: string;
  email?: string;
  phone?: string;
  address?: string;
}