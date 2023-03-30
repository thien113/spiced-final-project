import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layout";
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CategoryCreateForm from "@/src/components/admin/form/category/CategoryCreateForm";
import { hasToken } from "../../../../components/admin/utils/checkUser";

function DashboardCategories() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useSWR("/api/categories");

  if (!data) return;

  if (isLoading) {
    return (
      <section className="admin-section">
        <AdminLayout />
        <div className="row">
          <DashboardTabs />
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }
  async function handleCreateCategory(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const categoryData = Object.fromEntries(formData);

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    if (response.ok) {
      event.target.reset();
      router.push("/admin/dashboard/categories");
    } else {
      console.error(response.status);
    }
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (response.ok) {
      router.push("/admin/dashboard/categories");
    } else {
      console.log(response.status);
    }
  }
  return (
    <section className="admin-section">
      <AdminLayout />
      <div className="admin-row">
        <DashboardTabs />
        <div className="dashboard-column">
          <h3>Categories</h3>
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            Create New Category
          </button>
          {open && <CategoryCreateForm onSubmit={handleCreateCategory} />}
          {data.map((d) => (
            <>
              <div className="dashboard-row">
                <h4>Category: {d.name}</h4>
              </div>
              <Link href={`/admin/dashboard/categories/${d._id}`}>
                <button>Update</button>
              </Link>
              <button
                onClick={() => {
                  handleDelete(d._id);
                }}
              >
                Delete
              </button>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DashboardCategories;
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
