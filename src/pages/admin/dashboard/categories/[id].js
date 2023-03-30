import CategoryUpdateForm from "@/src/components/admin/form/category/CategoryUpdateForm";
import AdminLayout from "../../../../components/admin/Layout";
import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import { useRouter } from "next/router";
import useSWR from "swr";
import { hasToken } from "../../../../components/admin/utils/checkUser";

function CategorDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/categories/${id}` : null);
  if (!data) return;

  if (isLoading) {
    return (
      <section className="admin-section">
        <AdminLayout />
        <div className="admin-row">
          <DashboardTabs />
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }

  async function handleEditCategory(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const categoryData = Object.fromEntries(formData);
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(categoryData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        event.target.reset();
        router.push("/admin/dashboard/categories");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="admin-section">
      <AdminLayout />
      <div className="admmin-row">
        <DashboardTabs />
        <CategoryUpdateForm category={data} onSubmit={handleEditCategory} />
      </div>
    </section>
  );
}
export default CategorDetails;
export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
