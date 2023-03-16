import Cart from "../components/Cart";
import Tabs from "../components/tabs/Tabs";
import { useState } from "react";
import Image from "next/image";

export default function Order() {
  const initialArray = [];
  const [products, setProducts] = useState(initialArray);
  const [cartActive, setCardActive] = useState(false);

  function productToCardHandler(product, operator) {
    setCardActive(true);
    if (products.some((p) => p.name === product.name)) {
      const currentProduct = products.find((p) => p.name === product.name);
      const updatedProduct = {
        name: currentProduct.name,
        counter:
          operator === "plus"
            ? currentProduct.counter + 1
            : currentProduct.counter - 1,
        price: currentProduct.price,
        extras: [...currentProduct.extras],
      };
      // filter products except the updated one
      const oldProducts = products.filter(
        (p) => p.name != product.name && product.counter > 0
      );
      // then via spreadoperator [...oldProducts, updatedProduct]
      const newProducts =
        updatedProduct.counter <= 0
          ? [...oldProducts]
          : [...oldProducts, updatedProduct];
      setProducts(newProducts);
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
      {cartActive && (
        <Cart
          products={products}
          close={setCardActive}
          productHandler={productToCardHandler}
        />
      )}
      <Tabs productHandler={productToCardHandler} />
    </section>
  );
}
