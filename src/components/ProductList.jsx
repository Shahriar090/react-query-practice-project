import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
const retrieveProducts = async ({ queryKey }) => {
  console.log("Query Key", queryKey);
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=10`
  );
  return response?.data;
};

const ProductList = ({ onProductSelect }) => {
  const [page, setPage] = useState(1);
  const {
    isError,
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
  });

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
    <div className="w-3/5 border p-4">
      <h1 className="text-3xl font-semibold text-black text-center py-8">
        All Products
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4">
        {products.data &&
          products?.data?.map((product) => (
            <li className="border shadow-sm p-4 rounded-sm" key={product?.id}>
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
