export default function Payment({ setPayment, payment }) {
  return (
    <div className="cart-items">
      <h3>Please Select One: </h3>
      <input
        type="checkbox"
        name="payment"
        value="googlepay"
        checked={payment === "googlepay"}
        onChange={() => setPayment("googlepay")}
      />
      <label htmlFor="googlepay">Googlepay</label>
      <input
        type="checkbox"
        name="payment"
        value="applepay"
        checked={payment === "applepay"}
        onChange={() => setPayment("applepay")}
      />
      <label htmlFor="applepay">Applepay</label>
      <input
        type="checkbox"
        name="payment"
        value="paypal"
        checked={payment === "paypal"}
        onChange={() => setPayment("paypal")}
      />
      <label htmlFor="paypal">PayPal</label>
    </div>
  );
}
