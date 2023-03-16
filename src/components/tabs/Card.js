export default function Card({ product, productHandler }) {
  return (
    <div key={product._id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>{product.price} €</span>
      <button onClick={() => productHandler(product, "plus")}> + </button>
    </div>
  );
}
