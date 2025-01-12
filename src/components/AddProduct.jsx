import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const AddProduct = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    thumbnail: "",
  });

  //   form submit function
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  //   form onchange function
  const handleChange = () => {};

  return (
    <div className="w-1/5 border h-full p-4 bg-gray-100">
      <h1 className="text-3xl font-semibold text-black text-center py-8">
        Add Product
      </h1>

      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter Product Title"
            name="title"
            value={formState.title}
            onChange={handleChange}
            className="px-3 py-2 border rounded-sm text-black w-full"
          />

          <textarea
            name="description"
            placeholder="Enter Product Description"
            value={formState.description}
            onChange={handleChange}
            className="px-3 py-2 border rounded-sm text-black w-full"
          ></textarea>

          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="px-3 py-2 border rounded-sm text-black w-full"
          />

          <input
            type="text"
            placeholder="Enter Image URL"
            name="thumbnail"
            value={formState.thumbnail}
            onChange={handleChange}
            className="px-3 py-2 border rounded-sm text-black w-full"
          />

          <input
            type="submit"
            className="px-2 py-2 border border-cyan-500 font-medium text-sm text-cyan-500 rounded-xs w-full hover:bg-cyan-500 hover:text-white transition-all duration-300 rounded-sm mt-2"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
