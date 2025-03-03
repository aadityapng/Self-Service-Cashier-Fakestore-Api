import React, { Fragment, useContext, useEffect, useState } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import { getProducts } from "../services/product.service";
import MenuCategories from "../components/Fragments/MenuCategories";
import { useLogin } from "../hooks/useLogin";
import TableCart from "../components/Fragments/TableCart";
import Navbar from "../components/Layouts/Navbar";
import { DarkMode } from "../context/DarkMode";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { isDarkMode } = useContext(DarkMode);
  useLogin();

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div
        className={`flex justify-center gap-4 ${
          isDarkMode ? "bg-slate-500" : "bg-white"
        }`}
      >
        <div className="w-2/12">
          <div className="w-full flex flex-col">
            <h1 className="border-b-4 border-gray-400 text-lg font-bold">
              Categorie
            </h1>
          </div>
          <MenuCategories />
        </div>
        <div className="w-7/12 flex flex-wrap">
          <div className="w-full flex flex-col">
            <h1 className="border-b-4 border-gray-400 text-lg font-bold">
              Menu
            </h1>
          </div>
          <div className="w-full grid grid-cols-3 gap-4 mt-3 mr-4">
            {products.length > 0 &&
              products.map((product) => (
                <CardProduct key={product.id}>
                  <CardProduct.Header image={product.image} id={product.id} />
                  <CardProduct.Body name={product.title}>
                    {product.description}
                  </CardProduct.Body>
                  <CardProduct.Footer price={product.price} id={product.id} />
                </CardProduct>
              ))}
          </div>
        </div>
        <div className="w-3/12">
          <div className="w-full flex flex-col">
            <h1 className="border-b-4 border-gray-400 text-lg font-bold">
              Cart
            </h1>
            <TableCart products={products} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsPage;
