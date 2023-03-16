import Link from "next/link";
import { useState } from "react";

export default function Cart({ products, close, productHandler }) {
  const [checkedValue, setChecktedValue] = useState("");
  function closeCart() {
    close(false);
  }

  function saveProductsTemp() {
    sessionStorage.setItem("type", JSON.stringify(checkedValue));
    sessionStorage.setItem("products", JSON.stringify(products));
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <button onClick={closeCart}>X</button>
      {products.length === 0 && (
        <>
          <div className="cart-items">
            <p>Your cart is empty...</p>
          </div>
        </>
      )}
      {products.length != 0 && (
        <>
          {products.map((product) => (
            <div key={product.name} className="cart-items">
              <div className="cart-items-row">
                <button onClick={() => productHandler(product, "plus")}>
                  {" "}
                  +{" "}
                </button>
                <button onClick={() => productHandler(product, "minus")}>
                  {" "}
                  -{" "}
                </button>
                <h4>{product.counter} </h4>
                <h4>{product.name} </h4>
                <p>{product.price * product.counter} €</p>
              </div>
            </div>
          ))}
          <hr />
          <div className="cart-items-row">
            <input
              type="checkbox"
              name="pickup"
              checked={checkedValue === "pickup"}
              onChange={() => setChecktedValue("pickup")}
            />
            <label htmlFor="pickup">Pickup</label>

            <input
              type="checkbox"
              name="delivery"
              checked={checkedValue === "delivery"}
              onChange={() => setChecktedValue("delivery")}
            />
            <label htmlFor="delivery">Delivery</label>
          </div>
          <div className="cart-items">
            <h3>
              Total:{" "}
              {products.reduce((total, p) => p.price * p.counter + total, 0)} €
            </h3>
            <nav>
              <Link href="/checkout">
                <button onClick={saveProductsTemp} className="cover-button">
                  Checkout
                </button>
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
