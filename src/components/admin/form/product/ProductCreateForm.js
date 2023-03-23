export default function ProdzctCreateForm({ onSubmit }) {
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" />
      <button>Create</button>
    </form>
  );
}
