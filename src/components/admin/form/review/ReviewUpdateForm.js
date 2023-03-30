export default function ReviewUpdateForm() {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const reviewData = Object.fromEntries(formData);
    const response = await fetch("/api/restaurant", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData.rating),
    });

    if (response.ok) {
      event.target.reset();
      console.log("ok");
    } else {
      console.error(response.status);
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <fieldset className="dashboard-row">
          <legend>
            {" "}
            <h4> Show Review</h4>
          </legend>
          <label htmlFor="rating">Above 5 stars </label>
          <input type="radio" id="rating" name="rating" value="5" />
          <label htmlFor="rating">Above 4 stars </label>
          <input type="radio" id="rating" name="rating" value="4" />
          <label htmlFor="rating">Above 3 stars </label>
          <input type="radio" id="rating" name="rating" value="3" />
          <label htmlFor="rating">Above 2 stars </label>
          <input type="radio" id="rating" name="rating" value="2" />
          <label htmlFor="rating">Above 1 stars </label>
          <input type="radio" id="rating" name="rating" value="1" />
          <button>Save</button>
        </fieldset>
      </form>
    </section>
  );
}
