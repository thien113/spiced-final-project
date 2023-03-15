import Link from "next/link";

export default function Cart({ products }) {
  console.log(products);
  return (
    <div className="cart">
      <h2>Cart</h2>
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
            <div className="cart-items">
              <div className="cart-items-row">
                <h4>{product.counter} </h4>
                <h4>{product.name} </h4>
                <p>{product.price} €</p>
              </div>
              <div>
                <p>
                  {product.extras.map((e) => (
                    <>
                      <span>
                        <input type="checkbox" /> {e.extra} - {e.price} €
                      </span>
                      <br />
                    </>
                  ))}
                </p>
                <label htmlFor="comment">Comment: </label>
                <input type="text" name="comment" id="comment" />
              </div>
            </div>
          ))}
          <hr />
          <div className="cart-items-row">
            <input type="checkbox" name="pickup" />
            <label htmlFor="pickup">Pickup</label>
            <input type="checkbox" name="delivery" />
            <label htmlFor="delivery">Delivery</label>
          </div>
          <div className="cart-items">
            <h3>Total: €</h3>
            <nav>
              <Link href="/checkout">
                <button className="cover-button">Checkout</button>
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
