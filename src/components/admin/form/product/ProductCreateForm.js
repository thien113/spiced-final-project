import useSWR from "swr";

export default function ProductCreateForm({ onSubmit }) {
  const { data, isLoading } = useSWR("/api/categories");

  if (!data) return;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <section className="column">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" required />
        <label htmlFor="description">Description:</label>
        <textarea type="text" name="description" rows="4" cols="50" required />
        <label htmlFor="price">Price:</label>
        <input required type="number" step="0.1" name="price" />
        <label htmlFor="category">Category</label>
        <select name="category">
          {data.map((c) => (
            <option value={c.name}>{c.name}</option>
          ))}
        </select>
        <button>Create</button>
      </form>
    </section>
  );
}
