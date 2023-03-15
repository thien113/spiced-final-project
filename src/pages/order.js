import Cart from "../components/Cart";
import Tabs from "../components/tabs/Tabs";
import { useState } from "react";
import Image from "next/image";

export default function Order() {
  const initialArray = [];
  const [products, setProducts] = useState(initialArray);
  const [cartActive, setCardActive] = useState(false);
  function addProductToCard(product) {
    if (products.some((p) => p.name === product.name)) {
      const currentProduct = products.find((p) => p.name === product.name);
      const updatedProduct = {
        name: currentProduct.name,
        counter: currentProduct.counter + 1,
        price: currentProduct.price,
      };
      console.log("Updated Product:", updatedProduct);
      const newProducts = [...products];
      console.log("newProducts:", newProducts);
      newProducts[currentProduct] = updatedProduct;
      setProducts(newProducts);
      console.log("new Products:", products);
    } else {
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
  }

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
