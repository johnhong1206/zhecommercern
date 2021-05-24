import Image from "next/image";

function OrderItem({ id, item }) {
  return (
    <div className="">
      <Image
        src={item.imageUrl}
        at="Order Item"
        height={300}
        width={300}
        objectFit="contain"
        className={` cursor-pointer  transition duration-300 ease-in transform sm:hover:scale-125`}
      />

      <div className="">
        <p className="">{item.name}</p>
        <p className="">RM {item.price}</p>
      </div>
    </div>
  );
}

export default OrderItem;
