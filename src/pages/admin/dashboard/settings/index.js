import AdminLayout from "../../../../components/admin/Layout";
import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import { hasToken } from "../../../../components/admin/utils/checkUser";
import useSWR from "swr";

function DashboardSettings() {
  const { data, isLoading } = useSWR("/api/restaurant");

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
          <h3>Settings</h3>

          {data.map((d) => (
            <div className="dashboard-column">
              <p>Name: {d.name}</p>
              <p>Telephone: {d.telephone}</p>
              <p>Adress: {d.adress}</p>
              <p>Email: {d.email}</p>
              <p>Owner: {d.owner}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DashboardSettings;
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
