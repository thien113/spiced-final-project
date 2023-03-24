import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "@/src/components/admin/Layout";
import useSWR from "swr";

export default function DashboardBookings() {
  const { data, isLoading } = useSWR("/api/bookings");

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
        <div className="column">
          <h3>Bookings</h3>

          {data.map((d) => (
            <>
              <div className="row">
                <h4>Date: {d.date}</h4>
                <p>Name: {d.name}</p>
                <p>Email: {d.email}</p>
                <p>Telephone: # {d.telephone}</p>
                <p>People: # {d.people}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
