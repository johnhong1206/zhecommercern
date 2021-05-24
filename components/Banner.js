import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import db from "../config/firebase";
import img1 from "../images/bannerimg1.jpg";
import img2 from "../images/bannerimg2.jpg";
import img3 from "../images/bannerimg3.jpg";

function Banner() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      db.collection("products").onSnapshot((snapshot) =>
        setProducts(
          snapshot.docs.map((product) => ({
            id: product.id,
            product: product.data(),
          }))
        )
      );
    }
    fetchProduct();
  }, []);

  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src={img1} alt="" />
        </div>
        <div>
          <img loading="lazy" src={img2} alt="" />
        </div>
        <div>
          <img loading="lazy" src={img3} alt="" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
