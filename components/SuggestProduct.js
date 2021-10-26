import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Currency from "react-currency-formatter";

//icons
import { FaRegEye } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";

function SuggestProduct({
  id,
  name,
  price,
  images,
  description,
  category,
  rating,
  productdetailid,
}) {
  const router = useRouter();

  const enterProductDetails = () => {
    router.push(`/product/${id}`);
  };

  const navtoLogin = (e) => {
    router.push("/login");
  };

  if (productdetailid === id) return false;

  return (
    <div
      key={id}
      className=" relative flex flex-col m-5 bg-white z-30 p-10 shadow-lg"
    >
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Link href={`/product/${id}`}>
        <Image
          src={images}
          height={300}
          width={300}
          objectFit="contain"
          className={` w-full rounded-lg cursor-pointer transition duration-300 ease-in transform sm:hover:scale-125`}
        />
      </Link>

      <h4 className="my-3 text-center text-lg font-medium">{name}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_) => (
            <p>⭐</p>
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5 flex item-center justify-center font-medium">
        <Currency quantity={price} currency="MYR" />
      </div>
      <div className="flex item-center justify-center space-x-6">
        <FaRegEye
          onClick={enterProductDetails}
          className="w-8 h-8 p-1 text-gray-200 rounded-full bg-purple-600 hover:bg-purple-800 cursor-pointer"
        />
        <AiOutlineLogin
          onClick={navtoLogin}
          className="w-8 h-8 p-1 text-gray-200 rounded-full bg-blue-600 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default SuggestProduct;
