import { useEffect, useState } from "react";
import CheckoutForm from "../components/forms/CheckoutForm";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  useEffect(() => {
    const sessionArray = sessionStorage.getItem("products") || [];
    const products = JSON.parse(sessionArray);
    setProducts(products);
    const sessionString = sessionStorage.getItem("type") || [];
    const type = JSON.parse(sessionString);
    setType(type);
  }, []);

  return (
    <section className="page-section">
      <h2>Checkout for {type.toUpperCase()}</h2>
      <CheckoutForm type={type} products={products} />
    </section>
  );
}
