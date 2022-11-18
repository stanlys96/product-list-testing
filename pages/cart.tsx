import { ItemInterface, createItem, ItemCartInterface } from "./index";
import ItemCart from "./components/ItemCart";
import React from "react";

export default function Cart() {
  let currentCartItems: ItemCartInterface[] = [];
  if (typeof window != "undefined") {
    currentCartItems = JSON.parse(localStorage.getItem("currentItems") ?? "[]");
  }
  let totalPrice = 0;
  return <div className="bg-slate-500 min-h-screen py-6 px-24">
      <div className="flex justify-between text-white">
        <span>Random E-Commerce</span>
        <div>
          <a className="mr-5" href="/">Home</a>
          <a href="/cart">Cart</a>
        </div>
      </div>
      <div className="p-5 grid grid-cols-4 gap-6">
        {currentCartItems.map((item, index) => {
            totalPrice += item.price * item.quantity;
            return <ItemCart imgUrl={item.imgUrl} title={item.title} description={item.description} price={item.price} quantity={item.quantity} />
          })
        }
    </div>
    <p className="text-white">Total Price: ${totalPrice * 1.1} US</p>
    </div>
}