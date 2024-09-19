import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Rating from "../components/Rating/Rating";
import { Link } from "react-router-dom";
import { Product } from ".";

const serverUrl = import.meta.env.VITE_JSP_SERVER_URL;

const Products = () => {
  const rootPath = import.meta.env.VITE_JSP_DEFAULT_PATH;

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isLaoding = false;
  
  useEffect(() => {
    fetch(`${serverUrl}/product`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setProductsList(data.productList));
  }, []);

  console.log(productsList);

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 rounded bg-white m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <Link to={`/${rootPath}/create-product`}>
          <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded">
            <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />
            Create Product
          </button>
        </Link>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 justify-between">
        {isLaoding ? (
          <div>Loading...</div>
        ) : (
          productsList.map(({productName,productId,productPrice,productStock}) => (
            <div
              key={productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                <h3 className="mt-2 text-lg text-gray-900 font-bold">
                  {productName}
                </h3>
                <p className="text-gray-800">{productPrice}원</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {productStock}
                </div>
                <div className="flex items-center mt-2">
                    <Rating rating={3} />
                  </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Products;
