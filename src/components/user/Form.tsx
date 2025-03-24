import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FormData, FormErrors } from "../../interface/user";
import { formService } from "../../services/userServices";
import { validateForm } from "../../utils/validation"; 

const Form: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm(form); 
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please correct the errors before submitting.");
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    try {
      const result = await formService(form);
      if (result.success) {
        toast.success("Successfully submitted!!");
        setForm({
          name: "",
          gender: "",
          nationality: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        setErrors({});
        navigate("/view");
      }
    } catch (err) {
      console.error("Error in form submission: ", err);
    }
  };

  return (
    <div className="h-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Survey Form</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-semibold">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Nationality</label>
            <input type="text" name="nationality" value={form.nationality} onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-600 font-semibold">Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-600 font-semibold">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
