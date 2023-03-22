import Link from "next/link";

export default function BookingForm({ onSubmit }) {
  async function handleSubmit(event) {
    onSubmit(event);
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Personal Information:</legend>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" />
          <label htmlFor="telephone">Telephone: </label>
          <input type="number" id="telephone" name="telephone" />
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" name="email" />
        </fieldset>
        <fieldset>
          <legend>Reservation</legend>
          <label htmlFor="people">Number of People: </label>
          <input type="number" id="people" name="people" />
          <label htmlFor="app-time">Time: </label>
          <input
            id="appt-time"
            type="time"
            name="appt-time"
            min="12:00"
            max="22:00"
            required
          />
          <label htmlFor="date">Date: </label>
          <input type="date" id="date" name="date" />
        </fieldset>
        <div className="column">
          <div className="row">
            <input type="checkbox" name="agb" required />
            <label htmlFor="agb">
              <Link href="/terms-of-conditions">
                <h6>Terms Of Conditions</h6>{" "}
              </Link>
            </label>
            <input type="checkbox" name="privacy" required />
            <label htmlFor="privacy">
              <Link href="/privacy-policy">
                <h6>Privacy Policy</h6>
              </Link>
            </label>
          </div>
        </div>
        <button>Book a Table</button>
      </form>
    </section>
  );
}
