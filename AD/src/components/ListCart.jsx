import React, { useContext } from "react";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import { ProductProvider } from "../providers/ProductContext";

export default function ListCart() {
  const { listCart } = useContext(ProductProvider);
  return (
    <>
      <div className="fixed right-1 top-16">
        <div className="bg-black w-[550px] text-white rounded px-5 py-4">
          <h3 className=" font-semibold text-2xl mb-2">Cart</h3>
          <hr />
          <ul className="flex flex-col gap-4 mt-3 pr-5 min-h-[300px] max-h-[500px] overflow-auto">
            {listCart.map((cart) => (
              <CartItem key={cart.product.id} cart={cart} />
            ))}
          </ul>
          <hr className="mt-5" />

          <CartFooter />
        </div>
      </div>
    </>
  );
}
