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
        <label htmlFor="agb">AGB</label>
        <input type="checkbox" name="agb" required />
        <button>Book a Table</button>
      </form>
    </section>
  );
}
