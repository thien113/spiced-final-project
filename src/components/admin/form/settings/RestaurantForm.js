import useSWR from "swr";

function Restaurant() {
  const { data, isLoading } = useSWR("/api/settings");
  if (!data) return;

  if (isLoading) {
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

  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <div className="column">
          <h3>Reviews</h3>
          {data.map((d) => (
            <>
              <div className="row">
                <h4>Order#: {d.orderNumber}</h4>
                <p>Name: {d.name}</p>
                <p>Comment: {d.comment}</p>
                <p>Rating: # {d.rating} /5</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Restaurant;
export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
