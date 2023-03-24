export default function DealCreateForm({ onSubmit }) {
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="code">Code:</label>
      <input type="text" name="code" />
      <label htmlFor="discount">%:</label>
      <input type="number" name="discount" />
      <label htmlFor="start">Startdate:</label>
      <input type="date" name="start" />
      <label htmlFor="end">Enddate:</label>
      <input type="date" name="end" />
      <button>Create</button>
    </form>
  );
}
