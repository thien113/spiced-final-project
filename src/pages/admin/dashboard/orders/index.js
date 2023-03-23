import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "@/src/components/admin/layout";
import useSWR from "swr";
import Link from "next/link";

export default function DashboardOrders() {
  const { data, isLoading } = useSWR("/api/orders");

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
          <h3>Orders</h3>
          {data.map((d) => (
            <Link href={`/admin/dashboard/orders/${d._id}`}>
              <div className="row">
                <h4>Order Number: {d._id}</h4>
                <strong>For: {d.type.toUpperCase()}</strong>
                <p>Name: {d.name}</p>
                <strong>Total: {d.total} €</strong>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
