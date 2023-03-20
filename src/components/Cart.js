import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart({ products, close, productHandler }) {
  const [checkedValue, setChecktedValue] = useState("");
  const [extras, setExtra] = useState([]);
  const [extrasTotalPrice, setExtrasTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(
    () => {
      const extrasTotalPrice = sumExtrasTotalPrice();
      setExtrasTotalPrice(extrasTotalPrice);
      const subTotal = sumSubTotal();
      setSubtotal(subTotal);
      const total = sumTotal();
      setTotal(total);
    },
    [extras],
    [subtotal],
    [extrasTotalPrice],
    [total]
  );
  // subtotal,totals doesnt change on first checked extras? not working
  function closeCart() {
    close(false);
  }

  function addExtras(event, product) {
    if (event.target.checked) {
      if (extras.find((e) => e.name === product)) {
        const currentProduct = extras.find((e) => e.name === product);
        const oldProducts = extras.filter((e) => e.name != product);
        setExtra([
          ...oldProducts,
          {
            name: product,
            extras: [
              ...currentProduct.extras,
              {
                extra: event.target.name,
                price: Number(event.target.value),
              },
            ],
          },
        ]);
      } else {
        setExtra((oldArray) => [
          ...oldArray,
          {
            name: product,
            extras: [
              {
                extra: event.target.name,
                price: Number(event.target.value),
              },
            ],
          },
        ]);
      }
    } else {
      const currentProduct = extras.find((e) => e.name === product);
      //delete extra of uncheck
      const newExtra = currentProduct.extras.filter(
        (e) => e.extra != event.target.name
      );
      //replace currentProduct extras with new extra array
      currentProduct.extras = newExtra.slice(0);

      const oldExtras = extras.filter((e) => e.name != product);

      if (currentProduct.extras.length === 0) {
        oldExtras.length > 0 ? setExtra(oldExtras) : setExtra([]);
      } else {
        setExtra([...oldExtras, currentProduct]);
      }
    }
  }

  function saveProductsTemp() {
    sessionStorage.setItem("type", JSON.stringify(checkedValue));
    sessionStorage.setItem("products", JSON.stringify(products));
    sessionStorage.setItem("extras", JSON.stringify(extras));
    sessionStorage.setItem(
      "extrasTotalPrice",
      JSON.stringify(extrasTotalPrice)
    );
    sessionStorage.setItem("subtotal", JSON.stringify(subtotal));
    sessionStorage.setItem("total", JSON.stringify(total));
  }

  function sumExtrasTotalPrice() {
    const extrasArray = extras.map((e) => e.extras).flat(1);
    const extrasTotalPrice = extrasArray.reduce((total, e) => {
      return total + e.price;
    }, 0);
    return extrasTotalPrice;
  }

  function sumSubTotal() {
    return products.reduce((total, p) => p.price * p.counter + total, 0);
  }

  function sumTotal() {
    const extrasTotal = sumExtrasTotalPrice();
    const subTotal = sumSubTotal();
    return extrasTotal + subTotal;
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
                <div className="cart-items-row">
                  {product.extras.map((e) => (
                    <div key={e.value}>
                      <label htmlFor={e.extra}>{e.extra}</label>
                      <input
                        type="checkbox"
                        name={e.extra}
                        value={e.price}
                        onChange={(event) => addExtras(event, product.name)}
                      />
                      <div>{e.price} €</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <hr />
          <div className="cart-items-row">
            Please select one:
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
              Extras:
              {extrasTotalPrice} €
            </h3>
            <h3>
              Subtotal:{" "}
              {products.reduce((total, p) => p.price * p.counter + total, 0)} €
            </h3>
            <h3>Total: {total}€</h3>
            <nav>
              <Link href="/checkout">
                {checkedValue && (
                  <button onClick={saveProductsTemp} className="cover-button">
                    Checkout
                  </button>
                )}
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
