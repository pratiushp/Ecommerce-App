import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";


const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Get All Products
  const allProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allProduct();
  }, []);

  return (
    <Layout title={"All Product - Best offers"}>
      <div className="flex pt-5">
        <div className="w-1/5">
          <h1 className="text-center font-sans font-semibold text-xl ">
            {" "}
            Filter by category
          </h1>
        </div>
        <div className="w-3/4">
          <h1 className="text-center font-bold text-3xl">All Product</h1>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {products?.map((p) => (
              <div
                className="border p-4 flex flex-col items-center"
                key={p._id}
              >
                <img
                  className="w-32 h-32 object-cover mb-4"
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="text-center">
                  <h5 className="font-semibold">{p.name}</h5>
                  <p className="text-sm">{p.description}</p>
                  <div className="flex gap-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-semibold py-2 px-4 rounded">
                      See Details
                    </button>
                    <button className="bg-gray-500 text-sm  hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
