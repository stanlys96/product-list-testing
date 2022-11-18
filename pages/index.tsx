import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ItemCard from './components/ItemCard'
import Swal from 'sweetalert2';

export interface ItemCartInterface {
  id: number;
  imgUrl: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ItemInterface {
  id: number;
  imgUrl: string;
  title: string;
  description: string;
  price: number;
}

export function createItem(config: ItemInterface): { id: number; imgUrl: string; title: string; description: string; price: number } {
  return {
    id: config.id,
    imgUrl: config.imgUrl,
    title: config.title,
    description: config.description,
    price: config.price,
  };
}

export function createCartItem(config: ItemCartInterface): { id: number; imgUrl: string; title: string; description: string; price: number; quantity: number } {
  return {
    id: config.id,
    imgUrl: config.imgUrl,
    title: config.title,
    description: config.description,
    price: config.price,
    quantity: config.quantity,
  };
}

export default function Home() {
  let items: ItemInterface[] = [
    createItem({ id: 1, imgUrl: "/Fridge-1.jpg", title: "Refrigerator", description: "This item is for you to keep your food and drinks cool.", price: 50, }),
    createItem({ id: 2, imgUrl: "/ferrari.jpg", title: "Ferrari", description: "This item is for you to keep your food and drinks cool.", price: 100, }),
    createItem({ id: 3, imgUrl: "/ipad.jpg", title: "iPad", description: "This item is for you to keep your food and drinks cool.", price: 200, }),
    createItem({ id: 4, imgUrl: "/lamborghini.jpg", title: "Lamborghini", description: "This item is for you to keep your food and drinks cool.", price: 350, }),
    createItem({ id: 5, imgUrl: "/phone.jpg", title: "Phone", description: "This item is for you to keep your food and drinks cool.", price: 25,}),
  ];
  let currentItemsInCart: ItemInterface[] = [];
  return (
    <div className="bg-slate-500 min-h-screen py-6 px-24">
      <div className="flex justify-between text-white">
        <span>Random E-Commerce</span>
        <div>
          <a className="mr-5" href="/">Home</a>
          <a href="/cart">Cart</a>
        </div>
      </div>
      <div className="p-5 grid grid-cols-4 gap-6">
        {
          items.map((item, index) => {
            return <ItemCard key={item.id} id={item.id} imgUrl={items[index].imgUrl} title={items[index].title} description={items[index].description} price={items[index].price} itemsInterface={currentItemsInCart} />
          })
        }
      </div>
    </div>
  )
}