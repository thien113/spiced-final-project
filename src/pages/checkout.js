import { useEffect, useState } from "react";
import CheckoutForm from "../components/forms/CheckoutForm";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const [extras, setExtra] = useState(0);
  useEffect(() => {
    const sessionArray = sessionStorage.getItem("products") || [];
    const products = JSON.parse(sessionArray);
    setProducts(products);
    const sessionString = sessionStorage.getItem("type") || [];
    const type = JSON.parse(sessionString);
    setType(type);
  }, []);

  function addExtra(event) {
    const price = Number(event.target.value);
    if (event.target.checked) {
      setExtra(extras + price);
    } else {
      setExtra(extras - price);
    }
  }

  return (
    <section className="page-section">
      <h2>Checkout</h2>
      <CheckoutForm />
      <h3>Your Cart:</h3>
      {products.map((p) => (
        <div key={p.name} className="cart-items">
          <div className="cart-items-row">
            <p>{p.counter}</p>
            <h4>{p.name}</h4>
            <p>Unit Price: {p.price}</p>
            <p>Subtotal: {p.price * p.counter} €</p>
          </div>
          <div className="cart-items-row">
            {p.extras.map((e) => (
              <div key={e.value}>
                <label htmlFor={e.extra}>{e.extra}</label>
                <input
                  type="checkbox"
                  name={e.extra}
                  value={e.price}
                  onChange={(event) => addExtra(event)}
                />
                <div>{e.price} €</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <hr />
      <h4>
        SubTotal:{" "}
        {products.reduce((total, p) => p.price * p.counter + total, 0)} €
      </h4>
      <h4>Extras: {extras} €</h4>
      <h3>
        Total:{" "}
        {products.reduce((total, p) => p.price * p.counter + total, 0) + extras}{" "}
        €
      </h3>
    </section>
  );
}
