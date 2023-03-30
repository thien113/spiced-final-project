import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layout";
import { hasToken } from "../../../../components/admin/utils/checkUser";
import Chart from "@/src/components/admin/Chart";

function DashboardReports() {
  return (
    <section className="admin-section">
      <AdminLayout />
      <div className="admin-row">
        <DashboardTabs />
        <div className="dashboard-column">
          <h3>Reports</h3>
          <Chart />
        </div>
      </div>
    </section>
  );
}
export default DashboardReports;
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
