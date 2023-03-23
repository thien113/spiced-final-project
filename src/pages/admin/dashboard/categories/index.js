import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "@/src/components/admin/layout";
import useSWR from "swr";
import Link from "next/link";

export default function DashboardCategories() {
  const { data, isLoading } = useSWR("/api/categories");

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
          <h3>Categories</h3>
          {data.map((d) => (
            <Link href={`/admin/dashboard/categories/${d._id}`}>
              <div className="row">
                <h4>Category: {d.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
