import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";

export default function Booking({ bookings }) {
  const [startDate, setStartDate] = useState(new Date());
  const { data: bookingData, isLoading: bookingLoading } =
    useSWR("/api/bookings");
  const { mutate } = useSWRConfig();

  if (!bookingData) return;

  if (bookingLoading) {
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
        mutate(`/api/bookings/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {filteredBookingData.map((b) => (
        <>
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
        </>
      ))}
    </>
  );
}
