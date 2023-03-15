export default function Card({ product }) {
  return (
    <>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>{product.price} €</span>
    </>
  );
}
