import Image from 'next/image'
import Swal from "sweetalert2";

interface ItemProps {
  imgUrl: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export default function ItemCart(props: ItemProps) {
  return (
    <div className="p-3 bg-white flex flex-col justify-center items-center text-center rounded-lg">
      <Image src={props.imgUrl} alt="Fridge" width={100} height={100} />
      <p className="mt-5">{props.title}</p>
      <p className="my-4">{props.description}</p>
      <p>Price: ${props.price}.00 US</p>
      <p>Quantity: {props.quantity}</p>
      <a onClick={async() => {
        const { value: quantity } = await Swal.fire({
          title: 'Input amount',
          input: 'number',
          inputLabel: 'Your amount',
          inputPlaceholder: 'Enter amount'
        })
        if (quantity) {

        }
      }} className="mt-4 p-3 bg-lime-600 rounded-md text-white" href="#">Change Quantity</a>
    </div>
  );
}