import CategoryUpdateForm from "@/src/components/admin/form/category/CategoryUpdateForm";
import AdminLayout from "@/src/components/admin/Layout";
import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CategorDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/orders/${id}` : null);
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
      </div>
    </section>
  );
}
