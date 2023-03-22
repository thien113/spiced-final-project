export default function Card({ product, productHandler }) {
  return (
    <div key={product._id}>
      <div className="row">
        <h3>{product.name}</h3>
        <button onClick={() => productHandler(product, "plus")}> + </button>
      </div>

      <p>{product.description}</p>
      <span>{product.price} €</span>
      <hr />
    </div>
  );
}
