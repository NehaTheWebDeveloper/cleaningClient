import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../Database/Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddOnForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    perVisit: "",
    serviceTypeId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create a new object with the correct field names
      const requestData = {
        name: formData.name,
        price: formData.price,
        perVisit: formData.perVisit,
        serviceTypeId: formData.serviceTypeId,
      };
  
      // Add the data to Firestore
      const docRef = await addDoc(collection(db, "addons"), requestData);
  
      // Handle the response here
  
      if (docRef.id) {
        // Clear the form after a successful submission
        setFormData({
          name: "",
          price: "",
          perVisit: "",
          serviceTypeId: "",
        });
        toast.success("Add-On added successfully!", {
          position: "top-right",
        });
      } 
    } catch (error) {
      console.error("Error creating Add-On:", error);
      toast.error("Failed to add Add-On", {
        position: "top-right",
      });
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Add-On</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Add-On Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-lg"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="perVisit"
            className="block text-sm font-medium text-gray-700"
          >
            Per Visit
          </label>
          <input
            id="perVisit"
            name="perVisit"
            value={formData.perVisit}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-lg"
            required
          />
        </div>

        <div>
          <label
            htmlFor="serviceTypeId"
            className="block text-sm font-medium text-gray-700"
          >
            Service Type ID
          </label>
          <input
            type="text"
            id="serviceTypeId"
            name="serviceTypeId"
            value={formData.serviceTypeId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-lg"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Add-On
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOnForm;
