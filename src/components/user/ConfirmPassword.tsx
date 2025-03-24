import React, { useState, useEffect } from "react";
import { resetPasswordService } from "../../services/userServices";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ConfirmPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [success, setSuccess] = useState("");
  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email

  
  const validatePassword = (password: string) => {
    if (!/[A-Z]/.test(password)) {
      return "Password should start with an uppercase letter.";
    }
    if (password.length < 6) {
      return "Password should contain at least 6 characters.";
    }
    if (!/\d/.test(password)) {
      return "Password should contain at least one number.";
    }
    if (!/[@$!%*?&]/.test(password)) {
      return "Password should contain at least one special character.";
    }
    return ""; 
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    let validationErrors: { newPassword?: string; confirmPassword?: string } = {};

    
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      validationErrors.newPassword = passwordError;
    }

    
    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await resetPasswordService(email, newPassword);
      if(response.success){
        navigate("/")
        toast.success("Password successfully updated!")
        setSuccess("Password successfully updated!");
      }
    } catch (error) {
      
    }
    
  };

  
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Confirm Password</h2>
        <p className="text-gray-300 text-center mb-6">Enter your new password below.</p>

        {success && <p className="text-green-400 text-sm text-center mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">New Password</label>
            <input
              type="password"
              className={`w-full p-3 bg-white/20 text-white placeholder-gray-300 rounded-lg border ${errors.newPassword ? "border-red-400" : "border-white/40"} focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg`}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {errors.newPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              className={`w-full p-3 bg-white/20 text-white placeholder-gray-300 rounded-lg border ${errors.confirmPassword ? "border-red-400" : "border-white/40"} focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg`}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Confirm Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
