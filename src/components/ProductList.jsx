import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
  return response?.data;
};

const ProductList = () => {
  const {
    isError,
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
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
        {products &&
          products.map((product) => (
            <li className="border shadow-sm p-4 rounded-sm" key={product?.id}>
              <img
                src={product?.thumbnail}
                alt="Product Image"
                className="w-[300px] h-[300px] object-contain"
              />
              <h2 className="text-black text-lg font-medium line-clamp-1">
                {product?.title}
              </h2>
              <button className="px-2 py-2 border border-cyan-500 font-medium text-sm text-cyan-500 rounded-xs w-full hover:bg-cyan-500 hover:text-white transition-all duration-300 rounded-sm mt-2">
                See Details
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
