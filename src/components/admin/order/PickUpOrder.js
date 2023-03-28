import useSWR from "swr";
import { useState } from "react";
import DateFormatter from "@/src/pages/admin/dashboard/utils/dateformatter";

export default function PickUpOrder() {
  const { data: orderData, isLoading: orderLoading } = useSWR("/api/orders");
  const [startDate, setStartDate] = useState(new Date());
  if (!orderData) return;

  if (orderLoading) {
    return (
      <section className="page-section">
        <AdminLayout />
        <div className="row">
          <DashboardTabs />
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }
  const dateToFilter = DateFormatter(startDate);
  const filteredOrderData = orderData?.filter(
    (d) =>
      d.created.slice(0, 10) === dateToFilter &&
      d.confirmed === false &&
      d.type === "pickup"
  );
  async function confirm(id, status, time) {
    const updatedOrder = {
      status: status,
      time: time,
    };
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedOrder),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <article>
      {filteredOrderData.map((d) => (
        <>
          <h3>New Order!!!</h3>
          <strong>For: {d.type.toUpperCase()}</strong> <br />
          <p>Name: {d.name}</p>
          <p>Adress: {d.adress}</p>
          <p>Telephone: {d.telephone}</p>
          <p>List of Items:</p>
          <ul>
            {d.products.map((p) => (
              <li>
                <strong>
                  Product: {p.name} | Amount: {p.counter} | Subtotal:{" "}
                  {p.counter * p.price}€ <br />
                </strong>
                <strong>Extras:</strong>
                {d.extras
                  .filter((e) => e.extra === p.name)
                  .map((e) => (
                    <i>
                      ---- {e.name} - {e.price}
                    </i>
                  ))}
              </li>
            ))}
            <div className="row">
              <button onClick={() => confirm(d._id, "confirmed", "10")}>
                10 min
              </button>
              <button onClick={() => confirm(d._id, "confirmed", "20")}>
                20 min
              </button>
              <button onClick={() => confirm(d._id, "confirmed", "30")}>
                30 min
              </button>
            </div>
          </ul>
        </>
      ))}
    </article>
  );
}
