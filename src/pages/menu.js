import useSWR from "swr";

export default function Menu() {
  const { data: productData, isLoading: productLoading } =
    useSWR("/api/products");
  const { data: categoryData, isLoading: categoryLoading } =
    useSWR("/api/categories");

  if (!productData || !categoryData) return;

  if (productLoading || categoryLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className="page-section">
      <h2>Menu</h2>
      {categoryData?.map((category) => (
        <div key={category.name}>
          <h3>{category.name}</h3>
          <hr />
          {productData
            .filter((product) => product.category === category.name)
            .map((product) => (
              <div key={product.name}>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <span>{product.price} €</span>
                <br />
                <br />
                <br />
              </div>
            ))}
        </div>
      ))}
    </section>
  );
}
