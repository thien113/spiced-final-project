import useSWR from "swr";

export default function Menu() {
  const { data, isLoading } = useSWR("/api/products");

  if (!data) return;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className="menu-section">
      <h2>Menu</h2>

      {data.map((product) => (
        <>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <span>{product.price} €</span>
        </>
      ))}
    </section>
  );
}
