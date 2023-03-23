import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "@/src/components/admin/layout";
import useSWR from "swr";
import Link from "next/link";

export default function DashboardProducts() {
  const { data, isLoading } = useSWR("/api/products");

  if (!data) return;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(data);
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <div className="column">
          <h3>Products</h3>
          {data.map((d) => (
            <Link href={`/admin/dashboard/products/${d._id}`}>
              <div className="row">
                <h4>{d.name}</h4>
                <p>Description: {d.description}</p>
                <strong>Price: {d.price}</strong>
                <p>Category: {d.category} €</p>
              </div>
              <div className="row">
                {d.extras.map((e) => (
                  <h6>
                    {e.extra}: {e.price} €
                  </h6>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
