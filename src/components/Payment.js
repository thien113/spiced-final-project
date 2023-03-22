export default function Payment({ setPayment, payment }) {
  return (
    <fieldset className="column">
      <legend>
        <h4>Please Select One:</h4>{" "}
      </legend>
      <div className="row">
        <input
          type="checkbox"
          name="payment"
          value="googlepay"
          checked={payment === "googlepay"}
          onChange={() => setPayment("googlepay")}
        />
        <label htmlFor="googlepay">Googlepay</label>
      </div>
      <div className="row">
        <input
          type="checkbox"
          name="payment"
          value="applepay"
          checked={payment === "applepay"}
          onChange={() => setPayment("applepay")}
        />
        <label htmlFor="applepay">Applepay</label>
      </div>
      <div className="row">
        <input
          type="checkbox"
          name="payment"
          value="paypal"
          checked={payment === "paypal"}
          onChange={() => setPayment("paypal")}
        />
        <label htmlFor="paypal">PayPal</label>
      </div>
    </fieldset>
  );
}
