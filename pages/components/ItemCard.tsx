import Image from 'next/image'
import { ItemInterface, createCartItem, ItemCartInterface } from "../index";
import Swal from "sweetalert2";

interface ItemProps {
  id: number;
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
      <a onClick={async() => {
        let items = JSON.parse(localStorage.getItem("currentItems") ?? "[]");
        const { value: quantity } = await Swal.fire({
          html: `<p class="mb-2">Product Name:</br><b>${props.title}</b></br></p>` +
          `<p class="mb-2">Product Description:</br><b>${props.description}</b></br></p>` +
          `Product Price:</br><b>$${props.price}.00 US</b>`,
          title: 'Input amount',
          input: 'number',
          inputLabel: 'Your amount',
          inputPlaceholder: 'Enter amount'
        })

        if (quantity) {
          let foundIdBool = false;
          for (let i = 0; i < items.length; i++) {
            if (items[i].id === props.id) {
              foundIdBool = true;
              let itemsTemp = items;
              itemsTemp[i].quantity = parseInt(itemsTemp[i].quantity);
              itemsTemp[i].quantity += parseInt(quantity);
              let currentCartItems: ItemCartInterface[] = [...itemsTemp]; 
              localStorage.setItem("currentItems", JSON.stringify(currentCartItems));
              break;
            }
          }
          if (!foundIdBool) {
            let currentItem = createCartItem(
              {
                id: props.id,
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
        }
      }} className="mt-4 p-3 bg-lime-600 rounded-md text-white" href="#">Add To Cart</a>
    </div>
  );
}