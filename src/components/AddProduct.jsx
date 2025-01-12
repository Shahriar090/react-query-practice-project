import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AddProduct = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const queryClient = useQueryClient();

  //   mutation function
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.post("http://localhost:3000/products", newProduct);
    },
    // Invalidating the cache for products after adding a new product to show the latest products in the UI without refreshing or changing tabs.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  //   form submit function
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newFormData = { ...formState, id: crypto.randomUUID().toString() };
    mutation.mutate(newFormData);
    setFormState({
      title: "",
      description: "",
      price: "",
      rating: "",
      thumbnail: "",
    });
  };

  //   form onchange function
  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "number" ? e.target.valueAsNumber : e.target.value;

    setFormState({ ...formState, [name]: value });
  };

  if (mutation.isPending) return <p>Adding Product....</p>;
  if (mutation.isError) {
    <div>An Error Occurred : {mutation.error.message}</div>;
  }
  if (mutation.isSuccess) {
    setTimeout(() => mutation.reset(), 3000);
    return <p>Product Added Successfully...!</p>;
  }
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
