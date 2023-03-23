export default function ProductUpdateForm({ product, onSubmit }) {
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" placeholder={product.name} />
      <button>Update</button>
    </form>
  );
}
