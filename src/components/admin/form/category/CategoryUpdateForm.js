export default function CategoryUpdateForm({ category, onSubmit }) {
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" placeholder={category.name} />
      <button>Update</button>
    </form>
  );
}
