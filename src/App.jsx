import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="flex mt-8 gap-2">
        <ProductList />
        <ProductDetails id={5} />
      </div>
    </>
  );
};

export default App;
