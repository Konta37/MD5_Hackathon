import React, { useContext, useState } from "react";
import ListCart from "../components/ListCart";
import { ProductProvider } from "../providers/ProductContext";

export default function Header() {
  const { listCart } = useContext(ProductProvider);
  const [isShow, setIsShow] = useState(false);

  const handleToggle = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-orange-400 w-full px-10 py-4 flex items-center justify-between text-white">
        <ul className="flex  gap-4 cursor-pointer">
          <li>Trang chủ</li>
          <li>Danh sách sản phẩm</li>
        </ul>
        <ul>
          <li className="cursor-pointer" onClick={handleToggle}>
            <i className="text-2xl fa-solid fa-cart-shopping relative">
              <span className="text-sm absolute bg-red-600 px-2 rounded-xl">
                {listCart.length}
              </span>
            </i>
          </li>
        </ul>
      </header>

      {/* List cart */}

      {isShow && <ListCart />}
    </>
  );
}
