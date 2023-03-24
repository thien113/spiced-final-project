export default function DealCreateForm({ onSubmit }) {
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Code:</label>
      <input type="text" name="name" />
      <label htmlFor="discount">%:</label>
      <input type="number" name="discount" />
      <button>Create</button>
    </form>
  );
}
