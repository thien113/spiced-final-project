import DealUpdateForm from "@/src/components/admin/form/deal/DealUpdateForm";
import AdminLayout from "@/src/components/admin/Layout";
import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CategorDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/deals/${id}` : null);
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

  async function handleEditDeal(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const dealData = Object.fromEntries(formData);
      const response = await fetch(`/api/deals/${id}`, {
        method: "PUT",
        body: JSON.stringify(dealData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        event.target.reset();
        router.push("/admin/dashboard/deals");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <DealUpdateForm deal={data} onSubmit={handleEditDeal} />
      </div>
    </section>
  );
}
