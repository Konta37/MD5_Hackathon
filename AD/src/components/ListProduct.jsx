import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import { ProductProvider } from "../providers/ProductContext";

export default function ListProduct() {
  const { listProduct } = useContext(ProductProvider);

  return (
    <>
      <h1 className="text-center py-4 text-2xl font-bold">
        DANH SÁCH SẢN PHẨM
      </h1>

      <div className="grid grid-cols-5 px-10 py-5 gap-5">
        {listProduct.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
