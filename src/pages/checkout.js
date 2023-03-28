import { useEffect, useState } from "react";
import CheckoutForm from "../components/forms/CheckoutForm";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const [extras, setExtras] = useState([]);
  const [extrasTotal, setExtrasTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productsArray = sessionStorage.getItem("products") || [];
    const products = JSON.parse(productsArray);
    setProducts(products);
    const typeArray = sessionStorage.getItem("type") || [];
    const type = JSON.parse(typeArray);
    setType(type);
    const extrasArray = sessionStorage.getItem("extras") || [];
    const extras = JSON.parse(extrasArray);
    setExtras(extras);
    const extrasSession = sessionStorage.getItem("extrasTotalPrice") || [];
    const extrasTotal = JSON.parse(extrasSession);
    setExtrasTotal(extrasTotal);
    const subtotalSession = sessionStorage.getItem("subtotal") || [];
    const subtotal = JSON.parse(subtotalSession);
    setSubtotal(subtotal);
    const totalSession = sessionStorage.getItem("total") || [];
    const total = JSON.parse(totalSession);
    setTotal(total);
  }, []);

  console.log("extras after getting from session", extras);
  return (
    <section className="form-section">
      <h2>Checkout for {type.toUpperCase()}</h2>
      <CheckoutForm
        type={type}
        products={products}
        extras={extras}
        extrasTotal={extrasTotal}
        subtotal={subtotal}
        total={total}
      />
    </section>
  );
}
