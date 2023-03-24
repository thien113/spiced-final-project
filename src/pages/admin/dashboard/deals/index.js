import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "@/src/components/admin/Layout";
//import useSWR from "swr";

export default function DashboardDeals() {
  /* const { data, isLoading } = useSWR("/api/emails");

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
  }*/
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <div className="column">
          <h3>Deals</h3>
        </div>
      </div>
    </section>
  );
}
