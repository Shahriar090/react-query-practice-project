import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

const App = () => {
  // state to store selected product id
  const [selectedProductId, setSelectedProductId] = useState(null);
  return (
    <>
      <Navbar />
      <div className="flex mt-8 gap-2">
        {/* passing selected product id to product list component */}
        <ProductList onProductSelect={setSelectedProductId} />
        {selectedProductId && <ProductDetails id={selectedProductId} />}
      </div>
    </>
  );
};

export default App;
