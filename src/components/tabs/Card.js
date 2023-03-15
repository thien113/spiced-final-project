export default function Card({ product, addProduct }) {
  return (
    <div key={product._id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>{product.price} €</span>
      <button onClick={() => addProduct(product)}> + </button>
    </div>
  );
}
