import { useRouter } from "next/router";
import useSWR from "swr";
import Map from "../components/Map";

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
  const productsCost = data.products.map((p) => p.price * p.counter);

  //random time creator
  function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const deliveryTime = randomTime(30, 60);
  const pickupTime = randomTime(5, 15);

  //geolocation

  return (
    <section class="page-section">
      <h2>
        Overview: Your Order is ready in{" "}
        {data.type === "delivery" && <strong>{deliveryTime}</strong>}
        {data.type === "pickup" && <strong>{pickupTime}</strong>} min!
      </h2>
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
        <tr>
          <th>Product</th>
          <th>Price per Product</th>
          <th>Amount</th>
          <th>Subtotal</th>

          {extras.length > 0 && <th>Extras</th>}
          {extras.length > 0 && <th>Extrastotal</th>}
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
            {productsCost.map((c) => (
              <p>{c} €</p>
            ))}
          </td>
          {extras.length > 0 && (
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
          )}
          {extras.length > 0 && (
            <th>
              {extras.map((e) => (
                <>
                  <p>{e.extras.reduce((total, a) => a.price + total, 0)} €</p>
                </>
              ))}{" "}
            </th>
          )}
        </tr>
      </table>
      {extras.length > 0 && <strong>Extrastotal: {data.extrasTotal} € </strong>}
      <br />
      <strong>Subtotal: {data.subtotal} € </strong>
      <hr />
      <strong>Total: {data.total} €</strong>
      <p>You already paid with {data.payment}</p>
    </section>
  );
}
