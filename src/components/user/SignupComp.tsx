import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
import { validateSignup } from '../../utils/validation';
import { signupService } from '../../services/userServices';

interface Errors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupComp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = validateSignup(name, phone, email, password);

    // Check if confirm password matches
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await signupService(name, email, phone, password);
        if (response.success) {
          toast.success('Signup successful!');
          navigate('/');
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Signup failed');
      }
    } else {
      setTimeout(() => setErrors({}), 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-300 to-indigo-400">
      <div className="bg-white/40 backdrop-blur-md shadow-lg p-8 rounded-xl w-full max-w-md border border-white/50">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">Let's Chat</h1>
        <h2 className="text-lg text-gray-700 text-center mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-white/80 text-gray-900 placeholder-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type="tel"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-white/80 text-gray-900 placeholder-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-white/80 text-gray-900 placeholder-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-white/80 text-gray-900 placeholder-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-white/80 text-gray-900 placeholder-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-lg hover:opacity-80 transition duration-300"
          >
            Sign Up
          </button>

          <p
            className="text-gray-700 text-center mt-3 cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            Already a user? <span className="text-blue-600 font-semibold">Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupComp;
