export default function DealUpdateForm({ deal, onSubmit }) {
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="code">Code:</label>
      <input type="text" name="code" placeholder={deal.code} required />
      <label htmlFor="discount">%:</label>
      <input
        type="number"
        name="discount"
        placeholder={deal.discount}
        required
      />
      <label htmlFor="start">Startdate:</label>
      <input type="date" name="start" required />
      <label htmlFor="end">Enddate:</label>
      <input type="date" name="end" required />
      <button>Update</button>
    </form>
  );
}
