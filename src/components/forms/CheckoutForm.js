import Payment from "../Payment";

export default function CheckoutForm({ type, products }) {
  async function addOrder(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
    const orderData = [
      {
        ...formData,
        type: type,
        order: { ...products },
      },
    ];
    console.log("orderData", orderData);
    /*const response = await fetch("/api/orders", {
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
    }*/
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
      <button>Order</button>

      <h3>Your Order:</h3>
      {products.map((p) => (
        <div key={p.name} className="cart-items">
          <div className="cart-items-row">
            <p>{p.counter}</p>
            <h4>{p.name}</h4>
            <p>Unit Price: {p.price}</p>
            <p>Subtotal: {p.price * p.counter} €</p>
          </div>
        </div>
      ))}
      <hr />
      <Payment />
      <hr />
      <h3>
        Total: {products.reduce((total, p) => p.price * p.counter + total, 0)} €
      </h3>
    </form>
  );
}
