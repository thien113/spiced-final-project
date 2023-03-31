import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layout";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ProductCreateForm from "@/src/components/admin/form/product/ProductCreateForm";
import { hasToken } from "../../../../components/admin/utils/checkUser";

function DashboardProducts() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useSWR("/api/products");

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
  async function handleCreateProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      event.target.reset();
      router.push("/admin/dashboard/products");
    } else {
      console.error(response.status);
    }
  }
  async function handleDelete(id) {
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (response.ok) {
      router.push("/admin/dashboard/products");
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
          <div className="admin-row">
            <h3>Products</h3>
            <button
              onClick={() => {
                setOpen(!open);
              }}
            >
              Create New Product
            </button>
          </div>
          {open && <ProductCreateForm onSubmit={handleCreateProduct} />}
          <div className="cards">
            {data.map((d) => (
              <div className="dashboard-colum card">
                <h4>{d.name}</h4>
                <div className="dashboard-row">
                  <p>Description: {d.description}</p>
                  <strong>Price: {d.price}€</strong>
                  <p>Category: {d.category} </p>
                </div>
                <div className="dashboard-row">
                  {d.extras.map((e) => (
                    <h6>
                      {e.extra}: {e.price} €
                    </h6>
                  ))}
                  <div className="dashboard-row">
                    <Link href={`/admin/dashboard/products/${d._id}`}>
                      <button>Update</button>
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(d._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default DashboardProducts;
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
