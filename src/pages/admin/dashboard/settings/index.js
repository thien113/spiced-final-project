import AdminLayout from "../../../../components/admin/Layout";
import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import { hasToken } from "../../checkUser";
import useSWR from "swr";

function DashboardSettings() {
  const { data, isLoading } = useSWR("/api/restaurant");

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
        <h3>Settings</h3>
        {data.map((d) => (
          <>
            <p>Name: {d.name}</p>
            <p>Telephone: {d.telephone}</p>
            <p>Adress: {d.adress}</p>
            <p>Email: {d.email}</p>
            <p>Owner: {d.owner}</p>
          </>
        ))}
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
