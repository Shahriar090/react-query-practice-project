import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// retrieving products
const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=10`
  );
  return response?.data;
};

// delete product
const deleteProduct = async (id) => {
  await axios.delete(`http://localhost:3000/products/${id}`);
};

const ProductList = ({ onProductSelect }) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {
    isError,
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onMutate: async (id) => {
      // cancel any ongoing queries for products to avoid conflicts
      await queryClient.cancelQueries(["products"]);

      // get the current list of products from the cache.
      const previousProducts = queryClient.getQueryData(["products", { page }]);

      // optimistically update the cache by removing the product with the given id
      queryClient.setQueryData(["products", { page }], (oldData) => ({
        ...oldData,
        data: oldData.data.filter((product) => product.id !== id),
      }));

      // return the previous products so we can restore them if an error occurs
      return { previousProducts };
    },

    onError: (err, id, context) => {
      // rollback to the previous state using the context if an error happens
      queryClient.setQueryData(
        ["products", { page }],
        context.previousProducts
      );
    },
    onSuccess: () => {
      // invalidate the products query to refetch the latest data from the server
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div>
        <p>Fetching Data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error:{error.message}</p>
      </div>
    );
  }
  return (
    <div className="w-full md:w-3/5 border p-4">
      <h1 className="text-3xl font-semibold text-black text-center py-8">
        All Products
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4">
        {products.data &&
          products?.data?.map((product) => (
            <li
              className="border shadow-sm p-4 rounded-sm relative"
              key={product?.id}
            >
              <img
                src={product?.thumbnail}
                alt="Product Image"
                className="w-[300px] h-[300px] object-contain"
              />
              <h2 className="text-black text-lg font-medium line-clamp-1">
                {product?.title}
              </h2>
              <button
                onClick={() => onProductSelect(product?.id)}
                className="px-2 py-2 border border-cyan-500 font-medium text-sm text-cyan-500 rounded-xs w-full hover:bg-cyan-500 hover:text-white transition-all duration-300 rounded-sm mt-2"
              >
                See Details
              </button>

              <button
                className="absolute top-1 right-1 border p-1 rounded-full font-medium text-xs text-red-500 rounded-xs hover:bg-red-500 hover:text-white transition-all duration-300"
                onClick={() => handleDelete(product?.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
      {/* pagination btns */}
      <div className="mt-3 flex justify-center">
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            Previous
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
