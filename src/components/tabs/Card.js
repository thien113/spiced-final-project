import { useState } from "react";

export default function Card({ product }) {
  const [products, setProducts] = useState([]);
  function addProductToCard(product) {
    console.log("product:", product);
  }

  return (
    <>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>{product.price} €</span>
      <button onClick={() => addProductToCard(product)}> + </button>
    </>
  );
}
