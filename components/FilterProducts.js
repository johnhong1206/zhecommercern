import Link from "next/link";
import Fade from "react-reveal/Fade";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";

function FilterProducts({
  id,
  name,
  price,
  category,
  description,
  imageUrl,
  rating,
}) {
  const navtoLogin = (e) => {
    router.push("/login");
  };
  return (
    <>
      <Fade bottom>
        <div
          key={Math.random()}
          className="relative flex flex-col m-5 bg-white z-30 p-10 shadow-lg"
        >
          <p className="absolute top-2 right-2 text-xs italic text-gray-400">
            {category}
          </p>
          <Link href={`/product/${id}`}>
            <Image
              src={imageUrl}
              height={300}
              width={300}
              objectFit="contain"
              className={` cursor-pointer  transition duration-300 ease-in transform sm:hover:scale-125`}
            />
          </Link>
          <Link href={`/product/${id}`}>
            <h4 className="my-3 text-center text-lg font-medium cursor-pointer">
              {name}
            </h4>
          </Link>
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
          <div className="absolute bottom-3 left-5 right-5  flex item-center justify-center space-x-6">
            <Link href={`/product/${id}`}>
              <FaRegEye className="w-8 h-8 p-1 text-gray-200 rounded-full bg-purple-600 hover:bg-purple-800 cursor-pointer" />
            </Link>
            <AiOutlineLogin
              onClick={navtoLogin}
              className="w-8 h-8 p-1 text-gray-200 rounded-full bg-blue-600 cursor-pointer hover:bg-blue-800"
            />
          </div>
        </div>
      </Fade>
    </>
  );
}

export default FilterProducts;
