import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "@/src/components/admin/layout";
import useSWR from "swr";
import Link from "next/link";

export default function DashboardBookings() {
  const { data, isLoading } = useSWR("/api/bookings");

  if (!data) return;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <div className="column">
          <h3>Bookings</h3>

          {data.map((d) => (
            <Link href={`/admin/dashboard/bookings/${d._id}`}>
              <div className="row">
                <h4>Date: {d.date}</h4>
                <p>Name: {d.name}</p>
                <p>Email: {d.email}</p>
                <p>Telephone: # {d.telephone}</p>
                <p>People: # {d.people}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
