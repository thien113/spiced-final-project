import { useRouter } from "next/router";
import useSWR from "swr";
import ReviewForm from "../components/admin/form/review/ReviewForm";
import Map from "../components/map";

export default function OverviewPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(id ? `/api/orders/${id}` : null);
  if (!data) return;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const extras = data.extras;
  const productsCost = data.products.map((p) => p.price * p.counter);

  return (
    <section className="page-section">
      {!data.confirmed && <h2>Wait until your order is confirmed</h2>}
      <>
        {data.confirmed && data.status != "finished" && (
          <>
            <h2>
              Overview: Your Order is ready in {<strong>{data.time}</strong>}{" "}
              min!
            </h2>
            <p>Status: {data.status}</p>
          </>
        )}
        {data.confirmed && data.status === "finished" && (
          <>
            <h2>Your order has been delivered.</h2>
            <ReviewForm order={data} />
          </>
        )}

        {data.type === "delivery" && <Map />}
        <h4>For {data.type}:</h4>
        <ul>
          <li>Name: {data.name}</li>
          {data.adress && <li>Adress: {data.adress}</li>}
          <li>TelePhone:{data.telephone}</li>
          <li>Total: {data.total}€</li>
        </ul>
        <h4>Your Order</h4>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price per Product</th>
              <th>Amount</th>
              <th>Subtotal</th>

              {extras.length > 0 && <th>Extras</th>}
              {extras.length > 0 && <th>Extrastotal</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {data.products.map((p) => (
                  <p key={p.name}> {p.name}</p>
                ))}
              </td>
              <td>
                {data.products.map((p) => (
                  <p key={p.name}> {p.price} €</p>
                ))}
              </td>
              <td>
                {data.products.map((p) => (
                  <p key={p.name}>{p.counter}</p>
                ))}
              </td>
              <td>
                {productsCost.map((c) => (
                  <p key={c}>{c} €</p>
                ))}
              </td>
              {extras.length > 0 && (
                <td>
                  {extras.map((e) => (
                    <p key={e.name}>
                      {e.extras.map((a) => (
                        <li key={a.extra}>{a.extra}</li>
                      ))}
                    </p>
                  ))}
                </td>
              )}
              {extras.length > 0 && (
                <th>
                  {extras.map((e) => (
                    <p key={e.name}>
                      {e.extras.reduce((total, a) => a.price + total, 0)} €
                    </p>
                  ))}{" "}
                </th>
              )}
            </tr>
          </tbody>
        </table>
        {extras.length > 0 && (
          <strong>Extrastotal: {data.extrasTotal} € </strong>
        )}
        <br />
        <strong>Subtotal: {data.subtotal} € </strong>
        <hr />
        <strong>Total: {data.total} €</strong>
        <p>You already paid with {data.payment}</p>
      </>
    </section>
  );
}
