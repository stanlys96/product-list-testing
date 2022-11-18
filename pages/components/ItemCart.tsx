import Image from 'next/image'
import Swal from "sweetalert2";
import { ItemCartInterface } from "../index";

interface ItemProps {
  id: number;
  imgUrl: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  setAmountRerender: () => void;
}

export default function ItemCart(props: ItemProps) {
  let items = JSON.parse(localStorage.getItem("currentItems") ?? "[]");
  return (
    <div className="p-3 bg-white flex flex-col justify-center items-center text-center rounded-lg">
      <Image src={props.imgUrl} alt="Fridge" width={100} height={100} />
      <p className="mt-5">{props.title}</p>
      <p className="my-4">{props.description}</p>
      <p>Price: <b>${props.price}.00 US</b></p>
      <p>Quantity: <b>{props.quantity}</b></p>
      <a onClick={async() => {
        const { value: quantity } = await Swal.fire({
          title: 'Input new amount',
          input: 'number',
          inputLabel: 'Your new amount',
          inputPlaceholder: 'Enter amount'
        })
        if (quantity) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].id === props.id) {
              let itemsTemp = items;
              itemsTemp[i].quantity = quantity;
              let currentCartItems: ItemCartInterface[] = [...itemsTemp]; 
              localStorage.setItem("currentItems", JSON.stringify(currentCartItems));
              props.setAmountRerender();
              break;
            }
          }
        }
      }} className="mt-4 p-3 bg-lime-600 rounded-md text-white" href="#">Change Quantity</a>
    </div>
  );
}