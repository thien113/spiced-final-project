import DashboardTabs from "@/src/components/admin/tabs/Tabs";

export default function DashboardCategories() {
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <h3>Categories</h3>
      </div>
    </section>
  );
}
