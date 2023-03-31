import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Booking({ bookings }) {
  const [startDate, setStartDate] = useState(new Date());
  const { data: bookingData, isLoading: bookingLoading } =
    useSWR("/api/bookings");
  const { mutate } = useSWRConfig();

  if (!bookingData) return;

  if (bookingLoading) {
    return (
      <section>
        <AdminLayout />
        <div className="admin-row">
          <DashboardTabs />
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }
  const filteredBookingData = bookingData?.filter((b) => b.confirmed === false);

  async function confirm(id, status) {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        body: JSON.stringify(status),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article>
      {filteredBookingData.map((b) => (
        <div className="card" key={b._id}>
          <h3>New Booking!</h3>
          <p>Name: {b.name}</p>
          <p>Date: {b.date}</p>
          <p>Time: {b.time}</p>
          <p># of People: {b.people}</p>
          <p>Telephone: {b.telephone}</p>
          <p>Email: {b.email}</p>

          <div className="row">
            <button onClick={() => confirm(b._id, "accepted")}>Confirm</button>
            <button onClick={() => confirm(b._id, "declined")}>Decline</button>
          </div>
        </div>
      ))}
    </article>
  );
}
