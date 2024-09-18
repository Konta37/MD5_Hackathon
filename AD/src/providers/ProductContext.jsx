import React, { useState } from "react";
import ProductJson from "../db.json";
import { saveData } from "../utils/common";

// B1: Tạo ngữ cảnh
export const ProductProvider = React.createContext();

export default function ProductContext({ children }) {
  const [listProduct, setListProduct] = useState(() => {
    return ProductJson;
  });

  const [listCart, setListCart] = useState(() => {
    const cartLocals = JSON.parse(localStorage.getItem("carts")) || [];

    return cartLocals;
  });

  /**
   * Hàm thêm sản phẩm vào giỏ hàng
   * @param {*} product Đối tượng product
   * Auth: NVQUY (17/09/2024)
   */
  const handleAddToCart = (product) => {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const findProductByCarts = listCart.find(
      (item) => item.product.id === product.id
    );

    if (!findProductByCarts) {
      // Nếu chưa thì thêm vào kèm theo quantity = 1
      const updateCarts = [...listCart, { product, quantity: 1 }];

      setListCart(updateCarts);

      // Lưu dữ liệu lên local và state
      saveData("carts", updateCarts);
    } else {
      // Nếu đã tồn tại thì tăng quantity lên 1

      const updateCarts = listCart.map((cart) => {
        if (cart.product.id === product.id) {
          return { ...cart, quantity: (cart.quantity += 1) };
        }

        return cart;
      });

      setListCart(updateCarts);

      // Lưu dữ liệu lên local và state
      saveData("carts", updateCarts);
    }
  };

  const handleIncrease = (cart) => {
    const findCartByCarts = listCart.find(
      (item) => item.product.id === cart.product.id
    );
    if (!findCartByCarts) {
      //do nothing
    } else {
      // Nếu đã tồn tại thì tăng quantity lên 1

      const updateCarts = listCart.map((cartItem) => {
        if (cartItem.product.id === cart.product.id) {
          return { ...cartItem, quantity: (cartItem.quantity += 1) };
        }

        return cartItem;
      });

      setListCart(updateCarts);

      // Lưu dữ liệu lên local và state
      saveData("carts", updateCarts);
    }
    // console.log("increase",cart.quantity);
  };

  const handleDecrease = (cart) => {
    const findCartByCarts = listCart.find(
      (item) => item.product.id === cart.product.id
    );
    if (!findCartByCarts) {
      //do nothing
    } else {
      // Nếu đã tồn tại thì tăng quantity lên 1
      if (findCartByCarts.quantity===1){
        const updateCarts = listCart.filter((cartItem) => cartItem.product !== findCartByCarts.product);
        setListCart(updateCarts);
        // Lưu dữ liệu lên local và state
        saveData("carts", updateCarts);
      }else{
        const updateCarts = listCart.map((cartItem) => {
          if (cartItem.product.id === cart.product.id) {
            return { ...cartItem, quantity: (cartItem.quantity -= 1) };
          }
  
          return cartItem;
        });
  
        setListCart(updateCarts);
  
        // Lưu dữ liệu lên local và state
        saveData("carts", updateCarts);
      }
    }
  };

  const handleDelete = (cart) => {
    const findCartByCarts = listCart.find(
      (item) => item.product.id === cart.product.id
    );
    if (!findCartByCarts) {
      //do nothing
    } else {
      const updateCarts = listCart.filter((cartItem) => cartItem.product !== findCartByCarts.product);
        setListCart(updateCarts);
        // Lưu dữ liệu lên local và state
        saveData("carts", updateCarts);
    }
  }

  return (
    <>
      <ProductProvider.Provider
        value={{ listProduct, handleAddToCart, listCart ,handleIncrease, handleDecrease, handleDelete}}
      >
        {children}
      </ProductProvider.Provider>
    </>
  );
}
