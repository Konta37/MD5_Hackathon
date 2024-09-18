import React from "react";
import Header from "./layouts/Header";
import ListProduct from "./components/ListProduct";
import ListCart from "./components/ListCart";

export default function App() {
  return (
    <>
      {/* Header */}

      <Header />

      {/* Danh sách sản phẩm */}

      <ListProduct />
    </>
  );
}
