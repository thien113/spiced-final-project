import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import Payment from "../Payment";

export default function CheckoutForm({
  type,
  products,
  extras,
  extrasTotal,
  total,
  subtotal,
  discount,
}) {
  const router = useRouter();
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
      status: "new",
      discount: discount || 1,
    };
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (response.ok) {
      const product = await response.json();
      event.target.reset();
      router.push(`/${product._id}`);
    } else {
      console.error(response.status);
    }
  }
  return (
    <form onSubmit={addOrder}>
      <fieldset>
        <legend>
          <h4>Personal Information</h4>
        </legend>
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
      </fieldset>
      <fieldset>
        <legend>
          <h4>Your Order</h4>
        </legend>
        {products.map((p) => (
          <div key={p.name}>
            <div className="row">
              <p>{p.counter}</p>
              <p>{p.name}</p>
              <p>Subtotal: {p.price * p.counter - discount / 100} €</p>
            </div>
            {extras.length > 0 && (
              <ul className="column">
                {extras
                  .find(({ name }) => name === p.name)
                  ?.extras?.map((e) => (
                    <li key={e.name}>
                      {e.extra} {e.price} €
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </fieldset>

      <hr />
      <Payment setPayment={setPayment} payment={payment} />
      <div className="column">
        <div className="row">
          <input type="checkbox" name="agb" required />
          <label htmlFor="agb">
            <Link href="/terms-of-conditions">
              <h6>Terms Of Conditions</h6>{" "}
            </Link>
          </label>
          <input type="checkbox" name="privacy" required />
          <label htmlFor="privacy">
            <Link href="/privacy-policy">
              <h6>Privacy Policy</h6>
            </Link>
          </label>
        </div>
      </div>
      <div className="total-text">
        <p>Subtotal: {subtotal - discount / 100} €</p>
        <p>Extrastotal: {extrasTotal} €</p>
        {discount != 0 && <p>Discount {discount} %</p>}
        <hr />
        <h3>Total: {total - discount / 100} €</h3>
      </div>
      {payment && <button>Order</button>}
    </form>
  );
}
