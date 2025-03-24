import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from 'sweetalert2'
import { useAuth } from "../../contexts/AuthContext";
import { userLogoutService } from "../../services/userServices";


function Header() {
      const navigate = useNavigate();
      const {logoutUser, isUserLoggedIn} = useAuth();

      useEffect(() => {
        console.log("isUserLoggedIn: ", isUserLoggedIn);
        
      },[logoutUser])
      const confirmLogout = async() => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out of your account!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, log me out!',
        }).then((result) => {
          if (result.isConfirmed) {
              userLogoutService()
              logoutUser()
              toast.success("Successfully logout!!");
          }
        });
      }


  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
    <h1 className="text-xl font-semibold">My Survey</h1>
    <div className="flex gap-4">
      <button className="bg-white cursor-pointer text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition"
      onClick={() => navigate('/view')}>
        My Responses
      </button>
      <button className="bg-white cursor-pointer text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition"
       onClick={() => navigate('/form')}>
        Form
      </button>
      <button className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
      onClick={confirmLogout}>
        Logout
      </button>
    </div>
  </header>
  );
}

export default Header;
