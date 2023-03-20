import Link from "next/link";
import { useState } from "react";
import Payment from "../Payment";

export default function CheckoutForm({
  type,
  products,
  extras,
  extrasTotal,
  total,
  subtotal,
}) {
  const [payment, setPayment] = useState("");

  async function addOrder(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
    const orderData = {
      ...formData,
      type: type,
      products: [...products],
      total: total,
      subtotal: subtotal,
      extrasTotal: extrasTotal,
      extras: [...extras],
    };
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (response.ok) {
      await response.json();

      event.target.reset();
    } else {
      console.error(response.status);
    }
  }
  return (
    <form onSubmit={addOrder}>
      <h3>Checkoutform:</h3>
      <label htmlFor="name">Name: </label>
      <input name="name" type="text" />
      {type === "delivery" && (
        <>
          <label htmlFor="adress">Adress: </label>
          <input type="text" name="adress" />
        </>
      )}
      <label htmlFor="telephone">Telephone: </label>
      <input type="text" name="telephone" />
      <label htmlFor="notes">Notes: </label>
      <input type="text" name="notes" />
      {payment && <button>Order</button>}

      <h3>Your Order:</h3>
      {products.map((p) => (
        <div key={p.name} className="cart-items">
          <div className="cart-items-row">
            <p>{p.counter}</p>
            <h4>{p.name}</h4>
            <p>Unit Price: {p.price}</p>
            <p>Subtotal: {p.price * p.counter} €</p>
            {extras && (
              <p>
                Extras:
                {extras
                  .find((extra) => extra.name === p.name)
                  .extras.map((e) => (
                    <>
                      {e.extra} {e.price} €
                    </>
                  ))}
              </p>
            )}
          </div>
        </div>
      ))}
      <hr />
      <Payment setPayment={setPayment} payment={payment} />
      <hr />
      <input type="checkbox" name="agb" required />
      <label htmlFor="agb">
        <Link href="/terms-of-conditions">Terms Of Conditions </Link>
      </label>
      <input type="checkbox" name="privacy" required />
      <label htmlFor="privacy">
        <Link href="/privacy-policy">Privacy Policy</Link>
      </label>
      <hr />
      <p>Subtotal: {subtotal} €</p>
      <p>Extrastotal: {extrasTotal} €</p>
      <h3>Total: {total} €</h3>
    </form>
  );
}
