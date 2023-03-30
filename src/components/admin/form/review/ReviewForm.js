export default function ReviewForm({ order }) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const reviewData = Object.fromEntries(formData);
    const review = {
      name: order.name,
      orderNumber: order._id,
      ...reviewData,
    };

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      event.target.reset();
    } else {
      console.error(response.status);
    }
  }
  return (
    <section className="emailForm">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            {" "}
            <h4>Thank You for Ordering. Please rate our service 😁</h4>
          </legend>
          <label htmlFor="comment">Comment: </label>
          <input type="text" id="comment" name="comment" />
          <label htmlFor="rating">Rating: </label>
          <input type="number" max={5} min={1} id="rating" name="rating" /> /5
          <button>Rate us!</button>
        </fieldset>
      </form>
    </section>
  );
}
