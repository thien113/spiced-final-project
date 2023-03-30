import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layoutx";
import { hasToken } from "../../checkUser";
import Chart from "@/src/components/admin/Chart";

function DashboardReports() {
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <div className="column">
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
