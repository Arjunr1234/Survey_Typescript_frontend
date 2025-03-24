import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Modal from "../common/Modal";
import { fetchAllResponseServic } from "../../services/adminServices";
import { useAuth } from "../../contexts/AuthContext";

interface User {
  id: string;
  userName: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAdminLoggedIn } = useAuth();
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  useEffect(() => {
    console.log("isAdmin: ", isAdminLoggedIn);
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await fetchAllResponseServic();
      if (response?.success) {
        setData(response.formData);
        setFilteredData(response.formData);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error in fetchDetails: ", error);
      toast.error("An error occurred while fetching data");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filtered = data.filter((user) =>
      user.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Listed Forms
      </h1> */}

      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-center">
              <th className="p-4 w-1/4">User</th>
              <th className="p-4 w-1/4">Name</th>
              <th className="p-4 w-1/4">Email</th>
              <th className="p-4 w-1/4">Phone</th>
              <th className="p-4 w-1/4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition duration-200 text-center`}
              >
                <td className="p-4">{user.userName}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone}</td>
                <td className="p-4">
                  <button
                    className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => setSelectedUser(user)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        <button
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span className="px-4 py-2 text-gray-700">Page {currentPage} of {totalPages}</span>

        <button
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {selectedUser && <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
};

export default Dashboard;
