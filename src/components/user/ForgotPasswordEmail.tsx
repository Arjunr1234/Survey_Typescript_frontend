import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmailService } from "../../services/userServices";
import { toast } from "sonner";

const ForgotPasswordEmail: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");
    console.log("Password reset link sent to:", email);
    try {
      const response = await verifyEmailService(email);
      if(response.success){
        navigate('/reset-password', {state:{email}})
        setSuccessMessage("");
      }
      
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
    
    
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Forgot Password</h2>
        <p className="text-gray-300 text-center mb-6">Enter your email to reset your password.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 rounded-lg border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          >
           Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
