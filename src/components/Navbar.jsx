const Navbar = () => {
  return (
    <nav className="w-full h-20 bg-cyan-500 px-8 py-2 flex items-center justify-between">
      <div className="logo w-[30%]">
        <h1 className="text-white text-2xl font-semibold">
          React Query Practice Project
        </h1>
      </div>

      <div className="search-bar w-[30%]">
        <input
          type="text"
          placeholder="Search Here..."
          className="px-4 py-3 rounded-md w-full h-12 text-black font-medium"
        />
      </div>

      <div className="nav-items w-[30%]">
        <ul className="flex items-center space-x-4 text-white text-xl">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
