import DashboardTabs from "@/src/components/admin/tabs/Tabs";

export default function DashboardBookings() {
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <h3>Bookings</h3>
      </div>
    </section>
  );
}
