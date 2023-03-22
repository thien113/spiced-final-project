import Cart from "../components/Cart";
import Tabs from "../components/tabs/Tabs";
import { useState } from "react";
import Image from "next/image";

export default function Order() {
  const initialArray = [];
  const [products, setProducts] = useState(initialArray);
  const [cartActive, setCartActive] = useState(false);

  function productToCardHandler(product, operator) {
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
      const oldProducts = products.filter((p) => p.name != product.name);
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
      <div className="row">
        <h2>Order</h2>
        <div onClick={() => setCartActive(!cartActive)}>
          <h4>🛒{products.length}</h4>
        </div>
      </div>

      <hr />
      {cartActive && (
        <Cart
          products={products}
          close={setCartActive}
          productHandler={productToCardHandler}
        />
      )}
      <Tabs productHandler={productToCardHandler} />
    </section>
  );
}
