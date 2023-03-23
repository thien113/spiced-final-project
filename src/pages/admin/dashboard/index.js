import AdminLayout from "@/src/components/admin/Layout";
import DashboardTabs from "@/src/components/admin/tabs/Tabs";
export default function Dashboard() {
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <h3>New</h3>
      </div>
    </section>
  );
}
