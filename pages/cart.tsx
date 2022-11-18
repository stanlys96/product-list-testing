import { ItemInterface, createItem, ItemCartInterface } from "./index";
import ItemCart from "./components/ItemCart";
import React, { useState, useEffect } from "react";

export default function Cart() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [amountRerender, setAmountRerender] = useState(0);

  let currentCartItems: ItemCartInterface[] = [];
  if (typeof window != "undefined") {
    currentCartItems = JSON.parse(localStorage.getItem("currentItems") ?? "[]");
  }
  let totalPrice = 0;
  useEffect(() => {
    setDomLoaded(true)
  }, []);

  function settingAmountRerender() {
    setAmountRerender(amountRerender + 1);
  }
  return <div className="bg-slate-500 min-h-screen py-6 px-24">
      <div className="flex justify-between text-white">
        <span>Random E-Commerce</span>
        <div>
          <a className="mr-5" href="/">Home</a>
          <a href="/cart">Cart</a>
        </div>
      </div>
      <div className="p-5 grid grid-cols-4 gap-6">
        {domLoaded && currentCartItems.map((item, index) => {
            totalPrice += item.price * item.quantity;
            return <ItemCart setAmountRerender={settingAmountRerender} key={item.id} id={item.id} imgUrl={item.imgUrl} title={item.title} description={item.description} price={item.price} quantity={item.quantity} />
          })
        }
    </div>
    <p className="text-white">Total Price: ${parseFloat((totalPrice * 1.1).toString()).toFixed(2)} US</p>
    </div>
}