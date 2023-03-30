import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layout";
import useSWR from "swr";
import { hasToken } from "../../../../components/admin/utils/checkUser";

function DashboardEmails() {
  const { data, isLoading } = useSWR("/api/emails");

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
          <h3>Customer Emails</h3>

          {data.map((d) => (
            <>
              <div className="dashboard-row">
                <p>Name: {d.name}</p>
                <p>Email: {d.email}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DashboardEmails;

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
