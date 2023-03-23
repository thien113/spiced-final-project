export default function Login() {
  return (
    <section className="page-section">
      <div className="column">
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email: </label>
          <input type="text" />
          <label htmlFor="password">Password: </label>
          <input type="password" />
          <button>Login</button>
        </form>
      </div>
    </section>
  );
}
