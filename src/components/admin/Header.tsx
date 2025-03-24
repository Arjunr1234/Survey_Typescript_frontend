import React from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";
import { adminLogoutService } from "../../services/adminServices";


const Header: React.FC = () => {
  const { logoutAdmin } = useAuth();

  const confirmLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await adminLogoutService();
          if (response?.success) {
            logoutAdmin();
            toast.success("Successfully logged out!");
          } else {
            toast.error("Logout failed. Please try again.");
          }
        } catch (error) {
          console.error("Logout error: ", error);
          toast.error("An error occurred while logging out.");
        }
      }
    });
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold">Responses</h1>

      <button
        onClick={confirmLogout}
        className="px-4 cursor-pointer py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
