import Cart from "../components/Cart";
import Tabs from "../components/tabs/Tabs";
import { useState } from "react";
import Image from "next/image";

export default function Order() {
  const initialArray = [];
  const [products, setProducts] = useState(initialArray);
  const [cartActive, setCardActive] = useState(false);
  function addProductToCard(product) {
    console.log("product:", product);
    setProducts((oldArray) => [
      ...oldArray,
      {
        name: product.name,
        price: product.price,
        extras: product.extras,
        counter: 1,
      },
    ]);
  }
  console.log("products", products);

  return (
    <section className="page-section order-page">
      <h2>Order</h2>
      <Image
        onClick={() => setCardActive(!cartActive)}
        className="cart-logo"
        src="/images/cart.svg"
        height={80}
        width={80}
        alt="cart logo"
      />
      <hr />
      {cartActive && <Cart products={products} />}
      <Tabs addProduct={addProductToCard} />
    </section>
  );
}
