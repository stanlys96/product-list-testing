import Image from 'next/image'
import { ItemInterface, createCartItem, ItemCartInterface } from "../index";
import Swal from "sweetalert2";

interface ItemProps {
  imgUrl: string;
  title: string;
  description: string;
  price: number;
  itemsInterface: ItemInterface[];
}

export default function ItemCard(props: ItemProps) {
  return (
    <div className="p-3 bg-white flex flex-col justify-center items-center text-center rounded-lg">
      <Image src={props.imgUrl} alt="Fridge" width={100} height={100} />
      <p className="mt-5">{props.title}</p>
      <p className="my-4">{props.description}</p>
      <p>Price: ${props.price}.00 US</p>
      <a onClick={async() => {
        let items = JSON.parse(localStorage.getItem("currentItems") ?? "[]");
          const { value: quantity } = await Swal.fire({
            title: 'Input amount',
            input: 'number',
            inputLabel: 'Your amount',
            inputPlaceholder: 'Enter amount'
          })

          if (quantity) {
            let currentItem = createCartItem(
              {
                imgUrl: props.imgUrl,
                description: props.description,
                price: props.price,
                title: props.title,
                quantity: quantity,
              }
            );
            let currentCartItems: ItemCartInterface[] = [...items, currentItem];    
            localStorage.setItem("currentItems", JSON.stringify(currentCartItems));
          }
      }} className="mt-4 p-3 bg-lime-600 rounded-md text-white" href="#">Add To Cart</a>
    </div>
  );
}