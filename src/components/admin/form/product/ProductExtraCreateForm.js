import { useRouter } from "next/router";
import ProductExtras from "./ProductExtras";

export default function ProductExtraCreateForm({ id, extras }) {
  const router = useRouter();

  async function addExtra(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const extraData = Object.fromEntries(formData);
    const response = await fetch(`/api/products/extras/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(extraData),
    });

    if (response.ok) {
      event.target.reset();
      router.push(`/admin/dashboard/products/${id}`);
    } else {
      console.error(response.status);
    }
  }
  async function deleteExtra(extra, productId) {
    const response = await fetch(`/api/products/extras/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(extra),
    });
    if (response.ok) {
      router.push(`/admin/dashboard/products/${id}`);
    } else {
      console.log(response.status);
    }
  }
  return (
    <>
      <form className="row" onSubmit={addExtra}>
        <legend>Add Extra:</legend>
        <label htmlFor="extra-name">Extra</label>
        <input type="text" name="extra" />
        <label htmlFor="extra-price">Price</label>
        <input type="text" name="price" />
        <button>Add</button>
      </form>
      <ProductExtras extras={extras} onDelete={deleteExtra} productId={id} />
    </>
  );
}
