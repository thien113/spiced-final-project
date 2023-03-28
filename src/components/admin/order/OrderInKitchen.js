import useSWR from "swr";
import { useState } from "react";
import DateFormatter from "@/src/pages/admin/dashboard/utils/dateformatter";

export default function OrderInKitchen() {
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
      d.confirmed === true &&
      d.status === "inKitchen"
  );
  async function changeStatus(id, status) {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify(status),
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
      <h3>In the kitchen</h3>
      {filteredOrderData.length === 0 && <h4>No Order in Kitchen</h4>}
      {filteredOrderData.map((d) => (
        <>
          <strong>For: {d.type.toUpperCase()}</strong> <br />
          <p>Name: {d.name}</p>
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
              <button onClick={() => changeStatus(d._id, "onTheWay")}>
                On the way
              </button>
            </div>
          </ul>
        </>
      ))}
    </article>
  );
}
