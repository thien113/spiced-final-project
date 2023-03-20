import { useRouter } from "next/router";
import useSWR from "swr";

export default function OverviewPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(id ? `/api/orders/${id}` : null);
  console.log("data:", data);
  if (!data) return;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const extras = data.extras;
  const extrasToT = extras.reduce((total, p) => p.price + total, 0);

  return (
    <section class="page-section">
      <h2>Overview:</h2>
      <h4>For {data.type}:</h4>
      <ul>
        <li>Name: {data.name}</li>
        <li>Adress: {data.adress}</li>
        <li>TelePhone:{data.telephone}</li>
        <li>Total: {data.total}€</li>
      </ul>
      <h4>Your Order</h4>
      <table>
        <tr>
          <th>Product</th>
          <th>Price per Product</th>
          <th>Amount</th>
          <th>Subtotal</th>
          {extras && <th>Extras</th>}
          <th>Extrastotal</th>
        </tr>
        <tr>
          <td>
            {data.products.map((p) => (
              <p> {p.name}</p>
            ))}
          </td>
          <td>
            {data.products.map((p) => (
              <p> {p.price} €</p>
            ))}
          </td>
          <td>
            {data.products.map((p) => (
              <p>{p.counter}</p>
            ))}
          </td>
          <td>
            {data.products.map((p) => (
              <p>{p.counter * p.price} €</p>
            ))}{" "}
          </td>
          <td>
            {extras.map((e) => (
              <>
                <p>
                  {e.extras.map((a) => (
                    <li>{a.extra}</li>
                  ))}
                </p>
              </>
            ))}
          </td>
          <th>
            {extras.map((e) => (
              <>
                <p>{e.extras.reduce((total, a) => a.price + total, 0)} €</p>
              </>
            ))}{" "}
          </th>
        </tr>
      </table>
      <strong>Total: {data.total} €</strong>
      <p>Your already paid with {data.payment}</p>
    </section>
  );
}
