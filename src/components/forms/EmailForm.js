export default function EmailForm({ onSubmit }) {
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <section className="emailForm">
      <form onSubmit={handleSubmit}>
        <p>Subscribe and get great offers every day!</p>

        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" name="email" />
        <button>Subscribe</button>
      </form>
    </section>
  );
}
