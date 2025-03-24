import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { fetchFormDataService } from "../../services/userServices";

interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  formData: UserType[];
}

function ViewForms() {
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: ApiResponse = await fetchFormDataService();
      if (response.success) {
        setData(response.formData);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error in FetchData: ", err);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Listed Forms
      </h1> */}

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-1/2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-center">
              <th className="p-4 w-1/4">Name</th>
              <th className="p-4 w-1/4">Email</th>
              <th className="p-4 w-1/4">Phone</th>
              <th className="p-4 w-1/4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition duration-200 text-center`}
                >
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
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      {selectedUser && <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}

export default ViewForms;
