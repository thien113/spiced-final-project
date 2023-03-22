export default function EmailForm({ onSubmit }) {
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <section className="emailForm">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            {" "}
            <h4>Subscribe and get great offers every day!</h4>
          </legend>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" name="email" />
          <button>Subscribe</button>
        </fieldset>
      </form>
    </section>
  );
}
