import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layout";
import { hasToken } from "../../../../components/admin/utils/checkUser";
import useSWR from "swr";
import ReviewUpdateForm from "@/src/components/admin/form/review/ReviewUpdateForm";

function DashboardReviews() {
  const { data, isLoading } = useSWR("/api/reviews");

  if (!data) return;

  if (isLoading) {
    return (
      <section className="admin-section">
        <AdminLayout />
        <div className="admin-row">
          <DashboardTabs />
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <AdminLayout />
      <div className="admin-row">
        <DashboardTabs />
        <div className="dashboard-column">
          <div className="dashboard-row">
            <h3>Reviews</h3>
            <ReviewUpdateForm />
          </div>
          <div className="cards">
            {data.map((d) => (
              <div className="dashboard-column card">
                <div className="dashboard-row">
                  <h4>Order#: {d.orderNumber}</h4>
                  <p>Name: {d.name}</p>
                  <p>Comment: {d.comment}</p>
                  <p>Rating: # {d.rating} /5</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default DashboardReviews;
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
