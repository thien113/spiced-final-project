import BookingForm from "../components/forms/BookingForm";

export default function Booking() {
  async function handleAddBooking(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const emailData = Object.fromEntries(formData);

    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      event.target.reset();
      alert("Booking successful made!");
    } else {
      console.error(response.status);
    }
  }
  return (
    <section className="page-section">
      <h2>Booking</h2>
      <BookingForm onSubmit={handleAddBooking} />
    </section>
  );
}
