import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const retrieveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response?.data;
};

const ProductDetails = ({ id }) => {
  const {
    isError,
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retrieveProduct,
  });

  console.log(product);
  if (isLoading) {
    return (
      <div>
        <p>Fetching Product Details...</p>
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
    <div className="w-full md:w-1/5 border h-full p-4 bg-gray-100 md:sticky top-0">
      <h1 className="text-3xl font-semibold text-black text-center py-8">
        Product Details
      </h1>

      <div className="space-y-2">
        <img
          src={product?.thumbnail}
          alt="Product Image"
          className="w-[320px] h-[320px] object-cover"
        />
        <p className="text-black text-xl font-medium line-clamp-1">
          {product?.title}
        </p>
        <p className="text-gray-900 font-medium">{product?.description}</p>
        <p className="text-gray-900 font-medium">Rating : {product?.rating}</p>
        <p className="text-gray-900 font-medium">BDT : {product?.price}</p>
        <button className="px-2 py-2 border border-cyan-500 font-medium text-sm text-cyan-500 rounded-xs w-full hover:bg-cyan-500 hover:text-white transition-all duration-300 rounded-sm mt-2">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
