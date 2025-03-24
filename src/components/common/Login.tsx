import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import LoginImg from '../../assets/login.jpg';
import { googleAuthService, signInService } from '../../services/userServices';
import { validateLogin } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';
import { adminLoginService } from '../../services/adminServices';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


interface LoginProps {
  role: 'user' | 'admin';
}

const Login: React.FC<LoginProps> = ({ role }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { setIsUserLoggedIn, isUserLoggedIn,isAdminLoggedIn, setAdminLoggedIn } = useAuth()

  useEffect(() => {
   
    if (role === 'user' && isUserLoggedIn) {
      navigate('/home', { replace: true });
    }
    console.log("isadminLoggedIn: ", isAdminLoggedIn)
    if (role === 'admin' && isAdminLoggedIn) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isUserLoggedIn,isAdminLoggedIn, role, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateLogin(email, password);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        let response 
        if(role === 'user'){
          response = await signInService(email, password);
        }else if(role === 'admin'){
          response = await adminLoginService({email,password})
        }
        
        if (response.success) {
          toast.success(`${role === 'user' ? 'User' : 'Admin'} login successful!`);
         role === 'user' ? setIsUserLoggedIn(true) : setAdminLoggedIn(true);
          navigate(role === 'user' ? '/home' : '/admin/dashboard');
        }
      } catch (error: any) {
        console.log("ERror in login: ", error)
        toast.error(error.response?.data?.message || 'Login failed');
      }
    } else {
      setTimeout(() => setErrors({}), 2000);
    }
  };

  const handleSuccessGoogleLogin = async(response:any) => {
      console.log(response)
      const decodedToken: any = jwtDecode(response.credential);
      console.log(decodedToken);
     
      const { name, email } = decodedToken;
      
      try {
           const response = await googleAuthService(email, name);
           if(response.success){
              toast.success("Login successfull!!");
              setIsUserLoggedIn(true)
              navigate('/home', {replace:true})
           }
      } catch (error) {
         console.log("Error in google login: ", error)
      }

  }

  const handleFailureGoogleLogin = () => {
     
     toast.error("Failed to login!!")
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <img src={LoginImg} alt="Login" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-4xl font-extrabold text-white text-center mb-3">Welcome {role === 'user' ? 'Back' : 'Admin'}</h1>
          <h2 className="text-lg text-gray-300 text-center mb-6">Login to Your {role === 'user' ? 'Account' : 'Admin Panel'}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg" />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/30 text-white placeholder-gray-200 rounded-lg border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg" />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/30 text-white placeholder-gray-200 rounded-lg border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {role === 'user' ? 'Login' : 'Admin Login'}
            </button>
            {role === 'user' && (
               <div className="flex justify-center items-center ">
                 <GoogleLogin
                   onSuccess={handleSuccessGoogleLogin}
                   onError={handleFailureGoogleLogin}
                   text={'signin_with'}
                  />
               </div>
             )}
            {role === 'user' && (
              
              
              <p className="text-gray-300 text-center mt-4 cursor-pointer hover:underline" onClick={() => navigate('/signup')}>
                Don't have an account? <span className="text-yellow-400 font-semibold">Sign Up</span>
              </p>
            )}
            {role === 'user' && (
          <p 
            className="text-blue-400 text-center text-sm  cursor-pointer hover:underline"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </p>
        )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
