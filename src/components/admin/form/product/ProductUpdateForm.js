import useSWR from "swr";
import ProductExtraCreateForm from "./ProductExtraCreateForm";
import ProductExtras from "./ProductExtras";

export default function ProductUpdateForm({ product, onSubmit }) {
  const { data, isLoading } = useSWR("/api/categories");

  if (!data) return;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  async function handleSubmit(event) {
    onSubmit(event);
  }
  const extras = product.extras;
  return (
    <section className="column">
      <form key={product._id} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" placeholder={product.name} required />
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          placeholder={product.description}
          rows="4"
          cols="50"
          required
        />
        <label htmlFor="price">Price:</label>
        <input
          required
          type="number"
          step="0.1"
          name="price"
          placeholder={product.price}
        />
        <label htmlFor="category">Category</label>
        <select name="category">
          {data.map((c) => (
            <option value={c.name}>{c.name}</option>
          ))}
        </select>
        <label htmlFor="extra">Extra</label>
        <button>Update</button>
      </form>
      <ProductExtraCreateForm id={product._id} extras={extras} />
    </section>
  );
}
