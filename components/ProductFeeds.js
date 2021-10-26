import ProductList from "./ProductList";
import smallbanner from "../images/small banner.jpg";

//firebase
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../config/firebase";

function ProductFeeds({ products }) {
  const [realtimeProduct] = useCollection(db.collection("products"));

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 lg:-mt-70  -mt-14 mx-auto ">
      {realtimeProduct
        ? realtimeProduct?.docs
            .slice(0, 4)
            .map((product) => (
              <ProductList
                id={product.id}
                name={product.data().name}
                price={product.data().price}
                images={product.data().imageUrl}
                description={product.data().description}
                category={product.data().category}
                rating={product.data().rating}
              />
            ))
        : products
            .slice(0, 4)
            .map((product) => (
              <ProductList
                id={product.id}
                rating={product.rating}
                category={product.category}
                name={product.name}
                price={product.price}
                images={product.imageUrl}
                description={product.description}
              />
            ))}
      <img src={smallbanner} alt="smallbanner" class="md:col-span-full" />
      <div class="md:col-span-2">
        {realtimeProduct
          ? realtimeProduct?.docs
              .slice(4, 5)
              .map((product) => (
                <ProductList
                  id={product.id}
                  name={product.data().name}
                  price={product.data().price}
                  images={product.data().imageUrl}
                  description={product.data().description}
                  category={product.data().category}
                  rating={product.data().rating}
                />
              ))
          : products
              .slice(4, 5)
              .map((product) => (
                <ProductList
                  id={product.id}
                  rating={product.rating}
                  category={product.category}
                  name={product.name}
                  price={product.price}
                  images={product.imageUrl}
                  description={product.description}
                />
              ))}
      </div>
      {realtimeProduct
        ? realtimeProduct?.docs
            .slice(5, 10)
            .map((product) => (
              <ProductList
                id={product.id}
                name={product.data().name}
                price={product.data().price}
                images={product.data().imageUrl}
                description={product.data().description}
                category={product.data().category}
                rating={product.data().rating}
              />
            ))
        : products
            .slice(5, 10)
            .map((product) => (
              <ProductList
                id={product.id}
                rating={product.rating}
                category={product.category}
                name={product.name}
                price={product.price}
                images={product.imageUrl}
                description={product.description}
              />
            ))}
      <img
        src={smallbanner}
        alt="smallbanner"
        class="px-5 md:col-span-4 mx-auto rounded-lg"
      />
      {realtimeProduct
        ? realtimeProduct?.docs
            .slice(10, products.length - 1)
            .map((product) => (
              <ProductList
                id={product.id}
                name={product.data().name}
                price={product.data().price}
                images={product.data().imageUrl}
                description={product.data().description}
                category={product.data().category}
                rating={product.data().rating}
              />
            ))
        : products
            .slice(10, products.length - 1)
            .map((product) => (
              <ProductList
                id={product.id}
                rating={product.rating}
                category={product.category}
                name={product.name}
                price={product.price}
                images={product.imageUrl}
                description={product.description}
              />
            ))}
    </div>
  );
}

export default ProductFeeds;
