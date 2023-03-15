export default function Cart({ products }) {
  return (
    <>
      <h2>Cart</h2>
      {products.map((product) => (
        <div className="cart">
          <h4>{product.counter}</h4>
          <h4>{product.name}</h4>
          <p>{product.price} €</p>
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
      ))}
      <hr />
      <input type="checkbox" name="pickup" />
      <label htmlFor="pickup">Pickup</label>
      <input type="checkbox" name="delivery" />
      <label htmlFor="delivery">Delivery</label>
    </>
  );
}
