import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "@/src/components/admin/Layout";
import useSWR from "swr";

export default function DashboardEmails() {
  const { data, isLoading } = useSWR("/api/emails");

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
          <h3>Customer Emails</h3>

          {data.map((d) => (
            <>
              <div className="row">
                <p>Name: {d.name}</p>
                <p>Email: {d.email}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
