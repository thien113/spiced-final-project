import DashboardTabs from "@/src/components/admin/tabs/Tabs";

export default function DashboardProducts() {
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <h3>Products</h3>
      </div>
    </section>
  );
}
